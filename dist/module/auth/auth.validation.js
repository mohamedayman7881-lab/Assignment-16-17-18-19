"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.registerSchema = void 0;
// npm ci >> install all dependencies
const zod_1 = require("zod");
const utils_1 = require("../../utils");
// in zod all fialds are optional by default >> so use .required() to make it required
// create register validation schema
exports.registerSchema = zod_1.z.object({
    // must make registerSchema genaric on RegisterUserDTO
    // z.string() >> return ZodString >> and RegisterUserDTO wait string so use as unknown as string
    fullName: zod_1.z.string().min(2).max(20),
    email: zod_1.z.email(),
    password: zod_1.z.string(),
    phoneNumber: zod_1.z.string().optional(),
    gender: zod_1.z.enum(utils_1.GENDER),
});
// create login validation schema
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.email(),
    password: zod_1.z.string(),
});
