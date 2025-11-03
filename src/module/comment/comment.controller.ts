import { Router } from "express";
import { isAuthenticated } from "../../middleware";
import CommentService from "./comment.service";
const router = Router({ mergeParams: true }); // make params from parent router available to child router
/**
 * add comment
 * end point >> /post/:postId/comment
 * if replay >> /post/:postId/comment/:id >> id is optional so {/:id}
 * if replay too >> /comment/:id (notification)
 */
router.post("{/:id}", isAuthenticated(), CommentService.create);
router.get("/:id", isAuthenticated(), CommentService.getSpecific);
router.delete("/:id", isAuthenticated(), CommentService.deleteComment);
router.patch("/:id", isAuthenticated(), CommentService.addReaction);
router.patch("/:id/freeze", isAuthenticated(), CommentService.freezeComment);
router.patch("/:id/update", isAuthenticated(), CommentService.updateComment);   

export default router;
