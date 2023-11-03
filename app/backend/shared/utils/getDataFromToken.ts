import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import User from "../../user/models/user";

export async function authorize(
  request: NextRequest,
  isAdmin: boolean = false
) {
  try {
    // get token from cookie
    const token = request.cookies.get("token")?.value;

    // return nothing if there is no cookie
    if (!token) return null;

    // decode the cookie
    const decoded: any = jwt.verify(token, process.env.APP_SECRET!);

    // query user
    let baseQuery = User.where({ _id: decoded.id });

    // add where type: "admin" in the query if the isAdmin args is true
    if (isAdmin) baseQuery.where({ type: "admin" });

    // execute the query
    const user = await baseQuery.findOne();

    // return nothing if there is no user found
    if (!user) return null;

    // return the user
    return user;
  } catch (error: any) {
    // throw error
    throw new Error(error?.message ?? "Something went wrong");
  }
}
