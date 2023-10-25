
import { NextApiRequest, NextApiResponse } from "next";
import connectDatabase from "../database";
import User from "../models/user";

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
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

      return response.status(201).json({ message: "user created" });
      break;

    default:
      break;
  }
}
