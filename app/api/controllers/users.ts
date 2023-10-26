import { NextApiResponse } from "next";
import connectDatabase from "../database";
import User from "../models/user";
import { sendErrorResponse } from "../exception/errorResponse";
import { getDataFromToken } from "@/app/helper/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
export async function store() {
  // await connectDatabase();

  // await User.create({
  //   firstName: "test",
  //   lastName: "test",
  //   email: "test@gmail.com",
  //   password: "asdasd",
  // });

  // return response.status(201).json({ message: "user created" });
  return { message: "Not yet implemented." };
}

export async function me(request: NextRequest) {
  try {
    const me = await getDataFromToken(request);

    const user = await User.findOne({ email: me.email! }).select("-password");

    return NextResponse.json({ user }, { status: 200 });
  } catch (error: any) {
    return sendErrorResponse(401, "You are not logged in.");
  }
}
