import {
  destroy,
  show,
  update,
} from "@/app/backend/category/controllers/category";
import connectDatabase from "@/app/backend/shared/config/database";

connectDatabase();

export const PATCH = update;
export const PUT = update;
