import { NextResponse } from "next/server";
import { sendErrorResponse } from "@/app/backend/shared/exception/errorResponse";
import FileUploadService from "@/app/backend/shared/services/FileUploadService";
import FileModel from "@/app/backend/file/models/file";

export async function upload(request: NextRequest) {
  try {
    // get formData
    const formData = await request.formData();

    // get the file from formData
    const clientFile: File | null = formData.get("file") as unknown as File;

    // return if there is no file in formdata
    if (!clientFile)
      return sendErrorResponse({ code: 422, message: "File is required." });

    // initialize FileUploadService
    const fileUploadService = new FileUploadService();

    // execute UploadImage handler of FileUploadService (to upload image in cloudinary)
    const file = await fileUploadService.UploadImage(clientFile, request.user);

    // return success response
    return NextResponse.json(
      { message: "Uploaded successfully.", file },
      { status: 200 }
    );
  } catch (error: any) {
    // return error response
    return sendErrorResponse(error);
  }
}

export async function bulkUpload(request: NextRequest) {
  try {
    // get formData
    const formData = await request.formData();

    // get the file from formData
    const clientFiles: File[] | null = formData.getAll(
      "files"
    ) as unknown as File[];

    // initialize FileUploadService
    const fileUploadService = new FileUploadService();

    // execute UploadImages handler of FileUploadService (to upload image in cloudinary)
    const files = await fileUploadService.UploadImages(
      clientFiles,
      request.user
    );

    // return success response
    return NextResponse.json(
      { message: "Uploaded successfully", files },
      { status: 200 }
    );
  } catch (error: any) {
    // return error response
    return sendErrorResponse(error);
  }
}

export async function index(request: NextRequest) {
  try {
    // initial isAdmin to check the request is from admin endpoint or client endpoint
    const isAdmin =
      request.nextUrl.pathname === "/api/admin/files" ? true : false;

    // get queryStrings to paginate
    const page = parseInt(request.nextUrl.searchParams.get("page") || "1");
    const limit = parseInt(request.nextUrl.searchParams.get("limit") || "10");

    // pagination operation
    const skip = (page - 1) * limit;

    let query = {};

    // filter query if the user is client, to only show the files of the logged in user
    if (!isAdmin) query = { uploadedBy: request.user._id };

    // execute query
    const files = await FileModel.find(query)
      .populateRelations(request)
      .skip(skip)
      .limit(limit);

    // get total count and totalpages of the files for pagination information
    const total = await FileModel.countDocuments(query);
    const totalPages = Math.ceil(total / limit);

    // return success response
    return NextResponse.json(
      {
        data: files,
        meta: { total, totalPages, page, limit },
      },
      { status: 200 }
    );
  } catch (error: any) {
    // return error response
    return sendErrorResponse(error);
  }
}

export async function show(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // get the route paramater id
    const { id } = params;

    // initial isAdmin to check the request is from admin endpoint or client endpoint
    const isAdmin =
      request.nextUrl.pathname === `/api/admin/files/${id}` ? true : false;

    let query = {};

    // filter query if the user is client, to only show the file of the logged in user
    if (!isAdmin) query = { uploadedBy: request.user._id };

    // execute query
    const file = await FileModel.findOne({
      _id: id,
      ...query,
    }).populateRelations(request);

    // return error response if there is no file found
    if (!file)
      return sendErrorResponse({ code: 404, message: "No file found." });

    // return success response
    return NextResponse.json(file, { status: 200 });
  } catch (error: any) {
    // return error response
    return sendErrorResponse(error);
  }
}

export async function destroy(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // get the route paramater id
    const { id } = params;

    // initial isAdmin to check the request is from admin endpoint or client endpoint
    const isAdmin =
      request.nextUrl.pathname === `/api/admin/files/${id}` ? true : false;

    let query = {};

    // filter query if the user is client, to only show the file of the logged in user
    if (!isAdmin) query = { uploadedBy: request.user._id };

    // fecth the file in the document
    const file = await FileModel.findOne({ _id: id, ...query });

    // return error response if there is no file found
    if (!file)
      return sendErrorResponse({ code: 404, message: "File not found." });

    // initialize FileUploadService
    const fileUploadService = new FileUploadService();

    // execute deleteImage method of fileUploadService
    await fileUploadService.deleteImage(file.publicId, request.user);

    // return success response
    return NextResponse.json({ message: "file deleted." });
  } catch (error: any) {
    // return error response
    return sendErrorResponse(error);
  }
}
