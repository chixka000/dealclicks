import { NextResponse } from "next/server";
import { sendErrorResponse } from "../../shared/exception/errorResponse";
import { validate } from "../../shared/validator";
import { productValidator } from "../validator/productValidator";
import Product from "../models/product";
import { VARIANTSERVICE } from "../services";
import { authorize } from "../../shared/utils/getDataFromToken";

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
      store: data.storeId,
      owner: user._id,
    };

    // create the product
    const product = await Product.create(productPayload);

    // run the variant creation service
    const result = await VARIANTSERVICE.createMany(product, data.variants);

    // return success response
    return NextResponse.json(
      { message: "Created Successfully", product: result },
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

    // get queryStrings to paginate
    const page = parseInt(request.nextUrl.searchParams.get("page") || "1");
    const limit = parseInt(request.nextUrl.searchParams.get("limit") || "10");

    // execute query
    const products = await Product.find({
      store: params.storeId,
      owner: user._id,
    })
      .populateRelations(request)
      .paginate(page, limit);

    // get total count and totalpages of the stores for pagination information
    const total = await Product.countDocuments({
      store: params.storeId,
      owner: user._id,
    });
    const totalPages = Math.ceil(total / limit);

    // return success response
    return NextResponse.json(
      {
        data: products,
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
