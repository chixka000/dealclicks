// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(
    { message: "Welcome to Deal Clicks API" },
    { status: 200 }
  );
}
