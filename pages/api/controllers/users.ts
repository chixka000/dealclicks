import { NextApiResponse } from "next";
import connectDatabase from "../database";
import User from "../models/user";
export async function store(response: NextApiResponse) {
  await connectDatabase();

  await User.create({
    firstName: "test",
    lastName: "test",
    email: "test@gmail.com",
    password: "asdasd",
  });

  return response.status(201).json({ message: "user created" });
}
