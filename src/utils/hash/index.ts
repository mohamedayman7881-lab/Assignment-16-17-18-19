import bcrypt from "bcryptjs";

// use hash not hashSync becuse hashSync run in main thread and if tow user make register one wait one
export const generateHash = async (plainText: string) => {
  return await bcrypt.hash(plainText, 10);
};

export const compareHash = async (password: string, hashPassword: string) => {
  return await bcrypt.compare(password, hashPassword);
};
