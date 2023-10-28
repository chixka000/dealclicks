import { create, index } from "../controllers/stores";
import connectDatabase from "../database";

connectDatabase();

export const POST = create;
export const GET = index;
