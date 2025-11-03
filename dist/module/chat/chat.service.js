"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DB_1 = require("../../DB");
class ChatService {
    chatRepository = new DB_1.ChatRepository();
    getChat = async (req, res) => {
        // get data from req.user
        const { userId } = req.params;
        const userLoginId = req.user?._id;
        const chat = await this.chatRepository.getOne({
            users: { $all: [userLoginId, userId] }, // use $all to find chat that have both userLoginId and userId only (not in)
        }, {}, { populate: [{ path: "messages" }] } // return messages of chat to FE can show them
        );
        return res.json({
            message: "done",
            success: true,
            data: { chat },
        });
    };
}
exports.default = new ChatService();
