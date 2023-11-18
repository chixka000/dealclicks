import { store } from "@/app/backend/category/controllers/category";
import connectDatabase from "@/app/backend/shared/config/database";
import { middlewares } from "@/app/backend/shared/middleware";

connectDatabase();

export const POST = middlewares(store, ["auth"]).bind(null);
