"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DB_1 = require("../../DB");
const utils_1 = require("../../utils");
const factory_1 = require("./factory");
class CommentService {
    postRepository = new DB_1.PostRepository();
    commentRepository = new DB_1.CommentRepository();
    commentFactoryService = new factory_1.CommentFactoryService();
    create = async (req, res) => {
        // get data from req
        const { postId, id } = req.params;
        const createCommentDTO = req.body;
        // check post exist
        const postExist = await this.postRepository.exist({
            _id: postId,
        });
        if (!postExist)
            throw new utils_1.NotFoundException("Post not found ");
        // check parent comment exist
        let commentExist = undefined; // to use it out of scope "if"
        if (id) {
            commentExist = await this.commentRepository.exist({
                _id: id,
            });
            if (!commentExist)
                throw new utils_1.NotFoundException("Comment not found");
        }
        // prepare data
        const comment = this.commentFactoryService.createComment(createCommentDTO, req.user, postExist, commentExist);
        // create comment into DB
        const createdComment = await this.commentRepository.create(comment);
        // return response
        return res.status(201).json({
            message: "Comment created successfully",
            success: true,
            data: { createdComment },
        });
    };
    getSpecific = async (req, res) => {
        // get data from req
        const { id } = req.params;
        // get comment and check existance
        const comment = await this.commentRepository.exist({ _id: id }, {}, {
            populate: [{ path: "replies" }], // populate replies to get it with comment as specific
        });
        if (!comment)
            throw new utils_1.NotFoundException("Comment not found");
        // return response
        return res.status(200).json({
            message: "Comment found successfully",
            success: true,
            data: { comment },
        });
    };
    deleteComment = async (req, res) => {
        // get data from req
        const { id } = req.params;
        // check comment existance
        const commentExist = await this.commentRepository.exist({ _id: id }, {}, {
            populate: [{ path: "postId", select: "userId" }], // to get userId of post
        });
        if (!commentExist)
            throw new utils_1.NotFoundException("Comment not found");
        // delete comment
        if (![
            commentExist.userId.toString(),
            commentExist.postId.userId.toString(),
        ].includes(req.user?._id.toString())) {
            throw new utils_1.UnauthorizedException("You are not authorized");
        }
        await this.commentRepository.delete({ _id: id });
        // return response
        return res.status(200).json({
            message: "Comment deleted successfully",
            success: true,
        });
    };
    addReaction = async (req, res) => {
        // get data from req
        const { reaction } = req.body;
        const { id } = req.params;
        const userId = req.user?._id;
        // add reaction to comment
        await (0, utils_1.addReactionProvider)(this.commentRepository, id, reaction, userId);
        // response
        return res.sendStatus(204);
    };
}
exports.default = new CommentService();
