import { Schema, model, models } from "mongoose";
import { IStore } from "../interfaces";

const storeSchema = new Schema<IStore>(
  {
    storeName: { type: String, required: true, minlength: 2, unique: true },
    storeSlug: String,
    owner: { type: Schema.Types.ObjectId, ref: "User" },
    description: { type: String, required: false },
  },
  { timestamps: true }
);

const Store = () => model<IStore>("Store", storeSchema);

export default (models.Store || Store()) as ReturnType<typeof Store>;
