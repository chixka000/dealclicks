// fileName: { type: String, required: true },
// size: { type: Number, required: true },
// type: { type: String, required: true },
// subtype: { type: String, required: true },
// url: { type: String, required: true },
// uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
// signature: { type: String, required: true },
// publicId: { type: String, required: true },

export interface IFIle {
  fileName: string;
  size: number;
  type: string;
  subtype: string;
  url: string;
  uploadedBy: string;
  signature: string;
  publicId: string;
}
