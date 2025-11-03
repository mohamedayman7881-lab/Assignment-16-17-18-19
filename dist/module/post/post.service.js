"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DB_1 = require("../../DB");
const utils_1 = require("../../utils");
const factory_1 = require("./factory");
class PostService {
    postFactoryService = new factory_1.PostFactoryService();
    postRepository = new DB_1.PostRepository();
    create = async (req, res) => {
        // get data from req
        const createPostDTO = req.body;
        // factory >> prepare data post >> post entity
        const post = this.postFactoryService.createPost(createPostDTO, req.user);
        // repository >> save into DB
        const postCreated = await this.postRepository.create(post);
        // response
        return res.status(201).json({
            message: "post created successfuly",
            success: true,
            data: { postCreated },
        });
    };
    addReaction = async (req, res) => {
        // get data from req
        const { reaction } = req.body;
        const { id } = req.params;
        const userId = req.user?._id;
        // add reaction to post
        await (0, utils_1.addReactionProvider)(this.postRepository, id, reaction, userId);
        // response
        return res.sendStatus(204);
    };
    getSpecificPost = async (req, res) => {
        // get data from req
        const { id } = req.params;
        // get post and check existance
        const post = await this.postRepository.getOne({ _id: id }, {}, {
            populate: [
                { path: "userId", select: "fullName firstName lastName" }, // populate : chose fields to show and select from it >> fullName is virtual field so must select frist and last to calculate
                { path: "reactions.userId", select: "fullName firstName lastName" },
                { path: "comments.userId", match: { parentId: null } }, // to show only comments that have no parentIds (frist layer)
            ],
        });
        if (!post)
            throw new utils_1.NotFoundException("Post not found");
        // response
        return res.status(200).json({
            message: "post found successfuly",
            success: true,
            data: { post },
        });
    };
    deletePost = async (req, res) => {
        // get data from req
        const { id } = req.params;
        // check post existance
        const postExist = await this.postRepository.exist({ _id: id });
        if (!postExist)
            throw new utils_1.NotFoundException("Post not found");
        // delete post
        if (postExist.userId.toString() !== req.user?._id.toString()) {
            throw new utils_1.UnauthorizedException("You are not authorized");
        }
        await this.postRepository.delete({ _id: id });
        // return response
        return res.status(200).json({
            message: "Post deleted successfully",
            success: true,
        });
    };
}
exports.default = new PostService();
