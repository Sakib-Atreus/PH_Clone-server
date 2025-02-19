import bcrypt from "bcrypt";
import { JwtPayload } from "jsonwebtoken";
import config from "../../config";
import authUtill from "./auth.utill";
import { UserModel } from "../user/user.model";
import idConverter from "../../util/idConvirter";



const logIn = async (email: string, password: string) => {
  const findUserWithEmail = await UserModel.findOne({ email: email }).select(
    "+password"
  );

  if (!findUserWithEmail) {
    throw Error("no user found with this email");
  }

  const match = await bcrypt.compare(password, findUserWithEmail.password);
  if (!match) {
    throw Error("password is not matched");
  }

  const findUserAndUpdate = await UserModel.findOneAndUpdate(
    { email: email },
    { isLoggedIn: true },
    { new: true }
  );

  if (!findUserWithEmail) {
    throw Error("no; user found with this email");
  }

  // Tokenize user data
  const tokenizeData = {
    id: findUserWithEmail._id.toHexString(),
    role: findUserWithEmail.role,
  };

  const approvalToken = authUtill.createToken(
    tokenizeData,
    config.jwt_token_secret,
    config.token_expairsIn
  );

  const refreshToken = authUtill.createToken(
    tokenizeData,
    config.jwt_refresh_Token_secret,
    config.rifresh_expairsIn
  );

  // console.log(approvalToken, refreshToken, findUserWithEmail)

  return { approvalToken, refreshToken, findUserAndUpdate };
};

const logOut = async (userId: string) => {
  
 const convertedId = idConverter(userId)

  const findUserById = await UserModel.findOneAndUpdate(
    { _id: convertedId },
    { isLoggedIn: false, loggedOutTime: new Date() },
    { new: true }
  );
  return findUserById;
};

const authSercvices = {
  logIn,
  logOut,
};
export default authSercvices;
