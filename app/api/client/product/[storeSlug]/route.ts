import { index } from "@/app/backend/product/client/controllers/product";
import connectDatabase from "@/app/backend/shared/config/database";

connectDatabase();

export const GET = index;
