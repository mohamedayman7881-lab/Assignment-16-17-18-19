import { model } from "mongoose";
import { chatSchema } from "./chat.schema";

const Chat = model("Chat", chatSchema);

export default Chat;
