import { GraphQLID } from "graphql";
import { getPosts, getSpecificPost } from "./post-service.graphql";
import { ListPostResponse, PostResponse } from "./post-type.graphql";

export const postQuery = {
  getPost: {
    type: PostResponse,
    args: {
      id: { type: GraphQLID },
    },
    resolve: getSpecificPost, // resolve will return data as graphQLObject type
  },
  getPosts: {
    type: ListPostResponse,
    resolve: getPosts,
  },
};
