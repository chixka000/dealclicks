import { NextRequest, NextResponse } from "next/server";
import { sendErrorResponse } from "../../shared/exception/errorResponse";
import { authorize } from "../../shared/utils/getDataFromToken";
import { categoryValidator } from "../validator/categoryValidator";
import Category from "../models/category";
import { ObjectId } from "mongoose";
import { validate } from "../../shared/validator";
import { ICategory } from "../interfaces";

export async function store(request: NextRequest) {
  try {
    // validate request body
    const { errors, data, user } = await validate(request, categoryValidator);

    // check if there is errors in the validate response
    if (errors.length) return sendErrorResponse(422, errors);

    //construct payload
    const categoryPayload: ICategory = {
      name: data.name,
      store: data.storeId,
      createdBy: user!._id!,
    };

    if (data.parent) categoryPayload.parent = data.parent;

    // create document in the collection
    const category = await Category.create(categoryPayload);

    // update subCategories of parent
    if (data.parent) {
      const parentCategory = await Category.findOne({ _id: data.parent });

      if (!parentCategory)
        return sendErrorResponse(404, { errors: "Parent category not found" });

      if (parentCategory?.subCategories)
        parentCategory.subCategories.push(data.parent);
      else parentCategory.subCategories = [data.parent];

      await parentCategory?.save();
    }

    // return success response
    return NextResponse.json(
      { message: "Created Successfully", category },
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

export async function index(
  request: NextRequest,
  { params }: { params: { storeId: string } }
) {
  try {
    // validate if there is a user logged in
    const user = await authorize(request);

    // if there is no user returned. return a 401 error response
    if (!user)
      return sendErrorResponse(401, {
        error: "You have no permission to execute this request.",
      });

    // execute query
    const categories = await Category.find({
      store: params.storeId,
      createdBy: user._id,
      deleted: false,
    })
      .select("-deleted")
      .populateRelations(request);

    // return success response
    return NextResponse.json({ data: categories }, { status: 200 });
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
  { params }: { params: { storeId: string; categoryId: string } }
) {
  try {
    // validate if there is a user logged in
    const user = await authorize(request);

    // if there is no user returned. return a 401 error response
    if (!user)
      return sendErrorResponse(401, {
        error: "You have no permission to execute this request.",
      });

    // execute query
    const category = await Category.findOne({
      _id: params.categoryId,
      store: params.storeId,
      deleted: false,
    })
      .select("-deleted")
      .populateRelations(request);

    // return error response if no category was found
    if (!category)
      return sendErrorResponse(404, { error: "Category not found." });

    // return success response
    return NextResponse.json(category, { status: 200 });
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
  { params }: { params: { storeId: string; categoryId: string } }
) {
  try {
    // validate request body
    const { errors, data, user } = await validate(request, categoryValidator, {
      id: params.categoryId,
    });

    // check if there is errors in the validate response
    if (errors.length) return sendErrorResponse(422, errors);

    const { storeId, categoryId } = params;
    // initial isAdmin to check the request is from admin endpoint or client endpoint
    const isAdmin =
      request.nextUrl.pathname ===
      `/api/admin/category/${storeId}/${categoryId}`
        ? true
        : false;

    let query: { _id: string; deleted: boolean; createdBy?: ObjectId } = {
      _id: params.categoryId,
      deleted: false,
    };

    // add query for createdBy if the request is not in admin endpoint
    if (!isAdmin) query = { ...query, createdBy: user!._id };

    // execute query
    const category = await Category.findOne(query).select("-deleted");

    // return 404 error response if there is no store found the query above
    if (!category)
      return sendErrorResponse(404, {
        error: "Category not found.",
      });

    // assign the new value for the Category model properties
    category.name = data.name;
    category.store = data.storeId;

    // save the new data in the collection
    await category.save();

    // return success response
    return NextResponse.json(
      { message: "Updated Successfully", category },
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

export async function destroy(
  request: NextRequest,
  { params }: { params: { storeId: string; categoryId: string } }
) {
  try {
    // validate if there is a user logged in
    const user = await authorize(request);

    // if there is no user returned. return a 401 error response
    if (!user)
      return sendErrorResponse(401, {
        error: "You have no permission to execute this request.",
      });

    // execute query
    const category = await Category.findOne({
      _id: params.categoryId,
      store: params.storeId,
      deleted: false,
    });

    // return error response if no category was found
    if (!category)
      return sendErrorResponse(404, { error: "Category not found." });

    // soft delete category
    category.deleted = true;

    await category.save();
    // return success response
    return NextResponse.json({ message: "Category deleted" }, { status: 200 });
  } catch (error: any) {
    // return error response
    return sendErrorResponse(500, {
      error:
        error?.message ?? error?.response?.message ?? "Something went wrong",
    });
  }
}
