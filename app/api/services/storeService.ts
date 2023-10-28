import { authorize } from "@/app/helper/getDataFromToken";
import { IStore } from "../interfaces";
import { NextRequest } from "next/server";
import { sendErrorResponse } from "../exception/errorResponse";
import User from "../models/user";
import Store from "../models/store";
import { slugify } from "@/app/helper/formatter";

export default class StoreService {
  async createStore(payload: IStore, request: NextRequest) {
    try {
      const me = await authorize(request);

      const user = await User.findOne({ _id: me?.id });

      if (!user) {
        return sendErrorResponse(401, {
          error: "Token invalid",
        });
      }

      let store = await Store.findOne({
        storeName: payload.store_name,
        _id: me.id,
      });

      if (store) {
        return sendErrorResponse(409, {
          error: "You already created this store.",
        });
      }

      const storeNameSlug = slugify(payload.store_name);

      store = await Store.create({
        storeName: payload.store_name,
        storeSlug: storeNameSlug,
        description: payload?.description,
        owner: me.id,
      });

      user.stores.push(store._id);

      await user.save();

      return store;
    } catch (error) {
      throw error;
    }
  }
}
