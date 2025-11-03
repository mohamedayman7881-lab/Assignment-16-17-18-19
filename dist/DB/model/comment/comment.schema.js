"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commentSchema = void 0;
const mongoose_1 = require("mongoose");
const common_1 = require("../common");
// comment schema
exports.commentSchema = new mongoose_1.Schema({
    postId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Post",
        required: true,
    },
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    parentId: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Comment",
    },
    content: {
        type: String,
        required: function () {
            if (this.attachments) {
                return false;
            }
            return true;
        },
    },
    attachments: [
        {
            url: String,
            id: String,
        },
    ],
    reactions: [common_1.reactionSchema],
}, { timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } });
// virtual field replies
exports.commentSchema.virtual("replies", {
    ref: "Comment",
    localField: "_id",
    foreignField: "parentId",
});
// delete replies before delete comment
exports.commentSchema.pre("deleteOne", { document: false, query: true }, async function (next) {
    // filter is the filter of deletOne in service
    const filter = typeof this.getFilter == "function" ? this.getFilter() : {}; // if filter not exist >> return empty object
    const replies = await this.model.find({ parentId: filter._id }); // find the replies to delete it
    if (replies.length) {
        // if replies exist
        for (const reply of replies) {
            // loop on replies and delete it
            await this.model.deleteOne({ _id: reply._id });
        }
    }
    next(); // next call after delete all replies so delete parent comment
});
