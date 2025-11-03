import jwt, { JwtPayload, SignOptions } from "jsonwebtoken";
import { devConfig } from "../../config/dev.config";

export const generateToken = ({
  payload,
  secretKey = devConfig.JWT_SECRET as string,
  options,
}: {
  payload: object;
  secretKey?: string;
  options?: SignOptions;
}) => {
  return jwt.sign(payload, secretKey, options);
};

// verify token
export const verifyToken = ({
  token,
  secretKey = devConfig.JWT_SECRET as string,
}: {
  token: string;
  secretKey?: string;
}) => {
  // any payload from type JwtPayload can it have any key from type string and value from type any
  return jwt.verify(token, secretKey) as JwtPayload; // use JwtPayload after customise it becuse it have id and role of user
};
