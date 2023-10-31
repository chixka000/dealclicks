import { NextRequest, NextResponse } from "next/server";
import { authValidator } from "../validator/authValidator";
import { validate } from "../../shared/validator/validate";
import { sendErrorResponse } from "../../shared/exception/errorResponse";
import User from "../../user/models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { authorize } from "../../shared/utils/getDataFromToken";

export async function login(request: NextRequest) {
  try {
    // validate body
    const { errors, data } = await validate(request, authValidator);

    // return 422 error response if there is error in validation
    if (errors) return sendErrorResponse(422, errors);

    // find user in collection with email equal to data.email(email sent by the client)
    const user = await User.findOne({ email: data.email }).select("+password");

    // return 401 error response if there is no user found in the collection
    if (!user) return sendErrorResponse(401, "Invalid Credentials.");

    // compare the user inputed password to the password in the collection
    const isSame = await bcrypt.compare(data.password, user.password);

    // return 401 error response if the two password did not match
    if (!isSame) return sendErrorResponse(401, "Invalid Credentials.");

    // construct JWT object to store in the JWT token
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

    // set expiration if the user chose to remember there account
    if (data.remember) jwtCookie = `${jwtCookie} Max-Age=2592000000`;

    // prepare response json
    const response = NextResponse.json(
      { message: "Logged in successfully" },
      { status: 200 }
    );

    // add token to cookies of the response
    response.cookies.set("token", token, { httpOnly: true });

    // return the response
    return response;
  } catch (error: any) {
    // return error response
    return sendErrorResponse(500, {
      error:
        error?.message ?? error?.response?.message ?? "Something went wrong",
    });
  }
}

export async function me(request: NextRequest) {
  try {
    // validate if the user is logged in
    const me = await authorize(request);

    // get the users information
    const user = await User.findOne({ email: me.email! })
      .populate("stores")
      .select("-password");

    // return success response
    return NextResponse.json({ user }, { status: 200 });
  } catch (error: any) {
    // return error response
    return sendErrorResponse(401, "You are not logged in.");
  }
}
