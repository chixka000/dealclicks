import { index } from "@/app/backend/category/controllers/category";
import connectDatabase from "@/app/backend/shared/config/database";

connectDatabase();

export const GET = index;
