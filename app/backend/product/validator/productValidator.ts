import { NextRequest } from "next/server";
import { IProduct, IProductValidator } from "../interfaces/product";
import { IUser } from "../../user/interfaces";
import { authorize } from "../../shared/utils/getDataFromToken";
import { Schema } from "../../shared/validator";

export async function productValidator(
  request: NextRequest,
  data: IProduct,
  params?: { id: string }
): Promise<{ schema: IProductValidator; message: any; user: IUser }> {
  try {
    const user = await authorize(request);

    if (!user)
      throw new Error(`You don't have permission to execute this request.`);

    const method = request.method;

    const schema: IProductValidator = {
      name: Schema.String({
        trim: true,
        rules: [
          {
            method: "unique",
            model: "Product",
            where: { storeId: data.store },
            whereNot:
              method === "PATCH" || method === "PUT"
                ? { _id: { $ne: params!.id } }
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
      price: Schema.NumberOptional(),
      storeId: Schema.String({
        trim: true,
        rules: [
          {
            method: "exists",
            model: "Store",
            where: { _id: data.store, owner: user._id },
          },
        ],
      }),
      variants: Schema.Array({
        members: {
          name: Schema.String({ trim: true }),
          url: Schema.String(),
          sizes: Schema.ArrayOptional({ member: Schema.String() }),
          media: Schema.ArrayOptional({
            member: Schema.String({
              trim: true,
              rules: [{ method: "exists", model: "File" }],
            }),
          }),
          stock: Schema.NumberOptional(),
        },
      }),
    };

    const message = {};

    return { schema, message, user };
  } catch (error) {
    throw new Error(`You don't have permission to execute this request.`);
  }
}
