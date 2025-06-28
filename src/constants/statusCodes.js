const codes = {
  // ✅ Success Codes
  ok: 200,
  created: 201,
  accepted: 202,
  noContent: 204,

  // ⚠️ Client Errors (400 range)
  badRequest: 400,
  unauthorized: 401,
  paymentRequired: 402,
  forbidden: 403,
  notFound: 404,
  methodError: 405,
  conflict: 409,
  unsupportedMediaType: 415,
  tooManyRequest: 429,

  // 🚨 Server Errors (500 range)
  interalServerError: 500,
  notImplement: 501,
  badGateway: 502,
  serviceUnavailable: 503,
  gatewayTimeout: 504,
};

export default codes;
