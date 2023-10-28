import { NextRequest } from "next/server";
import { IStoreValidator } from "../interfaces";
import { authorize } from "@/app/helper/getDataFromToken";
import Store from "../models/store";

export async function storeValidator(
  request: NextRequest
): Promise<{ schema: IStoreValidator; message: any }> {
  const me = await authorize(request);
  const store = new Store();
  const schema: IStoreValidator = {
    store_name: {
      type: "string",
      required: true,
      rules: [
        {
          method: "unique",
          property: "storeName",
          model: Store,
          where: { owner: me._id },
        },
      ],
    },
    description: { type: "string", required: false },
  };

  const message: any = {};

  return { schema, message };
}
