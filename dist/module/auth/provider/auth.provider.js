"use strict";
// provider >> is a sub service
Object.defineProperty(exports, "__esModule", { value: true });
exports.authProvider = void 0;
const DB_1 = require("../../../DB");
const utils_1 = require("../../../utils");
// create auth provider class to handle sub services of auth module
exports.authProvider = {
    // must not make arow key fenction on layer one of object to can "this" keyword to access to class properties
    async checkOtp(verifyAccountDto) {
        const userRepository = new DB_1.UserRepository();
        // check user existance
        const userExist = await userRepository.exist({
            email: verifyAccountDto.email,
        });
        if (!userExist) {
            throw new utils_1.NotFoundException("User not found");
        }
        // check otp
        if (verifyAccountDto.otp !== userExist.otp) {
            throw new utils_1.BadRequestException("Invalid otp");
        }
        // check otpExpiryAt
        if (userExist.otpExpiryAt < new Date()) {
            throw new utils_1.BadRequestException("Otp expired");
        }
    }
};
