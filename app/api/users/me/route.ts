import { me } from "../../controllers/users";
import connectDatabase from "../../database";

connectDatabase();

export const GET = me;
