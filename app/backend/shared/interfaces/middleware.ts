export type ControllerMethod = (
  request: NextRequest,
  ...args: any[]
) => Promise<any>;

export type MiddlewareHandlers = "auth";
