import { IProductPayload, IProductValidator } from "@/app/backend/product/interfaces/product";
import { Schema } from "@/app/backend/shared/validator";
import Store from "@/app/backend/store/models/store";
import Product from "@/app/backend/product/models/product";
import File from "@/app/backend/file/models/file";
import Category from "@/app/backend/category/models/category";
import Variant from "@/app/backend/product/models/variant";

export async function productValidator(
  request: NextRequest,
  data: IProductPayload,
  params?: { productId: string; storeId: string }
): Promise<{ schema: IProductValidator; message: any }> {
  try {
    const method = request.method;

    const schema: IProductValidator = {
      name: Schema.String({
        trim: true,
        rules: [
          {
            method: "unique",
            model: Product,
            where: { store: data.storeId },
            whereNot:
              method === "PATCH" || method === "PUT"
                ? { _id: { $ne: params?.productId }, store: params?.storeId }
                : {},
          },
          {
            method: "minLength",
          },
        ],
      }),
      description: Schema.StringOptional({
        trim: true,
        rules: [{ method: "minLength", size: 10 }],
      }),
      storeId: Schema.String({
        trim: true,
        rules: [
          {
            method: "exists",
            model: Store,
            where: { _id: data.storeId, owner: request.user._id },
          },
        ],
      }),
      isFeatured: Schema.BooleanOptional(),
      isSpecialOffer: Schema.BooleanOptional(),
      categoryId: Schema.String({
        trim: true,
        rules: [
          {
            method: "exists",
            model: Category,
            where: { _id: data.categoryId, createdBy: request.user._id },
          },
        ],
      }),
      variants: Schema.Array({
        members: {
          _id: Schema.StringOptional({
            trim: true,
            rules: [{ method: "exists", model: Variant }],
          }),
          name: Schema.String(
            method === "PATCH" || method === "PUT"
              ? {
                  trim: true,
                  rules: [
                    {
                      method: "unique",
                      model: Variant,
                      where: { product: params?.productId },
                    },
                  ],
                }
              : { trim: true }
          ),
          price: Schema.NumberOptional(),
          url: Schema.String(),
          sizes: Schema.ArrayOptional({ member: Schema.String() }),
          media: Schema.ArrayOptional({
            member: Schema.String({
              trim: true,
              rules: [{ method: "exists", model: File }],
            }),
          }),
          stock: Schema.NumberOptional(),
        },
      }),
    };

    const message = {
      categoryId: {
        exists: "Category not found",
        required: "Category is missing",
      },
      variants: {
        media: {
          "*": {
            exists: "media not found",
          },
        },
      },
    };

    return { schema, message };
  } catch (error) {
    throw new Error(`You don't have permission to execute this request.`);
  }
}
