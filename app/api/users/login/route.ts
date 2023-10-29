import { login } from "../../../domains/auth/controllers/auth";
import connectDatabase from "../../../domains/shared/config/database";

connectDatabase();

export const POST = login;
