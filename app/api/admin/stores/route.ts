import { index } from "../../controllers/stores";
import connectDatabase from "../../database";

connectDatabase();

export const GET = index;
