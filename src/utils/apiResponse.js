import codes from "../constants/statusCodes.js";

export default class ApiResponse {
  constructor(
    message = "Api fetched succesfully",
    code = codes.ok,
    payload = {}
  ) {
    this.message = message;
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
