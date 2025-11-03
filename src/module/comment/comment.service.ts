import { Request, Response } from "express";
import { CommentRepository, PostRepository } from "../../DB";
import {
  addReactionProvider,
  IComment,
  IPost,
  IUser,
  NotFoundException,
  UnauthorizedException,
} from "../../utils";
import { CreateCommentDTO, UpdateCommentDTO } from "./comment.dto";
import { CommentFactoryService } from "./factory";

class CommentService {
  private readonly postRepository = new PostRepository();
  private readonly commentRepository = new CommentRepository();
  private readonly commentFactoryService = new CommentFactoryService();

  public create = async (req: Request, res: Response) => {
    // get data from req
    const { postId, id } = req.params;
    const createCommentDTO: CreateCommentDTO = req.body;
    // check post exist
    const postExist = await this.postRepository.exist({
      _id: postId,
    });
    if (!postExist) throw new NotFoundException("Post not found ");
    // check parent comment exist
    let commentExist: IComment | any = undefined; // to use it out of scope "if"
    if (id) {
      commentExist = await this.commentRepository.exist({
        _id: id,
      });
      if (!commentExist) throw new NotFoundException("Comment not found");
    }
    // prepare data
    const comment = this.commentFactoryService.createComment(
      createCommentDTO,
      req.user as IUser,
      postExist,
      commentExist
    );
    // create comment into DB
    const createdComment = await this.commentRepository.create(comment);
    // return response
    return res.status(201).json({
      message: "Comment created successfully",
      success: true,
      data: { createdComment },
    });
  };

  public getSpecific = async (req: Request, res: Response) => {
    // get data from req
    const { id } = req.params;
    // get comment and check existance
    const comment = await this.commentRepository.exist(
      { _id: id },
      {},
      {
        populate: [{ path: "replies" }], // populate replies to get it with comment as specific
      }
    );
    if (!comment) throw new NotFoundException("Comment not found");
    // return response
    return res.status(200).json({
      message: "Comment found successfully",
      success: true,
      data: { comment },
    });
  };

  public deleteComment = async (req: Request, res: Response) => {
    // get data from req
    const { id } = req.params;
    // check comment existance
    const commentExist = await this.commentRepository.exist(
      { _id: id },
      {},
      {
        populate: [{ path: "postId", select: "userId" }], // to get userId of post
      }
    );
    if (!commentExist) throw new NotFoundException("Comment not found");
    // delete comment
    if (
      ![
        commentExist.userId.toString(),
        (commentExist.postId as unknown as IPost).userId.toString(),
      ].includes(req.user?._id.toString() as string)
    ) {
      throw new UnauthorizedException("You are not authorized");
    }
    await this.commentRepository.delete({ _id: id });
    // return response
    return res.status(200).json({
      message: "Comment deleted successfully",
      success: true,
    });
  };

  public addReaction = async (req: Request, res: Response) => {
    // get data from req
    const { reaction } = req.body;
    const { id } = req.params;
    const userId = req.user?._id;
    // add reaction to comment
    await addReactionProvider(
      this.commentRepository,
      id as string,
      reaction,
      userId as unknown as string
    );
    // response
    return res.sendStatus(204);
  };

  public freezeComment = async (req: Request, res: Response) => {
    // get data from req
    const { id } = req.params;
    // check comment existance
    const commentExist = await this.commentRepository.exist(
      { _id: id },
      {},
      {
        populate: [{ path: "postId", select: "userId" }], // to get userId of post
      }
    );
    if (!commentExist) throw new NotFoundException("Comment not found");
    // freeze comment
    if (
      ![
        commentExist.userId.toString(),
        (commentExist.postId as unknown as IPost).userId.toString(),
      ].includes(req.user?._id.toString() as string)
    ) {
      throw new UnauthorizedException("You are not authorized");
    }
    await this.commentRepository.update({ _id: id }, { isFrozen: true });
    // return response
    return res.status(200).json({
      message: "Comment frozen successfully",
      success: true,
    });
  };

  public updateComment = async (req: Request, res: Response) => {
    // get data from req
    const { id } = req.params;
    const updateCommentDto: UpdateCommentDTO = req.body;
    // check comment existance
    const commentExist = await this.commentRepository.exist({ _id: id });
    if (!commentExist) throw new NotFoundException("Comment not found");
    // update comment
    if (
      ![
        commentExist.userId.toString(),
        (commentExist.postId as unknown as IPost).userId.toString(),
      ].includes(req.user?._id.toString() as string)
    ) {
      throw new UnauthorizedException("You are not authorized");
    }
    await this.commentRepository.update({ _id: id }, updateCommentDto);
    // return response
    return res.status(200).json({
      message: "Comment updated successfully",
      success: true,
    });
  };
}

export default new CommentService();
