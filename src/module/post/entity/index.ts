import { ObjectId } from "mongoose";
import { IAttachment, IReaction } from "../../../utils";

export class Post {
  public userId!: ObjectId;
  public content!: string;
  public reactions!: IReaction[];
  public attachments?: IAttachment[];
}
