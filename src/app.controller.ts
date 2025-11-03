import cors from "cors";
import { NextFunction, Request, Response, type Express } from "express"; // Express is a type so get it prefix type to serch on types only
import { GraphQLError } from "graphql";
import { createHandler } from "graphql-http/lib/use/express"; // import createHandler from graphql-http/lib/use/express
import { appSchema } from "./app.schema";
import { connectDB } from "./DB";
import {
  authRouter,
  chatRouter,
  commentRouter,
  postRouter,
  userRouter,
} from "./module";
import { AppError } from "./utils";

export function bootstrap(app: Express, express: any) {
  // parsing data from row json
  app.use(express.json());
  // connect to DB
  connectDB(); // operation buffering
  // cors policy
  app.use(cors({ origin: "*" }));
  // auth router
  app.use("/auth", authRouter);
  // user router
  app.use("/user", userRouter);
  // post router
  app.use("/post", postRouter);
  // comment router
  app.use("/comment", commentRouter);
  // chat router
  app.use("/chat", chatRouter);
  // graphql router
  app.all(
    "/graphql",
    createHandler({
      schema: appSchema,
      formatError: (error: GraphQLError) => {
        // custom error format
        return {
          message: error.message,
          success: false,
          path: error.path,
          errorDetails: error.originalError,
        } as unknown as GraphQLError;
      },
      context: (req) => {
        // use context to make access to req and inject token into context
        const token = req.headers["authorization"];
        return {
          token,
        };
      },
    })
  );
  // to invalid req
  app.use("/{*dummy}", (req, res, next) => {
    return res.status(404).json({ message: "invalid router", success: false });
  });
  // error handler
  app.use((err: AppError, req: Request, res: Response, next: NextFunction) => {
    console.log(err);

    return res.status(err.statusCode || 500).json({
      message: err.message,
      success: false,
      errorDetails: err.errorDetails,
    });
  });
}
