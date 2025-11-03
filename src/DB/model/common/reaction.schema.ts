import { Schema } from "mongoose";
import { IReaction, REACTION } from "../../../utils";

// reaction schema
export const reactionSchema = new Schema<IReaction>(
  {
    reaction: {
      type: Number,
      enum: REACTION,
      default: REACTION.like,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);
