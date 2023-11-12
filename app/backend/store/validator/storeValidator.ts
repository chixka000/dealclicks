import { NextRequest } from "next/server";
import { authorize } from "../../shared/utils/getDataFromToken";
import { IStore, IStoreValidator } from "../interfaces";
import { IUser } from "../../user/interfaces";
import { Schema } from "../../shared/validator";

export async function storeValidator(
  request: NextRequest,
  data: IStore,
  params?: { id: string }
): Promise<{ schema: IStoreValidator; message: any; user: IUser }> {
  try {
    const user = await authorize(request);

    if (!user)
      throw new Error(`You don't have permission to execute this request.`);

    const method = request.method;

    const schema: IStoreValidator = {
      storeName: Schema.String({
        trim: true,
        rules: [
          {
            method: "unique",
            model: "Store",
            where: { storeName: data.storeName },
            whereNot:
              method === "PATCH" || method === "PUT"
                ? { _id: { $ne: params!.id } }
                : {},
          },
        ],
      }),
      description: Schema.StringOptional({ trim: true }),
    };

    const message: any = {
      storeName: {
        unique:
          method === "POST"
            ? "You already created this store."
            : `You already have a store with this name.`,
      },
    };

    return { schema, message, user };
  } catch (error) {
    // console.log(error);

    throw new Error(`You don't have permission to execute this request.`);
  }
}
