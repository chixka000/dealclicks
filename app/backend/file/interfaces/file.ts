import mongoose, { QueryWithHelpers } from "mongoose";
import { HydratedDocument } from "mongoose";
import { Model } from "mongoose";
// import { NextRequest } from "next/server";

export interface IFile {
  fileName: string;
  size: number;
  type: string;
  subtype: string;
  url: string;
  uploadedBy: mongoose.Schema.Types.ObjectId;
  signature: string;
  publicId: string;
}

export interface FileQueryHelpers {
  populateRelations(
    request: NextRequest
  ): QueryWithHelpers<
    HydratedDocument<IFile>[],
    HydratedDocument<IFile>,
    FileQueryHelpers
  >;
}

export type FileModelType = Model<IFile, FileQueryHelpers>;
