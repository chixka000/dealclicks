import { index } from "@/app/backend/product/controllers/product";
import connectDatabase from "@/app/backend/shared/config/database";

connectDatabase();

export const GET = index;
