import { UserRepository } from "../DB";
import { NotFoundException, verifyToken } from "../utils";

// create auth middleware to check authentication before some of service
export const isAuthenticatedGraphql = async (context: any) => {
  // get token from req
  const token = context.token;
  // check on token
  const payload = verifyToken({ token }); // payload distruct id and role from token
  // check user existance
  const userRepository = new UserRepository();
  const userExist = await userRepository.exist(
    { _id: payload.id },
    {},
    { populate: [{ path: "friends", select: "fullName firstName lastName" }] }
  );
  if (!userExist) {
    throw new NotFoundException("User not found");
  }
  // check token blocked
  // chek logout from all devices (credential ubdatedAt)
  // pass informations of user to context obj
  context.user = userExist;
};
