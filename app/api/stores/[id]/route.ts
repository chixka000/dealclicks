import connectDatabase from "@/app/backend/shared/config/database";
import { destroy, show, update } from "@/app/backend/store/controllers/stores";


connectDatabase();

export const GET = show;
export const DELETE = destroy;
export const PATCH = update;
export const PUT = update;
