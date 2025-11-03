"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ListPostResponse = exports.PostResponse = exports.PostType = void 0;
const graphql_1 = require("graphql");
const user_tupe_graphql_1 = require("../../user/graphql/user-tupe.graphql");
exports.PostType = new graphql_1.GraphQLObjectType({
    name: "Post",
    fields: {
        _id: { type: graphql_1.GraphQLID },
        content: { type: graphql_1.GraphQLString },
        userId: {
            type: user_tupe_graphql_1.UserType,
        },
        createdAt: {
            type: graphql_1.GraphQLString,
            resolve: (parent) => {
                if (parent.createdAt) {
                    return new Date(parent.createdAt).toISOString();
                }
                return parent.createdAt;
            }, //  casting to ms
        },
        updatedAt: {
            type: graphql_1.GraphQLString,
            resolve: (parent) => {
                if (parent.updatedAt) {
                    return new Date(parent.updatedAt).toISOString();
                }
                return parent.updatedAt;
            }, //  casting to ms
        },
    },
});
exports.PostResponse = new graphql_1.GraphQLObjectType({
    name: "PostResponse",
    fields: {
        message: { type: graphql_1.GraphQLString },
        success: { type: graphql_1.GraphQLBoolean },
        data: { type: exports.PostType },
    },
});
exports.ListPostResponse = new graphql_1.GraphQLObjectType({
    name: "PostsResponse",
    fields: {
        message: { type: graphql_1.GraphQLString },
        success: { type: graphql_1.GraphQLBoolean },
        data: { type: new graphql_1.GraphQLList(exports.PostType) },
    },
});
