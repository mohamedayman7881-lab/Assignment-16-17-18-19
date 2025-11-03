"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.chatRouter = exports.commentRouter = exports.userRouter = exports.postRouter = exports.authRouter = void 0;
// collect dublicated imports
const auth_controller_1 = __importDefault(require("./auth/auth.controller"));
exports.authRouter = auth_controller_1.default;
const comment_controller_1 = __importDefault(require("./comment/comment.controller"));
exports.commentRouter = comment_controller_1.default;
const post_controller_1 = __importDefault(require("./post/post.controller"));
exports.postRouter = post_controller_1.default;
const user_controller_1 = __importDefault(require("./user/user.controller"));
exports.userRouter = user_controller_1.default;
const chat_controller_1 = __importDefault(require("./chat/chat.controller"));
exports.chatRouter = chat_controller_1.default;
// maybe we need to export commentRouter before postRouter if postRouter use commentRouter
// and maybe the tow need to export in the same time >> proplem of circular dependencies
