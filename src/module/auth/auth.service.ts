import type { Request, Response } from "express";
import { UserRepository } from "../../DB";
import {
  compareHash,
  ConflictException,
  ForbiddenException,
  generateOTP,
  sendMail,
} from "../../utils";
import { generateToken } from "../../utils/token";
import {
  LoginDTO,
  RegisterUserDTO,
  ResetPasswordDTO,
  SendOtpDTO,
  UpdateEmailDTO,
  VerifyAccountDTO,
} from "./auth.dto";
import { AuthFactoryService } from "./factory";
import { authProvider } from "./provider/auth.provider";

class AuthService {
  // take UserRepository instance >> to control DB services
  private userRepository = new UserRepository();
  // take AuthFactoryService instance >> to control to validate register data >> use with create and update (return user entity)
  private authFactoryService = new AuthFactoryService();
  constructor() {}

  // register
  register = async (req: Request, res: Response) => {
    // get data from req
    // registerDto is a object from type RegisterUserDTO >> so it is distract data from req.body
    const registerDto: RegisterUserDTO = req.body;
    // validate data >> against registerSchema

    // check user existance
    const userExist = await this.userRepository.exist({
      email: registerDto.email,
    });
    if (userExist) {
      throw new ConflictException("User already exists"); // use conflictException class to throw error >> and send the message only
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
  verifyAccount = async (req: Request, res: Response) => {
    // get data from req
    const verifyAccountDto: VerifyAccountDTO = req.body;
    await authProvider.checkOtp(verifyAccountDto);
    // update into DB
    await this.userRepository.update(
      // this.userRepository is a provider
      { email: verifyAccountDto.email },
      { isVerified: true, $unset: { otp: "", otpExpiryAt: "" } }
    );
    // send response
    return res.sendStatus(204); // no content
  };

  // login
  login = async (req: Request, res: Response) => {
    // get data from req
    const loginDTO: LoginDTO = req.body;
    // check user existance
    const userExist = await this.userRepository.exist({
      email: loginDTO.email,
    });
    if (!userExist) {
      throw new ForbiddenException("invalid credential");
    }
    // check password
    if (!(await compareHash(loginDTO.password, userExist.password))) {
      throw new ForbiddenException("invalid credential");
    }
    // generate access token
    const accessToken = generateToken({
      payload: { id: userExist._id, role: userExist.role },
      options: { expiresIn: "1h" },
    });
    // generate refresh token
    const refreshToken = generateToken({
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

  // send otp
  sendOtp = async (req: Request, res: Response) => {
    // get data from req
    const sendOtpDto: SendOtpDTO = req.body;
    // check user existance
    const userExist = await this.userRepository.exist({
      email: sendOtpDto.email,
    });
    if (!userExist) {
      throw new ForbiddenException("invalid credential");
    }
    // generate otp
    const otp = generateOTP();
    // update into DB
    await this.userRepository.update(
      { email: sendOtpDto.email },
      { otp, otpExpiryAt: new Date(Date.now() + 60 * 60 * 1000) }
    );
    // send mail
    await sendMail({
      to: sendOtpDto.email,
      subject: "new otp",
      text: `<p>new otp to verify your account is ${otp}</p>`,
    });
    // send response
    return res.sendStatus(204); // no content
  };

  // reset password
  resetPassword = async (req: Request, res: Response) => {
    // get data from req
    const resetPasswordDto: ResetPasswordDTO = req.body;
    // check user existance
    const userExist = await this.userRepository.exist({
      email: resetPasswordDto.email,
    });
    if (!userExist) {
      throw new ForbiddenException("invalid credential");
    }
    // check otp
    authProvider.checkOtp({
      email: resetPasswordDto.email,
      otp: resetPasswordDto.otp,
    });
    // update into DB
    await this.userRepository.update(
      { email: resetPasswordDto.email },
      { password: resetPasswordDto.password }
    );
    // send response
    return res.sendStatus(204); // no content
  };

  // update email
  updateEmail = async (req: Request, res: Response) => {
    // get data from req
    const updateEmailDto: UpdateEmailDTO = req.body;
    // check user existance
    const userExist = await this.userRepository.exist({
      email: updateEmailDto.email,
    });
    if (!userExist) {
      throw new ForbiddenException("invalid credential");
    }
    // update into DB
    await this.userRepository.update(
      { email: updateEmailDto.email },
      { email: updateEmailDto.newEmail }
    );
    // send response
    return res.sendStatus(204); // no content
  };
}
export default new AuthService();
