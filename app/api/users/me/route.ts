import { me } from "@/app/backend/auth/controllers/auth";
import connectDatabase from "@/app/backend/shared/config/database";
import { middlewares } from "@/app/backend/shared/middleware";

connectDatabase();

export const GET = middlewares(me, ["auth"]);
