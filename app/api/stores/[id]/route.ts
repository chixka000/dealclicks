import {
  destroy,
  show,
  update,
} from "../../../domains/store/controllers/stores";
import connectDatabase from "../../../domains/shared/config/database";

connectDatabase();

export const GET = show;
export const DELETE = destroy;
export const PATCH = update;
export const PUT = update;
