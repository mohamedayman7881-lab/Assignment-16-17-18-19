import { GENDER } from "../../utils/common/enum";

// DTO >> data to object
export interface RegisterUserDTO {
  // with DTO dont write I before interface name
  fullName?: string;
  email: string;
  password: string;
  phoneNumber?: string;
  gender: GENDER;
}

export interface VerifyAccountDTO {
  email: string;
  otp: string;
}

export interface LoginDTO {
  email: string;
  password: string;
}

export interface SendOtpDTO {
  email: string;
}

export interface ResetPasswordDTO {
  email: string;
  otp: string;
  password: string;
}

export interface UpdateEmailDTO {
  email: string;
  newEmail: string;
}
