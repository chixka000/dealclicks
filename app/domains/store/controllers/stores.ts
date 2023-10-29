import { NextRequest, NextResponse } from "next/server";
import { sendErrorResponse } from "../../shared/exception/errorResponse";
import { validate } from "../../shared/validator/validate";
import { storeValidator } from "../validator/storeValidator";
import StoreService from "../services/storeService";
import Store from "../models/store";
import { authorize } from "@/app/domains/shared/utils/getDataFromToken";
import { slugify } from "@/app/helper/formatter";

export async function create(request: NextRequest) {
  try {
    // validate request body
    const { errors, data } = await validate(request, storeValidator);

    // check if there is errors in the validate response
    if (errors) return sendErrorResponse(422, errors);

    // initialize StoreService
    const storeService = new StoreService();

    // call createStore method of StoreService to create document in the Store collection
    const store = await storeService.createStore(data, request);

    // return success response
    return NextResponse.json(
      { message: "Created successfully", store },
      { status: 201 }
    );
  } catch (error: any) {
    // return error response
    return sendErrorResponse(500, {
      error:
        error?.message ?? error?.response?.message ?? "Something went wrong",
    });
  }
}

export async function update(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // validate request body
    const { errors, data, user } = await validate(
      request,
      storeValidator,
      params
    );

    // check if there is errors in the validate response
    if (errors) return sendErrorResponse(422, errors);

    // get store with _id equal to params.id and owner equal to the user._id (logged in user)
    const store = await Store.findOne({ _id: params.id, owner: user!._id });

    // return 404 error response if there is no store found the query above
    if (!store)
      return sendErrorResponse(404, {
        error: "Store not found.",
      });

    // assign the new value for the Store model properties
    store.storeName = data.storeName;
    store.description = data.description ?? store.description;
    store.storeSlug = slugify(data.storeName);

    // save the new data in the collection
    await store.save();

    // return success response
    return NextResponse.json(
      { message: "Updated successfully", store },
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
      request.nextUrl.pathname === "/api/admin/stores" ? true : false;

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

    // filter query if the user is client, to only show the stores of the logged in user
    if (!isAdmin) query = { owner: user._id };

    const stores = await Store.find(query).skip(skip).limit(limit);

    // get total count and totalpages of the stores for pagination information
    const total = await Store.countDocuments(query);
    const totalPages = Math.ceil(total / limit);

    // return success response
    return NextResponse.json(
      {
        data: stores,
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
    // get the route paramater id
    const { id } = params;

    // validate if there is a user logged in
    const user = await authorize(request);

    // if there is no user returned. return a 401 error response
    if (!user)
      return sendErrorResponse(401, {
        error: "You have no permission to execute this request.",
      });

    // get the store with _id equal to the route parameter id and the owner is equal to user._id(id of the logged in user)
    const store = await Store.findOne({ _id: id, owner: user._id });

    // return 404 error response if there is no document found in the collection
    if (!store)
      return sendErrorResponse(404, {
        error: "Store not found",
      });

    // return success response
    return NextResponse.json(store, { status: 200 });
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
    // get the route paramater id
    const { id } = params;

    // initial StoreService
    const storeService = new StoreService();

    // call StoreService's deleteStore method to deleted the document in the collection
    await storeService.deleteStore(id, request);

    // return success response
    return NextResponse.json(
      { message: "Deleted successfully" },
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
