import {
  destroy,
  show,
  update,
} from "@/app/backend/category/controllers/category";
import connectDatabase from "@/app/backend/shared/config/database";
import { middlewares } from "@/app/backend/shared/middleware";

connectDatabase();

export const PATCH = middlewares(update, ["auth"]);
export const PUT = middlewares(update, ["auth"]);
