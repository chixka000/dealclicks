import { destroy, show } from "../../controllers/stores";
import connectDatabase from "../../database";

connectDatabase();

export const GET = show;
export const DELETE = destroy;
