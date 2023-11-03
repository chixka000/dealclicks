import { destroy, show } from "@/app/backend/file/controllers/file";
import connectDatabase from "@/app/backend/shared/config/database";

connectDatabase();

export const GET = show;
export const DELETE = destroy
