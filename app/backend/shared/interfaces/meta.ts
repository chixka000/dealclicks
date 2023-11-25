import { Document } from "mongoose";

// Define a generic type for the Mongoose document
export type MongooseDocument<T> = Document & T;

// Define a generic type for the argument
export type DocumentMethodArgument<T> = MongooseDocument<T>[];
