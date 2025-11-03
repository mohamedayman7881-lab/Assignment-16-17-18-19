"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postQuery = void 0;
const graphql_1 = require("graphql");
const post_service_graphql_1 = require("./post-service.graphql");
const post_type_graphql_1 = require("./post-type.graphql");
exports.postQuery = {
    getPost: {
        type: post_type_graphql_1.PostResponse,
        args: {
            id: { type: graphql_1.GraphQLID },
        },
        resolve: post_service_graphql_1.getSpecificPost, // resolve will return data as graphQLObject type
    },
    getPosts: {
        type: post_type_graphql_1.ListPostResponse,
        resolve: post_service_graphql_1.getPosts,
    },
};
