import {
  GraphQLBoolean,
  GraphQLID,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
} from "graphql";
import { UserType } from "../../user/graphql/user-tupe.graphql";

export const PostType = new GraphQLObjectType({
  name: "Post",
  fields: {
    _id: { type: GraphQLID },
    content: { type: GraphQLString },
    userId: {
      type: UserType,
    },
    createdAt: {
      type: GraphQLString,
      resolve: (parent) => {
        if (parent.createdAt) {
          return new Date(parent.createdAt).toISOString();
        }
        return parent.createdAt;
      }, //  casting to ms
    },
    updatedAt: {
      type: GraphQLString,
      resolve: (parent) => {
        if (parent.updatedAt) {
          return new Date(parent.updatedAt).toISOString();
        }
        return parent.updatedAt;
      }, //  casting to ms
    },
  },
});

export const PostResponse = new GraphQLObjectType({
  name: "PostResponse",
  fields: {
    message: { type: GraphQLString },
    success: { type: GraphQLBoolean },
    data: { type: PostType },
  },
});

export const ListPostResponse = new GraphQLObjectType({
  name: "PostsResponse",
  fields: {
    message: { type: GraphQLString },
    success: { type: GraphQLBoolean },
    data: { type: new GraphQLList(PostType) },
  },
});
