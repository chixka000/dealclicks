import { index } from "@/app/backend/product/controllers/product";
import connectDatabase from "@/app/backend/shared/config/database";
import { middlewares } from "@/app/backend/shared/middleware";

connectDatabase();

export const GET = middlewares(index, ["auth"]).bind(null);
