import { bulkUpload } from "@/app/backend/file/controllers/file";
import connectDatabase from "@/app/backend/shared/config/database";

connectDatabase();

export const POST = bulkUpload;
