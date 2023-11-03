import { NextRequest, NextResponse } from "next/server";
import { sendErrorResponse } from "../../shared/exception/errorResponse";
import { authorize } from "../../shared/utils/getDataFromToken";
import FileUploadService from "../../shared/services/FileUploadService";
import FileModel from "../models/file";

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

    // execute UploadImage handler of FileUploadService (to upload image in cloudinary)
    const file = await fileUploadService.UploadImage(clientFile, user);

    // return success response
    return NextResponse.json(
      { message: "Uploaded successfully.", file },
      { status: 200 }
    );
  } catch (error: any) {
    // return error response
    return sendErrorResponse(500, {
      error:
        error?.message ?? error?.response?.message ?? "Something went wrong",
    });
  }
}

export async function bulkUpload(request: NextRequest) {
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
    const clientFiles: File[] | null = formData.getAll(
      "files"
    ) as unknown as File[];

    // initialize FileUploadService
    const fileUploadService = new FileUploadService();

    // execute UploadImages handler of FileUploadService (to upload image in cloudinary)
    const files = await fileUploadService.UploadImages(clientFiles, user);

    // return success response
    return NextResponse.json(
      { message: "Uploaded successfully", files },
      { status: 200 }
    );
  } catch (error: any) {
    // return error response
    return sendErrorResponse(500, {
      error:
        error?.message ?? error?.response?.message ?? "Something went wrong",
    });
  }
}

export async function index(request: NextRequest) {
  try {
    // initial isAdmin to check the request is from admin endpoint or client endpoint
    const isAdmin =
      request.nextUrl.pathname === "/api/admin/files" ? true : false;

    // validate if there is a user logged in
    const user = await authorize(request, isAdmin);

    // if there is no user returned. return a 401 error response
    if (!user)
      return sendErrorResponse(401, {
        error: "You have no permission to execute this request.",
      });

    // get queryStrings to paginate
    const page = parseInt(request.nextUrl.searchParams.get("page") || "1");
    const limit = parseInt(request.nextUrl.searchParams.get("limit") || "10");

    // pagination operation
    const skip = (page - 1) * limit;

    let query = {};

    // filter query if the user is client, to only show the files of the logged in user
    if (!isAdmin) query = { uploadedBy: user._id };

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
    return sendErrorResponse(500, {
      error:
        error?.message ?? error?.response?.message ?? "Something went wrong",
    });
  }
}

export async function show(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // validate if there is a user logged in
    const user = await authorize(request);

    // if there is no user returned. return a 401 error response
    if (!user)
      return sendErrorResponse(401, {
        error: "You have no permission to execute this request.",
      });

    // get the route paramater id
    const { id } = params;

    // initial isAdmin to check the request is from admin endpoint or client endpoint
    const isAdmin =
      request.nextUrl.pathname === `/api/admin/files/${id}` ? true : false;

    let query = {};

    // filter query if the user is client, to only show the file of the logged in user
    if (!isAdmin) query = { uploadedBy: user._id };

    // execute query
    const file = await FileModel.findOne({
      _id: id,
      ...query,
    }).populateRelations(request);

    // return error response if there is no file found
    if (!file) return sendErrorResponse(404, "No file found.");

    // return success response
    return NextResponse.json(file, { status: 200 });
  } catch (error: any) {
    // return error response
    return sendErrorResponse(500, {
      error:
        error?.message ?? error?.response?.message ?? "Something went wrong",
    });
  }
}

export async function destroy(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // validate if there is a user logged in
    const user = await authorize(request);

    // if there is no user returned. return a 401 error response
    if (!user)
      return sendErrorResponse(401, {
        error: "You have no permission to execute this request.",
      });

    // get the route paramater id
    const { id } = params;

    // initial isAdmin to check the request is from admin endpoint or client endpoint
    const isAdmin =
      request.nextUrl.pathname === `/api/admin/files/${id}` ? true : false;

    let query = {};

    // filter query if the user is client, to only show the file of the logged in user
    if (!isAdmin) query = { uploadedBy: user._id };

    // fecth the file in the document
    const file = await FileModel.findOne({ _id: id, ...query });

    // return error response if there is no file found
    if (!file) return sendErrorResponse(404, "File not found.");

    // initialize FileUploadService
    const fileUploadService = new FileUploadService();

    // execute deleteImage method of fileUploadService
    await fileUploadService.deleteImage(file.publicId, user);

    // return success response
    return NextResponse.json({ message: "file deleted." });
  } catch (error: any) {
    // return error response
    return sendErrorResponse(500, {
      error:
        error?.message ?? error?.response?.message ?? "Something went wrong",
    });
  }
}
