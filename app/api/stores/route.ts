import connectDatabase from "@/app/backend/shared/config/database";
import { middlewares } from "@/app/backend/shared/middleware";
import { authMiddleware } from "@/app/backend/shared/middleware/auth";
import { create, index } from "@/app/backend/store/controllers/stores";

connectDatabase();

export const POST = middlewares(create, ["auth"]);
export const GET = middlewares(index, ["auth"]);
