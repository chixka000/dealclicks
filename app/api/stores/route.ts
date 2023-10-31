import connectDatabase from "@/app/backend/shared/config/database";
import { create, index } from "@/app/backend/store/controllers/stores";


connectDatabase();

export const POST = create;
export const GET = index;
