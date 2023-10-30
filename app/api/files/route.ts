import { upload } from "@/app/domains/file/controllers/file";
import connectDatabase from "@/app/domains/shared/config/database";

connectDatabase();

export const POST = upload;
