import User from "../models/user";
import { NextResponse } from "next/server";
export async function store(request) {
  await connectDatabase();

  await User.create({
    firstName: "test",
    lastName: "test",
    email: "test@gmail.com",
    password: "asdasd",
  });

  return NextResponse.json({ message: "user created" }, { status: 201 });
}
