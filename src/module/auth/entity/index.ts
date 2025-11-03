import { GENDER, SYS_ROLE, USER_AGENT } from "../../../utils/common/enum";

// create class for entity to compare and validatd data from front end
export class User {
  public firstName!: string;
  public lastName!: string;
  public fullName!: string;
  public email!: string;
  public password!: string;
  public credentialUpdatedAt!: Date;
  public phoneNumber!: string;
  public role!: SYS_ROLE;
  public gender!: GENDER;
  public agent!: USER_AGENT;
  public otp!: string;
  public otpExpiryAt!: Date;
  public isVerified!: boolean;
}
