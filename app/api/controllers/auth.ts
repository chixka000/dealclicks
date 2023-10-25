import { NextRequest, NextResponse } from "next/server";
import { authValidator } from "../validator/authValidator";
import { validate } from "../validator/validate";
import { sendErrorResponse } from "../exception/errorResponse";

export async function login(request: NextRequest) {
  try {
    // validate body
    const { errors, data } = await validate(request, authValidator);

    if (errors) return sendErrorResponse(422, errors);

    // find user in database and throw error if not exist

    // compare password and throw error if not the same

    // generate token

    // return token

    return NextResponse.json({ data });
  } catch (error: any) {
    return sendErrorResponse(500, {
      error:
        error?.message ?? error?.response?.message ?? "Something went wrong",
    });
  }
}
