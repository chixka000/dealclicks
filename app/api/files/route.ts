import { index, upload } from "@/app/backend/file/controllers/file";
import connectDatabase from "@/app/backend/shared/config/database";
import { middlewares } from "@/app/backend/shared/middleware";

connectDatabase();

export const POST = middlewares(upload, ["auth"]);
export const GET = middlewares(index, ["auth"]);
