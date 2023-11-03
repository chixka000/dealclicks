import { NextRequest } from "next/server";
import { sendErrorResponse } from "../../shared/exception/errorResponse";

export async function create(request: NextRequest) {
  try {
    
  } catch (error: any) {
    // return error response
    return sendErrorResponse(500, {
      error:
        error?.message ?? error?.response?.message ?? "Something went wrong",
    });
  }
}
