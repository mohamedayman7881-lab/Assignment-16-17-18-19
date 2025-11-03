"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthFactoryService = void 0;
const enum_1 = require("../../../utils/common/enum");
const hash_1 = require("../../../utils/hash");
const otp_1 = require("../../../utils/otp");
const entity_1 = require("../entity");
// create auth factory class to validate data and compare with class entity (factory design pattern)
class AuthFactoryService {
    async register(registerUserDTO) {
        // send data came from front end to validate it
        const user = new entity_1.User(); // take new instance from class user entity to compare with data came from front end
        user.fullName = registerUserDTO.fullName; // fullName in registerUserDTO is optional so we use as string to convert it to string
        user.email = registerUserDTO.email;
        user.password = await (0, hash_1.generateHash)(registerUserDTO.password);
        user.phoneNumber = registerUserDTO.phoneNumber; // encrypt phoneNumber  // phoneNumber in registerUserDTO is optional so we use as string to convert it to string
        user.role = enum_1.SYS_ROLE.user; // give to him defult user with register
        user.gender = registerUserDTO.gender;
        user.agent = enum_1.USER_AGENT.local; // give to him defult local with register
        user.otp = (0, otp_1.generateOTP)();
        user.otpExpiryAt = (0, otp_1.generateExpiryDate)(5 * 60 * 60 * 1000);
        user.credentialUpdatedAt = Date.now();
        user.isVerified = false;
        return user;
    }
}
exports.AuthFactoryService = AuthFactoryService;
