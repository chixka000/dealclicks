import { sendErrorResponse } from "../exception/errorResponse";
import { ControllerMethod } from "../interfaces/middleware";
import { authorize } from "../utils/getDataFromToken";

export async function authMiddleware(
  request: NextRequest,
  _: any[]
): Promise<{
  request: NextRequest;
  error: boolean;
  errorBody: { code: number; message: string };
}> {
  try {
    const user = await authorize(request);

    if (!user)
      throw {
        error: "You have no permission to execute this request.",
        code: 401,
      };

    request.user = user;

    return {
      request,
      error: false,
      errorBody: { code: 200, message: "has permission" },
    };
  } catch (error: any) {
    // return error response
    return {
      request,
      error: true,
      errorBody: {
        code: 401,
        message: "You have no permission to execute this request.",
      },
    };
    // return sendErrorResponse(401, {
    //   error:
    //     error?.message ??
    //     error?.response?.message ??
    //     "You have no permission to execute this request.",
    // });
  }
}
// export async function authMiddleware(request: NextRequest, method: Function) {
//   try {
//     const user = await authorize(request);

//     if (!user)
//       return sendErrorResponse(401, {
//         error:
//           "Access denied. you dont have permission to request in this endpoint.",
//       });

//     return method;
//   } catch (error: any) {
//     // return error response
//     return sendErrorResponse(500, {
//       error:
//         error?.message ??
//         error?.response?.message ??
//         "Access denied. you dont have permission to request in this endpoint.",
//     });
//   }
// }
