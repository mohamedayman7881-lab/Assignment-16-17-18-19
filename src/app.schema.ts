import { graphql, GraphQLObjectType, GraphQLSchema } from "graphql";
import { postQuery } from "./module/post/graphql/query";

let query = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    ...postQuery, // pull all props from postQuery (spread)
    // getUser: {},
    // getUsers: {},
    // getComment: {},
    // getComments: {},
    // getChat: {},
    // getChats: {},
    // getMessage: {},
    // getMessages: {},
  },
});

export const appSchema = new GraphQLSchema({ query });
