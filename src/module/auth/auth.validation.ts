// npm ci >> install all dependencies
import { z } from "zod";
import { GENDER } from "../../utils";
import { LoginDTO, RegisterUserDTO } from "./auth.dto";

// in zod all fialds are optional by default >> so use .required() to make it required

// create register validation schema
export const registerSchema = z.object<RegisterUserDTO>({
  // must make registerSchema genaric on RegisterUserDTO
  // z.string() >> return ZodString >> and RegisterUserDTO wait string so use as unknown as string
  fullName: z.string().min(2).max(20) as unknown as string,
  email: z.email() as unknown as string,
  password: z.string() as unknown as string,
  phoneNumber: z.string().optional() as unknown as string,
  gender: z.enum(GENDER) as unknown as GENDER,
});

// create login validation schema
export const loginSchema = z.object<LoginDTO>({
  email: z.email() as unknown as string,
  password: z.string() as unknown as string,
});
