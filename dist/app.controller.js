"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bootstrap = bootstrap;
const cors_1 = __importDefault(require("cors"));
const express_1 = require("graphql-http/lib/use/express"); // import createHandler from graphql-http/lib/use/express
const app_schema_1 = require("./app.schema");
const DB_1 = require("./DB");
const module_1 = require("./module");
function bootstrap(app, express) {
    // parsing data from row json
    app.use(express.json());
    // connect to DB
    (0, DB_1.connectDB)(); // operation buffering
    // cors policy
    app.use((0, cors_1.default)({ origin: "*" }));
    // auth router
    app.use("/auth", module_1.authRouter);
    // user router
    app.use("/user", module_1.userRouter);
    // post router
    app.use("/post", module_1.postRouter);
    // comment router
    app.use("/comment", module_1.commentRouter);
    // chat router
    app.use("/chat", module_1.chatRouter);
    // graphql router
    app.all("/graphql", (0, express_1.createHandler)({
        schema: app_schema_1.appSchema,
        formatError: (error) => {
            // custom error format
            return {
                message: error.message,
                success: false,
                path: error.path,
                errorDetails: error.originalError,
            };
        },
    }));
    // to invalid req
    app.use("/{*dummy}", (req, res, next) => {
        return res.status(404).json({ message: "invalid router", success: false });
    });
    // error handler
    app.use((err, req, res, next) => {
        console.log(err);
        return res.status(err.statusCode || 500).json({
            message: err.message,
            success: false,
            errorDetails: err.errorDetails,
        });
    });
}
