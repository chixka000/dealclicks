import { NextResponse } from "next/server";

const STATUSCODES = {
  400: { type: "BAD_REQUEST", code: 400 },
  401: { type: "UNAUTHORIZED", code: 401 },
  402: { type: "PAYMENT_REQUIRED", code: 402 },
  403: { type: "FORBIDDEN", code: 403 },
  404: { type: "NOT_FOUND", code: 404 },
  405: { type: "METHOD_NOT_ALLOWED", code: 405 },
  406: { type: "NOT_ACCEPTABLE", code: 406 },
  407: { type: "PROXY_AUTHENTICATION_REQUIRED", code: 407 },
  408: { type: "REQUEST_TIMEOUT", code: 408 },
  409: { type: "CONFLICT", code: 409 },
  410: { type: "GONE", code: 410 },
  411: { type: "LENGTH_REQUIRED", code: 411 },
  412: { type: "PRECONDITION_FAILED", code: 412 },
  413: { type: "PAYLOAD_TOO_LARGE", code: 413 },
  414: { type: "URI_TOO_LONG", code: 414 },
  415: { type: "UNSUPPORTED_MEDIA_TYPE", code: 415 },
  416: { type: "RANGE_NOT_SATISFIABLE", code: 416 },
  417: { type: "EXPECTATION_FAILED", code: 417 },
  418: { type: "I'M_A_TEAPOT", code: 418 },
  421: { type: "MISDIRECTED_REQUEST", code: 421 },
  422: { type: "UNPROCESSABLE_ENTITY", code: 422 },
  423: { type: "LOCKED", code: 423 },
  424: { type: "FAILED_DEPENDENCY", code: 424 },
  425: { type: "TOO_EARLY", code: 425 },
  426: { type: "UPGRADE_REQUIRED", code: 426 },
  428: { type: "PRECONDITION_REQUIRED", code: 428 },
  429: { type: "TOO_MANY_REQUESTS", code: 429 },
  431: { type: "REQUEST_HEADER_FIELDS_TOO_LARGE", code: 431 },
  451: { type: "UNAVAILABLE_FOR_LEGAL_REASONS", code: 451 },
};

// status = response code, body = response body/message (can be set to undefined)
export function sendErrorResponse(error: any) {
  return NextResponse.json(
    {
      ...STATUSCODES?.[error?.code as keyof typeof STATUSCODES],
      error:
        error?.errors ??
        error?.message ??
        error?.response?.message ??
        "Something went wrong",
    },
    { status: error?.code && error.code >= 200 ? error.code : 500 }
  );
}
