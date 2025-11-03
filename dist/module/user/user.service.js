"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_repository_1 = require("../../DB/model/user/user.repository");
class UserServise {
    constructor() { }
    userRepository = new user_repository_1.UserRepository();
    getProfile = async (req, res, next) => {
        // send response
        return res.status(200).json({
            message: "user fetched successfuly",
            success: true,
            data: { user: req.user },
        });
    };
}
exports.default = new UserServise();
