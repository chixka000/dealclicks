import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.headers;

  console.log(token);

  return NextResponse.next();
}

export const config = {
  matcher: ["/api/users/login"],
};
