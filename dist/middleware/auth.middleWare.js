"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
const DB_1 = require("../DB");
const utils_1 = require("../utils");
// create auth middleware to check authentication before some of service
const isAuthenticated = () => {
    return async (req, res, next) => {
        // get token from req
        const token = req.headers.authorization;
        // check on token
        const payload = (0, utils_1.verifyToken)({ token }); // payload distruct id and role from token
        // check user existance
        const userRepository = new DB_1.UserRepository();
        const userExist = await userRepository.exist({ _id: payload.id }, {}, { populate: [{ path: "friends", select: "fullName firstName lastName" }] });
        if (!userExist) {
            throw new utils_1.NotFoundException("User not found");
        }
        // check token blocked
        // chek logout from all devices (credential ubdatedAt)
        // pass informations of user to req obj
        req.user = userExist;
        next();
    };
};
exports.isAuthenticated = isAuthenticated;
