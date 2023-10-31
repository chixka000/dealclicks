import { NextRequest, NextResponse } from "next/server";

export async function upload(request: NextRequest) {
  const formData = await request.formData();

  console.log(formData.get("file"));

  return NextResponse.json({ message: "test" });
}
