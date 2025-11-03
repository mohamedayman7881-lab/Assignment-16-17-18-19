import { Router } from "express";
import { commentRouter } from "..";
import { isAuthenticated } from "../../middleware";
import postService from "./post.service";

const router = Router();

// any req on end point /post/:postId/comment send to commentRouter
router.use("/:postId/comment", commentRouter);

router.post("/", isAuthenticated(), postService.create);
router.patch("/:id", isAuthenticated(), postService.addReaction);
router.get("/:id", postService.getSpecificPost);
router.delete("/:id", isAuthenticated(), postService.deletePost);
router.patch("/:id/freeze", isAuthenticated(), postService.freezePost);
router.patch("/:id/update", isAuthenticated(), postService.updatePost);
export default router;
