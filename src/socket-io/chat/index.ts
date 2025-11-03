import { ObjectId } from "mongoose";
import { Server, Socket } from "socket.io";
import { ChatRepository, MessageRepository } from "../../DB";

interface ISendMessage {
  message: string;
  destId: string;
}

// clusure : function that return function
export const sendMessage = (
  socket: Socket,
  io: Server,
  userConnected: Map<string, string>
) => {
  return async (data: ISendMessage) => {
    // emit tow event to receiver user and sender user // to every one of them send and receive message
    const destSocket = userConnected.get(data.destId) as string; // get receiver id
    // send user
    socket.emit("successMessage", data);
    // receiver user
    io.to(destSocket).emit("receiveMessage", data);
    // save message in DB
    // create message
    const sender = socket.data.user.id;
    const messageRepo = new MessageRepository();
    const createdMessage = await messageRepo.create({
      content: data.message,
      sender,
    });
    const chatRepo = new ChatRepository();
    const chat = await chatRepo.getOne({
      users: { $all: [sender, data.destId] },
    });
    // create new chat if not exist
    if (!chat) {
      await chatRepo.create({
        users: [sender, data.destId],
        messages: [createdMessage._id as unknown as ObjectId],
      });
    }
    // if chat exist add message to chat
    else {
      await chatRepo.update(
        { _id: chat._id },
        { $push: { messages: createdMessage._id } }
      );
    }
  };
};
