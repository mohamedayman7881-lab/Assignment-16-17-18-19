import { NextFunction, Request, Response } from "express";
import { UserRepository } from "../../DB/model/user/user.repository";
import { NotFoundException, UnauthorizedException } from "../../utils";

class UserServise {
  constructor() {}
  private readonly userRepository = new UserRepository();
  getProfile = async (req: Request, res: Response) => {
    // send response
    return res.status(200).json({
      message: "user fetched successfuly",
      success: true,
      data: { user: req.user },
    });
  };

  blockUser = async (req: Request, res: Response) => {
    // get data from req
    const { id } = req.params;
    // check user existance
    const userExist = await this.userRepository.exist({ _id: id });
    if (!userExist) throw new NotFoundException("User not found");
    // block user
    if (userExist._id.toString() !== req.user?._id.toString()) {
      throw new UnauthorizedException("You are not authorized");
    }
    await this.userRepository.update({ _id: id }, { isBlocked: true });
    // return response
    return res.status(200).json({
      message: "User blocked successfully",
      success: true,
    });
  };

  deleteFriendRequest = async (req: Request, res: Response) => {
    // get data from req
    const { id } = req.params;
    // check user existance
    const userExist = await this.userRepository.exist({ _id: id });
    if (!userExist) throw new NotFoundException("User not found");
    // delete friend request
    if (userExist._id.toString() !== req.user?._id.toString()) {
      throw new UnauthorizedException("You are not authorized");
    }
    await this.userRepository.update(
      { _id: id },
      { frindRequests: { $pull: req.user?._id } }
    );
    // return response
    return res.status(200).json({
      message: "Friend request deleted successfully",
      success: true,
    });
  };

  unFriend = async (req: Request, res: Response) => {
    // get data from req
    const { id } = req.params;
    // check user existance
    const userExist = await this.userRepository.exist({ _id: id });
    if (!userExist) throw new NotFoundException("User not found");
    // unFriend
    if (userExist._id.toString() !== req.user?._id.toString()) {
      throw new UnauthorizedException("You are not authorized");
    }
    await this.userRepository.update(
      { _id: id },
      { friends: { $pull: req.user?._id } }
    );
    // return response
    return res.status(200).json({
      message: "Friend deleted successfully",
      success: true,
    });
  };
}
export default new UserServise();
