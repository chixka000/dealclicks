import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import User from "../api/models/user";

export async function authorize(
  request: NextRequest,
  isAdmin: boolean = false
) {
  try {
    const token = request.cookies.get("token")?.value;

    if (!token) return null;

    const decoded: any = jwt.verify(token, process.env.APP_SECRET!);

    let baseQuery = User.where({ _id: decoded.id });

    if (isAdmin) baseQuery.where({ type: "admin" });

    const user = await baseQuery.findOne();

    if (!user) return null;

    return user;
  } catch (error: any) {
    throw new Error(error?.message ?? "Something went wrong");
  }
}
