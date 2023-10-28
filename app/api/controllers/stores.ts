import { NextRequest, NextResponse } from "next/server";
import { sendErrorResponse } from "../exception/errorResponse";
import { validate } from "../validator/validate";
import { storeValidator } from "../validator/storeValidator";
import StoreService from "../services/storeService";
import Store from "../models/store";
import { authorize } from "@/app/helper/getDataFromToken";

export async function create(request: NextRequest) {
  try {
    const { errors, data } = await validate(request, storeValidator);

    if (errors) return sendErrorResponse(422, errors);

    const storeService = new StoreService();

    const store = await storeService.createStore(data, request);

    return NextResponse.json(
      { message: "Created successfully", store },
      { status: 201 }
    );
  } catch (error: any) {
    return sendErrorResponse(500, {
      error:
        error?.message ?? error?.response?.message ?? "Something went wrong",
    });
  }
}

export async function update(request: NextRequest) {
  try {
    const { errors, data } = await validate(request, storeValidator);

    if (errors) return sendErrorResponse(422, errors);
  } catch (error: any) {
    return sendErrorResponse(500, {
      error:
        error?.message ?? error?.response?.message ?? "Something went wrong",
    });
  }
}

export async function index(request: NextRequest) {
  try {
    const isAdmin =
      request.nextUrl.pathname === "/api/admin/stores" ? true : false;
    const user = await authorize(request, isAdmin);

    console.log(request.nextUrl.pathname);

    if (!user)
      return sendErrorResponse(401, {
        error: "You have no permission to execute this request.",
      });

    const page = parseInt(request.nextUrl.searchParams.get("page") || "1");
    const limit = parseInt(request.nextUrl.searchParams.get("limit") || "10");

    const skip = (page - 1) * limit;

    let query = {};

    if (!isAdmin) query = { owner: user._id };

    const stores = await Store.find(query).skip(skip).limit(limit);

    const total = await Store.countDocuments(query);
    const totalPages = Math.ceil(total / limit);
    return NextResponse.json(
      {
        data: stores,
        meta: { total, totalPages, page },
      },
      { status: 200 }
    );
  } catch (error: any) {
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
    const { id } = params;
    const user = await authorize(request);

    if (!user)
      return sendErrorResponse(401, {
        error: "You have no permission to execute this request.",
      });

    const store = await Store.findOne({ _id: id, owner: user._id });

    if (!store)
      return sendErrorResponse(404, {
        error: "Store not found",
      });

    return NextResponse.json(store, { status: 200 });
  } catch (error: any) {
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
    const { id } = params;
    const user = await authorize(request);

    if (!user)
      return sendErrorResponse(401, {
        error: "You have no permission to execute this request.",
      });

    const store = await Store.findOne({ _id: id, owner: user._id });

    if (!store)
      return sendErrorResponse(404, {
        error: "Store not found",
      });

    await Store.deleteOne({ _id: store._id });

    return NextResponse.json(
      { message: "Deleted successfully" },
      { status: 200 }
    );
  } catch (error: any) {
    return sendErrorResponse(500, {
      error:
        error?.message ?? error?.response?.message ?? "Something went wrong",
    });
  }
}
