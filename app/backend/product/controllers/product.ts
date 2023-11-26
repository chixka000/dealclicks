import { NextResponse } from "next/server";
import { sendErrorResponse } from "../../shared/exception/errorResponse";
import { validate } from "../../shared/validator";
import { productValidator } from "../validator/productValidator";
import Product from "../models/product";
import { VARIANTSERVICE } from "../services";
import mongoose from "mongoose";
import MetaService from "../../shared/services/MetaService";
import { METASERVICE } from "../../shared/services";

export async function create(request: NextRequest) {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    // validate request body
    const data = await validate(request, productValidator);

    // construct payload
    const productPayload = {
      name: data.name,
      price: data.price,
      description: data.description,
      store: data.storeId,
      category: data.categoryId,
      owner: request.user._id,
      isFeatured: data?.isFeatured,
      isSpecialOffer: data?.isSpecialOffer,
    };

    // create the product instance
    const product = new Product(productPayload);

    // Save the product within the transaction
    await product.save({ session });

    // run the variant creation service
    const result = await VARIANTSERVICE.createMany(
      product,
      data.variants,
      session
    );

    // Commit the transaction if both product and variants are created successfully
    await session.commitTransaction();

    // return success response
    return NextResponse.json(
      { message: "Created Successfully", product: result },
      { status: 201 }
    );
  } catch (error: any) {
    // abort transaction
    await session.abortTransaction();

    // return error response
    return sendErrorResponse(error);
  }
}

export async function update(
  request: NextRequest,
  {
    params,
  }: {
    params: { storeId: string; productId: string };
  }
) {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { storeId, productId } = params;
    // validate request body
    const data = await validate(request, productValidator);

    // find the product to be updated
    const product = await Product.findOne({
      _id: productId,
      store: storeId,
      owner: request.user._id,
    });

    // return error response if product is not found
    if (!product)
      return sendErrorResponse({ code: 404, message: "Product not found" });

    // assign new value for product fields
    product.name = data.name;
    product.store = data.storeId;
    product.category = data.categoryId;
    if (data.description) product.description = data.description;
    if (typeof data.isFeatured === "boolean")
      product.isFeatured = data.isFeatured;
    if (typeof data.isSpecialOffer === "boolean")
      product.isSpecialOffer = data.isSpecialOffer;

    // save the updated product
    await product.save({ session });

    // update product variants
    const result = await VARIANTSERVICE.createAndUpdateMany(
      product,
      data.variants,
      session
    );

    // Commit the transaction if both product and variants are created successfully
    await session.commitTransaction();

    // return success response
    return NextResponse.json(
      { message: "Updated Successfully", product: result },
      { status: 201 }
    );
  } catch (error: any) {
    // return error response
    await session.abortTransaction();
    return sendErrorResponse(error);
  }
}

export async function index(
  request: NextRequest,
  { params }: { params: { storeId: string } }
) {
  try {
    // get queryStrings to paginate
    const cursor = request.nextUrl.searchParams.get("cursor") ?? null;
    const limit = parseInt(request.nextUrl.searchParams.get("limit") || "10");

    // filters
    const filters = {
      store: params.storeId,
      owner: request.user._id,
    };
    // execute query
    const products = await Product.find(filters)
      .populateRelations(request)
      .paginate(cursor, limit);

    // get meta
    const meta = await METASERVICE.getMeta(
      Product,
      products,
      filters,
      limit
    );

    // const total = await Product.countDocuments(filters);
    // const totalPages = Math.ceil(total / limit);

    // return success response
    return NextResponse.json(
      {
        data: products,
        meta,
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
  { params }: { params: { storeId: string; productId: string } }
) {
  try {
    const { storeId, productId } = params;

    // execute query
    const product = await Product.findOne({
      _id: productId,
      store: storeId,
      owner: request.user._id,
    }).populateRelations(request);

    // return error response if no product found
    if (!product)
      return sendErrorResponse({ code: 404, message: "Product not found." });

    // return success reponse
    return NextResponse.json(product, { status: 200 });
  } catch (error: any) {
    // return error response
    return sendErrorResponse({ code: 404, message: "Product not found." });
  }
}

export async function destroy(
  request: NextRequest,
  { params }: { params: { storeId: string; productId: string } }
) {
  try {
    const { storeId, productId } = params;

    // execute query
    const product = await Product.findOne({
      _id: productId,
      store: storeId,
      owner: request.user._id,
    });

    // return error response if no product found
    if (!product)
      return sendErrorResponse({ code: 404, message: "Product not found." });

    await product.deleteOne({
      _id: productId,
      store: storeId,
      owner: request.user._id,
    });

    // return success reponse
    return NextResponse.json({ message: "Product deleted." }, { status: 200 });
  } catch (error: any) {
    // return error response

    return sendErrorResponse(error);
  }
}
