import { index, upload } from "@/app/backend/file/controllers/file";
import connectDatabase from "@/app/backend/shared/config/database";

connectDatabase();

export const POST = upload;
export const GET = index;
