"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const __1 = require("..");
const middleware_1 = require("../../middleware");
const post_service_1 = __importDefault(require("./post.service"));
const router = (0, express_1.Router)();
// any req on end point /post/:postId/comment send to commentRouter
router.use("/:postId/comment", __1.commentRouter);
router.post("/", (0, middleware_1.isAuthenticated)(), post_service_1.default.create);
router.patch("/:id", (0, middleware_1.isAuthenticated)(), post_service_1.default.addReaction);
router.get("/:id", post_service_1.default.getSpecificPost);
router.delete("/:id", (0, middleware_1.isAuthenticated)(), post_service_1.default.deletePost);
exports.default = router;
