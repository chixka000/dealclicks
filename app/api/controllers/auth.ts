import { NextRequest, NextResponse } from "next/server";
import { authValidator } from "../validator/authValidator";
import { validate } from "../validator/validate";
import { sendErrorResponse } from "../exception/errorResponse";
import User from "../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function login(request: NextRequest) {
  try {
    // validate body
    const { errors, data } = await validate(request, authValidator);

    if (errors) return sendErrorResponse(422, errors);

    // find user in database and throw error if not exist
    const user = await User.findOne({ email: data.email }).select("+password");

    // check if user exist or compare inputed password

    if (!user) return sendErrorResponse(401, "Invalid Credentials.");

    const isSame = await bcrypt.compare(data.password, user.password);

    if (!isSame) return sendErrorResponse(401, "Invalid Credentials.");

    const jwtObject = {
      id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      verified: user.verified,
      type: user.type,
    };

    // generate token

    const token = jwt.sign(jwtObject, process.env.APP_SECRET!);

    let jwtCookie = `JWT=${token};`;

    if (data.remember) jwtCookie = `${jwtCookie} Max-Age=2592000000`;

    // return token
    const response = NextResponse.json(
      { message: "Logged in successfully" },
      { status: 200 }
    );

    response.cookies.set("token", token, { httpOnly: true });

    return response;
  } catch (error: any) {
    return sendErrorResponse(500, {
      error:
        error?.message ?? error?.response?.message ?? "Something went wrong",
    });
  }
}
