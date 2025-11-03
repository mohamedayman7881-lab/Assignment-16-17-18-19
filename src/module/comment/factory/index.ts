import { ObjectId } from "mongoose";
import { IAttachment, IComment, IPost, IUser } from "../../../utils";
import { CreateCommentDTO } from "../comment.dto";
import { Comment } from "../entity";

export class CommentFactoryService {
  createComment = (
    createCommentDTO: CreateCommentDTO,
    user: IUser,
    post: IPost,
    comment?: IComment
  ) => {
    const newComment = new Comment();

    newComment.userId = user._id;
    newComment.postId = post?._id || comment?.postId; // if reply on comment and not have information of user get postId from comment
    newComment.content = createCommentDTO.content;
    newComment.parentId = comment?._id as ObjectId;
    newComment.reactions = [];
    return newComment;
  };
}
