import jwt from "jsonwebtoken";

const generateToken = (payload) => {
  return jwt.sign({ payload }, process.env.JWT_KEY, { expiresIn: '1d' });
};

export default generateToken;