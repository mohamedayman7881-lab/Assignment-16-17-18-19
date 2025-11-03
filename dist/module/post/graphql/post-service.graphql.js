"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPosts = exports.getSpecificPost = void 0;
const DB_1 = require("../../../DB");
const getSpecificPost = async (parent, args) => {
    const postRepo = new DB_1.PostRepository();
    const post = await postRepo.getOne({ _id: args.id }, {}, { populate: [{ path: "userId" }] });
    if (!post)
        throw new Error("Post not found");
    return {
        // custome on resolve
        message: "done",
        success: true,
        data: post,
    };
};
exports.getSpecificPost = getSpecificPost;
const getPosts = async (parent, args) => {
    const postRepository = new DB_1.PostRepository();
    const posts = await postRepository.getAll({}, {}, { populate: [{ path: "userId" }] });
    if (!posts)
        throw new Error("Posts not found");
    return {
        // custome on resolve
        message: "done",
        success: true,
        data: posts,
    };
};
exports.getPosts = getPosts;
