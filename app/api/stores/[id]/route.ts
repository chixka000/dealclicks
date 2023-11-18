import connectDatabase from "@/app/backend/shared/config/database";
import { middlewares } from "@/app/backend/shared/middleware";
import { destroy, show, update } from "@/app/backend/store/controllers/stores";

connectDatabase();

export const GET = middlewares(show, ["auth"]);
export const DELETE = middlewares(destroy, ["auth"]);
export const PATCH = middlewares(update, ["auth"]);
export const PUT = middlewares(update, ["auth"]);
