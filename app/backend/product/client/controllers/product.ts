import { sendErrorResponse } from "@/app/backend/shared/exception/errorResponse";
import Store from "@/app/backend/store/models/store";
import Product from "../../models/product";
import { METASERVICE } from "@/app/backend/shared/services";
import { NextResponse } from "next/server";

export async function index(
  request: NextRequest,
  { params }: { params: { storeSlug: string } }
) {
  try {
    const { storeSlug } = params;

    // get queryStrings to paginate
    const cursor = request.nextUrl.searchParams.get("cursor") ?? null;
    const limit = parseInt(request.nextUrl.searchParams.get("limit") || "10");

    // query by store by store slug
    const store = await Store.findOne({ storeSlug });

    // return error response if there is no store found
    if (!store)
      return sendErrorResponse({ code: 404, message: "Store not found." });

    // filters
    const filters = {
      store: store._id,
    };

    // query products by storeId
    const products = await Product.find(filters)
      .populateRelations(request)
      .paginate(cursor, limit);

    // get meta
    const meta = await METASERVICE.getMeta(Product, products, filters, limit);

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
  { params }: { params: { storeSlug: string; productSlug: string } }
) {
  try {
    const { storeSlug, productSlug } = params;

    // query by store by store slug
    const store = await Store.findOne({ storeSlug });

    // return error response if there is no store found
    if (!store)
      return sendErrorResponse({ code: 404, message: "Store not found." });

    // query products by storeId
    const product = await Product.findOne({
      slug: productSlug,
    }).populateRelations(request);

    // return error response if there is no product found
    if (!product)
      return sendErrorResponse({ code: 404, message: "Product not found" });

    // return success response
    return NextResponse.json(product, { status: 200 });
  } catch (error: any) {
    // return error response
    return sendErrorResponse(error);
  }
}
