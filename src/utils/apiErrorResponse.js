import codes from "../constants/statusCodes.js";

export default class ApiErrorResponse extends Error {
  constructor(
    message = "Some err occured when fetching api",
    code = codes.badRequest,
    payload = {},
    err = null
  ) {
    super(err?.message || message);
    this.name = this.constructor.name;
    this.payload = payload;
    this.code = code;
    if (Error.captureStackTrace)
      Error.captureStackTrace(this, this.constructor);
  }

  res(dev = true) {
    return {
      message: this.message,
      name: this.name,
      payload: this.payload,
      code: this.code,
      ...(dev && { stack: this.stack }),
    };
  }
}
