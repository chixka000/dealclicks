import { NextResponse } from "next/server";
import { sendErrorResponse } from "../../shared/exception/errorResponse";
import { storeValidator } from "../validator/storeValidator";
import StoreService from "../services/storeService";
import Store from "../models/store";
import { slugify } from "@/app/helper/formatter";
import { validate } from "../../shared/validator";
// import { INextRequest } from "../../shared/interfaces/request";

export async function create(request: NextRequest) {
  try {
    // validate request body
    const data = await validate(request, storeValidator);

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
    return sendErrorResponse(error);
  }
}

export async function update(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // validate request body
    const data = await validate(request, storeValidator, params);

    // get store with _id equal to params.id and owner equal to the user._id (logged in user)
    const store = await Store.findOne({
      _id: params.id,
      owner: request.user._id,
    });

    // return 404 error response if there is no store found the query above
    if (!store)
      return sendErrorResponse({ code: 404, message: "Store not found." });

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
    return sendErrorResponse(error);
  }
}

export async function index(request: NextRequest) {
  try {
    // initial isAdmin to check the request is from admin endpoint or client endpoint
    const isAdmin =
      request.nextUrl.pathname === "/api/admin/stores" ? true : false;

    let query = {};

    // filter query if the user is client, to only show the stores of the logged in user
    if (!isAdmin) query = { owner: request.user._id };

    // get queryStrings to paginate
    const page = parseInt(request.nextUrl.searchParams.get("page") || "1");
    const limit = parseInt(request.nextUrl.searchParams.get("limit") || "10");

    const stores = await Store.find(query).paginate(page, limit);

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

    // get the store with _id equal to the route parameter id and the owner is equal to user._id(id of the logged in user)
    const store = await Store.findOne({ _id: id, owner: request.user._id });

    // return 404 error response if there is no document found in the collection
    if (!store)
      return sendErrorResponse({ code: 404, message: "Store not found" });

    // return success response
    return NextResponse.json(store, { status: 200 });
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
    return sendErrorResponse(error);
  }
}
