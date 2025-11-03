import { ObjectId } from "mongoose";
import { IAttachment, IReaction } from "../../../utils";

export class Comment {
  _id!: ObjectId;
  postId!: ObjectId;
  userId!: ObjectId;
  parentId!: ObjectId | null;
  content!: string;
  attachments?: IAttachment;
  reactions!: IReaction[];
  mentions?: ObjectId[];
}
