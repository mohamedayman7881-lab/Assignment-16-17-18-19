import { Schema } from "mongoose";
import { IMessage } from "../../../utils";

export const messageSchema = new Schema<IMessage>(
  {
    content: String,
    sender: {
      // message schema have a sender only not receiver becuse we have chat schema that have users array
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);
