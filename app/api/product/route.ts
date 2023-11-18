import { create } from "@/app/backend/product/controllers/product";
import connectDatabase from "@/app/backend/shared/config/database";
import { middlewares } from "@/app/backend/shared/middleware";

connectDatabase();

export const POST = middlewares(create, ["auth"]).bind(null);
