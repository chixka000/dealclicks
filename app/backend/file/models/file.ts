import mongoose, { Schema } from "mongoose";

const fileSchema = new Schema({
  fileName: { type: String, required: true },
  size: { type: Number, required: true },
  type: { type: String, required: true },
  subtype: { type: String, required: true },
  url: { type: String, required: true },
  uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const File = mongoose.models.File || mongoose.model("File", fileSchema);

export default File;
