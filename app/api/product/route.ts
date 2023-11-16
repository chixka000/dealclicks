import { create } from "@/app/backend/product/controllers/product";
import connectDatabase from "@/app/backend/shared/config/database";

connectDatabase();

export const POST = create;
