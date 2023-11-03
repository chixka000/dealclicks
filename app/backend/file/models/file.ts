import {
  HydratedDocument,
  Model,
  QueryWithHelpers,
  Schema,
  model,
  models,
} from "mongoose";
import { NextRequest } from "next/server";
import { FileModelType, FileQueryHelpers, IFile } from "../interfaces/file";

const fileSchema = new Schema<
  IFile,
  Model<IFile, FileQueryHelpers>,
  {},
  FileQueryHelpers
>(
  {
    fileName: { type: String, required: true },
    size: { type: Number, required: true },
    type: { type: String, required: true },
    subtype: { type: String, required: true },
    url: { type: String, required: true },
    uploadedBy: { type: Schema.Types.ObjectId, ref: "User" },
    signature: { type: String, required: true },
    publicId: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

fileSchema.query.populateRelations = function populateRelations(
  this: QueryWithHelpers<any, HydratedDocument<IFile>, FileQueryHelpers>,
  request: NextRequest
) {
  const includes = request.nextUrl.searchParams.get("includes");

  if (includes) {
    const relations = includes.split(",");

    relations.forEach((relation) => {
      switch (relation.toLowerCase()) {
        case "uploader":
          this.populate("uploadedBy");
          break;

        default:
          break;
      }
    });
  }

  return this;
};

const File = () => model<IFile, FileModelType>("File", fileSchema);

export default (models.File || File()) as ReturnType<typeof File>;
