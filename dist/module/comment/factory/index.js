"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentFactoryService = void 0;
const entity_1 = require("../entity");
class CommentFactoryService {
    createComment = (createCommentDTO, user, post, comment) => {
        const newComment = new entity_1.Comment();
        newComment.userId = user._id;
        newComment.postId = post?._id || comment?.postId; // if reply on comment and not have information of user get postId from comment
        newComment.content = createCommentDTO.content;
        newComment.parentId = comment?._id;
        newComment.reactions = [];
        return newComment;
    };
}
exports.CommentFactoryService = CommentFactoryService;
