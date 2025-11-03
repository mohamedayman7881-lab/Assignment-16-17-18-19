import mongoose from "mongoose";
import { devConfig } from "../config/dev.config";

export const connectDB = async () => {
  await mongoose
    .connect(devConfig.DB_URL as string) // connect need url string but here string or undefined so we use as string
    .then(() => {
      console.log("DB connected successfully");
    })
    .catch((err) => {
      console.log("fail to connect to DB", err);
    });
};
