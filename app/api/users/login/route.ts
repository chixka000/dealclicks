import { login } from "@/app/backend/auth/controllers/auth";
import connectDatabase from "@/app/backend/shared/config/database";

connectDatabase();

export const POST = login;
