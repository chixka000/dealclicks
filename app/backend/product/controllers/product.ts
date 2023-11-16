import { NextRequest, NextResponse } from "next/server";
import { sendErrorResponse } from "../../shared/exception/errorResponse";
import { validate } from "../../shared/validator";
import { productValidator } from "../validator/productValidator";
import Product from "../models/product";

export async function create(request: NextRequest) {
  try {
    // validate request body
    const { errors, data, user } = await validate(request, productValidator);

    // check if there is errors in the validate response
    if (errors.length) return sendErrorResponse(422, errors);

    // construct payload
    const productPayload = {
      name: data.name,
      price: data.price,
      description: data.description,
      store: data.store,
      owner: user._id,
    };

    // create the product
    const createdProduct = await Product.create(productPayload);

    // run the variant creation service

    // return success response
    return NextResponse.json(
      { message: "Created Successfully" },
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
