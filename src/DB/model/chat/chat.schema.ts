import { Schema } from "mongoose";
import { IChat } from "../../../utils";

export const chatSchema = new Schema<IChat>(
  {
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    messages: [
      // make message as a ref document not embedded document to limit
      {
        type: Schema.Types.ObjectId,
        ref: "Message",
      },
    ],
  },
  { timestamps: true }
);
