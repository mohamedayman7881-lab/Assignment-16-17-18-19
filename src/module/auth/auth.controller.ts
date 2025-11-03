import { Router } from "express";
import authService from "./auth.service";
import * as authValidation from "./auth.validation";
import { isAuthenticated, isValid } from "../../middleware";
const router = Router();
router.post(
  "/register",
  isValid(authValidation.registerSchema),
  authService.register
);
router.post("/verify-account", authService.verifyAccount);
router.post("/login", isValid(authValidation.loginSchema), authService.login);
router.post("/send-otp", authService.sendOtp);
router.post("/reset-password", authService.resetPassword);
router.post("/update-email", isAuthenticated(), authService.updateEmail);
export default router;

/**
 * router{
 *   authService {
 *     userRepository = value
 *       register() {
 *              this.userRepository.exist()  // this work with firist scope  >> so use arow function
 *      }
 *    }
 * }
 */
