import { NextResponse } from "next/server";
import { sendErrorResponse } from "@/app/backend/shared/exception/errorResponse";
import { categoryValidator } from "@/app/backend/category/validator/categoryValidator";
import Category from "@/app/backend/category/models/category";
import { ObjectId } from "mongoose";
import { validate } from "@/app/backend/shared/validator";
import { ICategory } from "@/app/backend/category/interfaces";

export async function store(request: NextRequest) {
  try {
    // validate request body
    const data = await validate(request, categoryValidator);

    //construct payload
    const categoryPayload: ICategory = {
      name: data.name,
      store: data.storeId,
      createdBy: request.user!._id!,
    };

    if (data.parent) categoryPayload.parent = data.parent;

    // create document in the collection
    const category = await Category.create(categoryPayload);

    // update subCategories of parent
    if (data.parent) {
      const parentCategory = await Category.findOne({ _id: data.parent });

      if (!parentCategory)
        return sendErrorResponse({
          code: 404,
          message: "Parent category not found",
        });

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
    return sendErrorResponse(error);
  }
}

export async function index(
  request: NextRequest,
  { params }: { params: { storeId: string } }
) {
  try {
    // execute query
    const categories = await Category.find({
      store: params.storeId,
      createdBy: request.user._id,
      deleted: false,
    })
      .select("-deleted")
      .populateRelations(request);

    // return success response
    return NextResponse.json({ data: categories }, { status: 200 });
  } catch (error: any) {
    // return error response
    return sendErrorResponse(error);
  }
}

export async function show(
  request: NextRequest,
  { params }: { params: { storeId: string; categoryId: string } }
) {
  try {
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
      return sendErrorResponse({ code: 404, message: "Category not found." });

    // return success response
    return NextResponse.json(category, { status: 200 });
  } catch (error: any) {
    // return error response
    return sendErrorResponse(error);
  }
}

export async function update(
  request: NextRequest,
  { params }: { params: { storeId: string; categoryId: string } }
) {
  try {
    // validate request body
    const data = await validate(request, categoryValidator, {
      id: params.categoryId,
    });

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
    if (!isAdmin) query = { ...query, createdBy: request.user._id };

    // execute query
    const category = await Category.findOne(query).select("-deleted");

    // return 404 error response if there is no store found the query above
    if (!category)
      return sendErrorResponse({ code: 404, message: "Category not found." });

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
    return sendErrorResponse(error);
  }
}

export async function destroy(
  request: NextRequest,
  { params }: { params: { storeId: string; categoryId: string } }
) {
  try {
    // execute query
    const category = await Category.findOne({
      _id: params.categoryId,
      store: params.storeId,
      deleted: false,
    });

    // return error response if no category was found
    if (!category)
      return sendErrorResponse({ code: 404, message: "Category not found." });

    // soft delete category
    category.deleted = true;

    await category.save();
    // return success response
    return NextResponse.json({ message: "Category deleted" }, { status: 200 });
  } catch (error: any) {
    // return error response
    return sendErrorResponse(error);
  }
}
