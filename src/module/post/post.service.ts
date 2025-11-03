import { Request, Response } from "express";
import { PostRepository } from "../../DB";
import {
  addReactionProvider,
  IUser,
  NotFoundException,
  UnauthorizedException,
} from "../../utils";
import { PostFactoryService } from "./factory";
import { CreatePostDTO, UpdatePostDTO } from "./post.dto";

class PostService {
  private readonly postFactoryService = new PostFactoryService();
  private readonly postRepository = new PostRepository();

  public create = async (req: Request, res: Response) => {
    // get data from req
    const createPostDTO: CreatePostDTO = req.body;
    // factory >> prepare data post >> post entity
    const post = this.postFactoryService.createPost(
      createPostDTO,
      req.user as IUser
    );
    // repository >> save into DB
    const postCreated = await this.postRepository.create(post);
    // response
    return res.status(201).json({
      message: "post created successfuly",
      success: true,
      data: { postCreated },
    });
  };

  public addReaction = async (req: Request, res: Response) => {
    // get data from req
    const { reaction } = req.body;
    const { id } = req.params;
    const userId = req.user?._id;
    // add reaction to post
    await addReactionProvider(
      this.postRepository,
      id as string,
      reaction,
      userId as unknown as string
    );
    // response
    return res.sendStatus(204);
  };

  public getSpecificPost = async (req: Request, res: Response) => {
    // get data from req
    const { id } = req.params;
    // get post and check existance
    const post = await this.postRepository.getOne(
      { _id: id },
      {},
      {
        populate: [
          { path: "userId", select: "fullName firstName lastName" }, // populate : chose fields to show and select from it >> fullName is virtual field so must select frist and last to calculate
          { path: "reactions.userId", select: "fullName firstName lastName" },
          { path: "comments.userId", match: { parentId: null } }, // to show only comments that have no parentIds (frist layer)
        ],
      }
    );
    if (!post) throw new NotFoundException("Post not found");
    // response
    return res.status(200).json({
      message: "post found successfuly",
      success: true,
      data: { post },
    });
  };

  public deletePost = async (req: Request, res: Response) => {
    // get data from req
    const { id } = req.params;
    // check post existance
    const postExist = await this.postRepository.exist({ _id: id });
    if (!postExist) throw new NotFoundException("Post not found");
    // delete post
    if (postExist.userId.toString() !== req.user?._id.toString()) {
      throw new UnauthorizedException("You are not authorized");
    }
    await this.postRepository.delete({ _id: id });
    // return response
    return res.status(200).json({
      message: "Post deleted successfully",
      success: true,
    });
  };

  public freezePost = async (req: Request, res: Response) => {
    // get data from req
    const { id } = req.params;
    // check post existance
    const postExist = await this.postRepository.exist({ _id: id });
    if (!postExist) throw new NotFoundException("Post not found");
    // freeze post
    if (postExist.userId.toString() !== req.user?._id.toString()) {
      throw new UnauthorizedException("You are not authorized");
    }
    await this.postRepository.update({ _id: id }, { isFrozen: true });
    // return response
    return res.status(200).json({
      message: "Post frozen successfully",
      success: true,
    });
  };

  public updatePost = async (req: Request, res: Response) => {
    // get data from req
    const { id } = req.params;
    const updatePostDto: UpdatePostDTO = req.body;
    // check post existance
    const postExist = await this.postRepository.exist({ _id: id });
    if (!postExist) throw new NotFoundException("Post not found");
    // update post
    if (postExist.userId.toString() !== req.user?._id.toString()) {
      throw new UnauthorizedException("You are not authorized");
    }
    await this.postRepository.update({ _id: id }, updatePostDto);
    // return response
    return res.status(200).json({
      message: "Post updated successfully",
      success: true,
    });
  };
}

export default new PostService();
