"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postSchema = void 0;
const mongoose_1 = require("mongoose");
const comment_1 = require("../comment");
const common_1 = require("../common");
// post schema
exports.postSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
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
    reactions: [common_1.reactionSchema], // reactionSchema is a imbedded document
    attachments: [
        {
            url: String,
            id: String,
        },
    ],
}, { timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } });
// make comments in schema as a virtual field
exports.postSchema.virtual("comments", {
    localField: "_id",
    foreignField: "postId",
    ref: "Comment",
});
// delete comments related to post before delete post
exports.postSchema.pre("deleteOne", async function (next) {
    const filter = typeof this.getFilter == "function" ? this.getFilter() : {};
    // const firistLayerComments = await Comment.find({ postId: filter._id });
    // if (firistLayerComments.length) {
    //   for (const comment of firistLayerComments) {
    //     await Comment.deleteOne({ _id: comment._id });
    //   }
    // }
    await comment_1.Comment.deleteMany({ postId: filter._id }); // every comment and reply have postId
    next();
});
