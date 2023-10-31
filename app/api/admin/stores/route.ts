import connectDatabase from "@/app/backend/shared/config/database";
import { index } from "@/app/backend/store/controllers/stores";


connectDatabase();

export const GET = index;
