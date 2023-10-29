import { index } from "../../../domains/store/controllers/stores";
import connectDatabase from "../../../domains/shared/config/database";

connectDatabase();

export const GET = index;
