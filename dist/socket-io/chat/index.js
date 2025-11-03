"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMessage = void 0;
const DB_1 = require("../../DB");
// clusure : function that return function
const sendMessage = (socket, io, userConnected) => {
    return async (data) => {
        // emit tow event to receiver user and sender user // to every one of them send and receive message
        const destSocket = userConnected.get(data.destId); // get receiver id
        // send user
        socket.emit("successMessage", data);
        // receiver user
        io.to(destSocket).emit("receiveMessage", data);
        // save message in DB
        // create message
        const sender = socket.data.user.id;
        const messageRepo = new DB_1.MessageRepository();
        const createdMessage = await messageRepo.create({
            content: data.message,
            sender,
        });
        const chatRepo = new DB_1.ChatRepository();
        const chat = await chatRepo.getOne({
            users: { $all: [sender, data.destId] },
        });
        // create new chat if not exist
        if (!chat) {
            await chatRepo.create({
                users: [sender, data.destId],
                messages: [createdMessage._id],
            });
        }
        // if chat exist add message to chat
        else {
            await chatRepo.update({ _id: chat._id }, { $push: { messages: createdMessage._id } });
        }
    };
};
exports.sendMessage = sendMessage;
