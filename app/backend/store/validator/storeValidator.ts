import { NextRequest } from "next/server";
import { IStore, IStoreValidator, IUser } from "../../../interfaces";
import Store from "../models/store";
import { authorize } from "../../shared/utils/getDataFromToken";

export async function storeValidator(
  request: NextRequest,
  data: IStore,
  params?: { id: string }
): Promise<{ schema: IStoreValidator; message: any; user: IUser }> {
  try {
    const user = await authorize(request);

    const method = request.method;

    const schema: IStoreValidator = {
      storeName: {
        type: "string",
        required: true,
        rules: [
          {
            method: "unique",
            property: "storeName",
            model: Store,
            where: { storeName: data.storeName },
            whereNot:
              method === "PATCH" || method === "PUT"
                ? { _id: { $ne: params!.id } }
                : {},
          },
        ],
      },
      description: { type: "string", required: false },
    };

    const message: any = {
      "rules.unique":
        method === "POST"
          ? "You already created this store."
          : `You already have a store with this name.`,
    };

    return { schema, message, user };
  } catch (error) {
    // console.log(error);

    throw new Error(`You don't have permission to execute this request.`);
  }
}
