import { getTokenFromHeader } from "../utils/get_JWT_TokenFromHeader.js";
import { verifyToken } from "../utils/verify_JWT_Token.js";

export const authMiddleware = (req, res, next) => {
  //get token from header
  const token = getTokenFromHeader(req);
  //verify the token
  const decodedUser = verifyToken(token);
  if (!decodedUser) {
    throw new Error("Invalid/Expired token, please login again", 401);
  } else {
    //save the user into req obj
    req.userAuthId = decodedUser?.payload;
    next();
  }
};