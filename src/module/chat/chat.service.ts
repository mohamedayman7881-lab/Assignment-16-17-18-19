import { Request, Response } from "express";
import { ChatRepository } from "../../DB";

class ChatService {
  private readonly chatRepository = new ChatRepository();

  getChat = async (req: Request, res: Response) => {
    // get data from req.user
    const { userId } = req.params;
    const userLoginId = req.user?._id;
    const chat = await this.chatRepository.getOne(
      {
        users: { $all: [userLoginId, userId] }, // use $all to find chat that have both userLoginId and userId only (not in)
      },
      {},
      { populate: [{ path: "messages" }] } // return messages of chat to FE can show them
    );
    return res.json({
      message: "done",
      success: true,
      data: { chat },
    });
  };
}
export default new ChatService();
