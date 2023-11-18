import { sendErrorResponse } from "../exception/errorResponse";
import { ControllerMethod, MiddlewareHandlers } from "../interfaces/middleware";
import { middleware } from "./handlers";

export function middlewares(
  method: ControllerMethod,
  handlers: Array<MiddlewareHandlers>
) {
  return async function middlewareHandler(
    request: NextRequest,
    ...args: any[]
  ) {
    try {
      let initRequest: NextRequest = request;

      for (let index = 0; index < handlers.length; index++) {
        const result = await middleware[`${handlers[index]}Middleware`](
          initRequest,
          args
        );

        if (result.error) throw result.errorBody;

        initRequest = result.request;
      }

      return method(initRequest, ...args);
    } catch (error: any) {
      return sendErrorResponse(error);
    }
  };
}
