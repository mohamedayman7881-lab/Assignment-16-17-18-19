import { ObjectId } from "mongoose";
import { PostRepository } from "../../../DB";
import { isAuthenticatedGraphql, isValidGraphql } from "../../../middleware";
import { postValidation } from "./post-validation.graphql";

export const getSpecificPost = async (
  parent: object,
  args: { id: ObjectId },
  context: any
) => {
  // implement auth function return void or throw error (use this function as middleware becuse graphql not have middleware concept)
  await isAuthenticatedGraphql(context);
  // implement validation function return void or throw error
  isValidGraphql(postValidation, args);
  const postRepo = new PostRepository();
  const post = await postRepo.getOne(
    { _id: args.id },
    {},
    { populate: [{ path: "userId" }] }
  );
  if (!post) throw new Error("Post not found");
  return {
    // custome on resolve
    message: "done",
    success: true,
    data: post,
  };
};

export const getPosts = async (parent: object, args: {}) => {
  const postRepository = new PostRepository();
  const posts = await postRepository.getAll(
    {},
    {},
    { populate: [{ path: "userId" }] }
  );
  if (!posts) throw new Error("Posts not found");
  return {
    // custome on resolve
    message: "done",
    success: true,
    data: posts,
  };
};
