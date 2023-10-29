import { create, index } from "../../domains/store/controllers/stores";
import connectDatabase from "../../domains/shared/config/database";

connectDatabase();

export const POST = create;
export const GET = index;
