// collect dublicated imports
import authRouter from "./auth/auth.controller";
import commentRouter from "./comment/comment.controller";
import postRouter from "./post/post.controller";
import userRouter from "./user/user.controller";
import chatRouter from "./chat/chat.controller";

export { authRouter, postRouter, userRouter, commentRouter, chatRouter };

// maybe we need to export commentRouter before postRouter if postRouter use commentRouter
// and maybe the tow need to export in the same time >> proplem of circular dependencies
