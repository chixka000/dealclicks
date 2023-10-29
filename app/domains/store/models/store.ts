import mongoose, { Schema } from "mongoose";

const storeSchema = new Schema({
  storeName: { type: String, required: true, minlength: 2, unique: true },
  storeSlug: String,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  description: { type: String, required: false },
});

const Store = mongoose.models.Store || mongoose.model("Store", storeSchema);

export default Store;
