// provider >> is a sub service

import { UserRepository } from "../../../DB";
import { BadRequestException, NotFoundException } from "../../../utils";
import { VerifyAccountDTO } from "../auth.dto";

// create auth provider class to handle sub services of auth module
export const authProvider = {
  // must not make arow key fenction on layer one of object to can "this" keyword to access to class properties
  async checkOtp(verifyAccountDto: VerifyAccountDTO) {
    const userRepository = new UserRepository();
    // check user existance
    const userExist = await userRepository.exist({
      email: verifyAccountDto.email,
    });
    if (!userExist) {
      throw new NotFoundException("User not found");
    }
    // check otp
    if (verifyAccountDto.otp !== userExist.otp) {
      throw new BadRequestException("Invalid otp");
    }
    // check otpExpiryAt
    if ((userExist.otpExpiryAt as Date) < new Date()) {
      throw new BadRequestException("Otp expired");
    }
  }
}
