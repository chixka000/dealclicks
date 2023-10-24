import connectDatabase from "../database";
import { NextResponse } from "next/server";
import User from "../models/user";

export default async function handler(request, response) {
  // await connectDatabase();
  switch (request.method) {
    case "POST":
      await connectDatabase();

      await User.create({
        firstName: "test",
        lastName: "test",
        email: "test@gmail.com",
        password: "asdasd",
      });

      return NextResponse.json({ message: "user created" }, { status: 201 });
      break;

    default:
      break;
  }
}
