import { model } from "mongoose";
import { messageSchema } from "./message.schema";

const Message = model("Message", messageSchema);

export default Message;
