"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appSchema = void 0;
const graphql_1 = require("graphql");
const query_1 = require("./module/post/graphql/query");
let query = new graphql_1.GraphQLObjectType({
    name: "RootQuery",
    fields: {
        ...query_1.postQuery, // pull all props from postQuery (spread)
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
exports.appSchema = new graphql_1.GraphQLSchema({ query });
