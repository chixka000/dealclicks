import { destroy, show } from "@/app/backend/file/controllers/file";
import connectDatabase from "@/app/backend/shared/config/database";
import { middlewares } from "@/app/backend/shared/middleware";

connectDatabase();

export const GET = middlewares(show, ["auth"]);
export const DELETE = middlewares(destroy, ["auth"]);
