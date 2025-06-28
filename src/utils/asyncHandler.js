import ApiErrorResponse from "./apiErrorResponse.js";
let asyncHandler = (func) => async (req, res, next) => {
  try {
    return await func(req, res, next);
  } catch (err) {
    console.log(new ApiErrorResponse().res());
  }
};

export default asyncHandler;
