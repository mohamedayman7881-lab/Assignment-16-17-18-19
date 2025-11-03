"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../../utils");
const DB_1 = require("../../DB");
const factory_1 = require("./factory");
const auth_provider_1 = require("./provider/auth.provider");
const token_1 = require("../../utils/token");
class AuthService {
    // take UserRepository instance >> to control DB services
    userRepository = new DB_1.UserRepository();
    // take AuthFactoryService instance >> to control to validate register data >> use with create and update (return user entity)
    authFactoryService = new factory_1.AuthFactoryService();
    constructor() { }
    // register
    register = async (req, res) => {
        // get data from req
        // registerDto is a object from type RegisterUserDTO >> so it is distract data from req.body
        const registerDto = req.body;
        // validate data >> against registerSchema
        // check user existance
        const userExist = await this.userRepository.exist({
            email: registerDto.email,
        });
        if (userExist) {
            throw new utils_1.ConflictException("User already exists"); // use conflictException class to throw error >> and send the message only
        }
        // prepare data >> create user document - hashing - encription - generate otb - translator
        const user = await this.authFactoryService.register(registerDto);
        // save into DB
        const userCreated = await this.userRepository.create(user); // send user to create method (after prepare data) not registerDto (from req.body)
        // send mail >> hook pre save into DB
        // send response
        return res.status(201).json({
            message: "user created successfuly",
            success: true,
            data: { userCreated },
        });
    };
    // verify account
    verifyAccount = async (req, res) => {
        // get data from req
        const verifyAccountDto = req.body;
        await auth_provider_1.authProvider.checkOtp(verifyAccountDto);
        // update into DB
        await this.userRepository.update(
        // this.userRepository is a provider
        { email: verifyAccountDto.email }, { isVerified: true, $unset: { otp: "", otpExpiryAt: "" } });
        // send response
        return res.sendStatus(204); // no content
    };
    // login
    login = async (req, res) => {
        // get data from req
        const loginDTO = req.body;
        // check user existance
        const userExist = await this.userRepository.exist({
            email: loginDTO.email,
        });
        if (!userExist) {
            throw new utils_1.ForbiddenException("invalid credential");
        }
        // check password
        if (!(await (0, utils_1.compareHash)(loginDTO.password, userExist.password))) {
            throw new utils_1.ForbiddenException("invalid credential");
        }
        // generate access token
        const accessToken = (0, token_1.generateToken)({
            payload: { id: userExist._id, role: userExist.role },
            options: { expiresIn: "1h" },
        });
        // generate refresh token
        const refreshToken = (0, token_1.generateToken)({
            payload: { id: userExist._id, role: userExist.role },
            options: { expiresIn: "7d" },
        });
        // send responce  
        return res.status(200).json({
            message: "login successful",
            success: true,
            data: { accessToken, refreshToken },
        });
    };
}
exports.default = new AuthService();
