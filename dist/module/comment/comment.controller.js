"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const middleware_1 = require("../../middleware");
const comment_service_1 = __importDefault(require("./comment.service"));
const router = (0, express_1.Router)({ mergeParams: true }); // make params from parent router available to child router
/**
 * add comment
 * end point >> /post/:postId/comment
 * if replay >> /post/:postId/comment/:id >> id is optional so {/:id}
 * if replay too >> /comment/:id (notification)
 */
router.post("{/:id}", (0, middleware_1.isAuthenticated)(), comment_service_1.default.create);
router.get("/:id", (0, middleware_1.isAuthenticated)(), comment_service_1.default.getSpecific);
router.delete("/:id", (0, middleware_1.isAuthenticated)(), comment_service_1.default.deleteComment);
router.patch("/:id", (0, middleware_1.isAuthenticated)(), comment_service_1.default.addReaction);
exports.default = router;
