import { NextRequest, NextResponse } from "next/server";
import { sendErrorResponse } from "../../shared/exception/errorResponse";
import { authorize } from "../../shared/utils/getDataFromToken";
import FileUploadService from "../../shared/services/FileUploadService";

export async function upload(request: NextRequest) {
  try {
    // validate if there is a user logged in
    const user = await authorize(request);

    // if there is no user returned. return a 401 error response
    if (!user)
      return sendErrorResponse(401, {
        error: "You have no permission to execute this request.",
      });

    // get formData
    const formData = await request.formData();

    // get the file from formData
    const clientFile: File | null = formData.get("file") as unknown as File;

    // return if there is no file in formdata
    if (!clientFile) return sendErrorResponse(422, "File is required.");

    // initialize FileUploadService
    const fileUploadService = new FileUploadService();

    // execute uploadFile handler of FileUploadService (to upload image in cloudinary)
    const file = await fileUploadService.UploadFile(clientFile, user);

    // return success response
    return NextResponse.json({ message: "Uploaded successfully.", file });
  } catch (error: any) {
    // return error response
    return sendErrorResponse(500, {
      error:
        error?.message ?? error?.response?.message ?? "Something went wrong",
    });
  }
}
