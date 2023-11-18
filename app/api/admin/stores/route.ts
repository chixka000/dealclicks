import connectDatabase from "@/app/backend/shared/config/database";
import { middlewares } from "@/app/backend/shared/middleware";
import { index } from "@/app/backend/store/controllers/stores";

connectDatabase();

export const GET = middlewares(index, ["auth"]);
