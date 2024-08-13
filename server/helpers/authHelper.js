import bcrypt from "bcrypt";
import crypto from "crypto";

export const hashPassword = async (password) => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    console.log(error);
  }
};

export const comparePassword = async (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};
 
// for Forgot Password
export const generateResetToken = () => {
  return crypto.randomBytes(20).toString("hex");
};