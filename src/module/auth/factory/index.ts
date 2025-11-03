import { SYS_ROLE, USER_AGENT } from "../../../utils/common/enum";
import { generateHash } from "../../../utils/hash";
import { generateExpiryDate, generateOTP } from "../../../utils/otp";
import { RegisterUserDTO } from "../auth.dto";
import { User } from "../entity";

// create auth factory class to validate data and compare with class entity (factory design pattern)
export class AuthFactoryService {
  async register(registerUserDTO: RegisterUserDTO) {
    // send data came from front end to validate it
    const user = new User(); // take new instance from class user entity to compare with data came from front end
    user.fullName = registerUserDTO.fullName as string; // fullName in registerUserDTO is optional so we use as string to convert it to string
    user.email = registerUserDTO.email;
    user.password = await generateHash(registerUserDTO.password);
    user.phoneNumber = registerUserDTO.phoneNumber as string; // encrypt phoneNumber  // phoneNumber in registerUserDTO is optional so we use as string to convert it to string
    user.role = SYS_ROLE.user; // give to him defult user with register
    user.gender = registerUserDTO.gender;
    user.agent = USER_AGENT.local; // give to him defult local with register
    user.otp = generateOTP();
    user.otpExpiryAt = generateExpiryDate(
      5 * 60 * 60 * 1000
    ) as unknown as Date;
    user.credentialUpdatedAt = Date.now() as unknown as Date;
    user.isVerified = false;
    return user;
  }
}
