import {
  destroy,
  show,
  update,
} from "@/app/backend/product/controllers/product";
import connectDatabase from "@/app/backend/shared/config/database";
import { middlewares } from "@/app/backend/shared/middleware";

connectDatabase();

export const GET = middlewares(show, ["auth"]).bind(null);
export const DELETE = middlewares(destroy, ["auth"]).bind(null);
export const PATCH = middlewares(update, ["auth"]).bind(null);
export const PUT = middlewares(update, ["auth"]).bind(null);
