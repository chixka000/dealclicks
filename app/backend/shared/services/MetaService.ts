import { Document, Model } from "mongoose";

export default class MetaService {
  async getMeta(
    Model: Model<Document & any>,
    documents: Document & any,
    filters: { [key: string]: any },
    limit: number = 10
  ) {
    const total = await Model.countDocuments(filters);
    const totalPages = Math.ceil(total / limit);

    // return success response

    return {
      total,
      totalPages,
      cursor: documents.length ? documents[documents.length - 1]._id : null,
      limit,
    };
  }
}
