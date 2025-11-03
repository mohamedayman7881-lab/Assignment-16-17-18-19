import { Router } from "express";
import { isAuthenticated } from "../../middleware";
import userService from "./user.service";
const router = Router();

router.get("/profile", isAuthenticated(), userService.getProfile);
router.put("/:id/block  ", isAuthenticated(), userService.blockUser);
router.patch(
  "/:id/friendRequest",
  isAuthenticated(),
  userService.deleteFriendRequest
);
router.patch("/:id/friend", isAuthenticated(), userService.unFriend);

export default router;
