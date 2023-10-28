import { login } from "../../controllers/auth";
import connectDatabase from "../../database";

connectDatabase();

export const POST = login;
