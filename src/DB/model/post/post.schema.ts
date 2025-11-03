import { Schema } from "mongoose";
import { IPost } from "../../../utils";
import { Comment } from "../comment";
import { reactionSchema } from "../common";
// post schema
export const postSchema = new Schema<IPost>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      //   required: function () {
      //     if (this.attachments?.length) {
      //       return false;
      //     }
      //     return true;
      //   }, todo
      trim: true, // remove space from start and end
    },
    reactions: [reactionSchema], // reactionSchema is a imbedded document
    attachments: [
      {
        url: String,
        id: String,
      },
    ],
    isFrozen: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } }
);

// make comments in schema as a virtual field
postSchema.virtual("comments", {
  localField: "_id",
  foreignField: "postId",
  ref: "Comment",
});

// delete comments related to post before delete post
postSchema.pre("deleteOne", async function (next) {
  const filter = typeof this.getFilter == "function" ? this.getFilter() : {};
  // const firistLayerComments = await Comment.find({ postId: filter._id });
  // if (firistLayerComments.length) {
  //   for (const comment of firistLayerComments) {
  //     await Comment.deleteOne({ _id: comment._id });
  //   }
  // }
  await Comment.deleteMany({ postId: filter._id }); // every comment and reply have postId
  next();
});
