import codes from "../constants/statusCodes.js";
import Joke from "../models/joke.model.js";
import ApiErrorResponse from "../utils/apiErrorResponse.js";
import ApiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import isEmpty from "../utils/isEmpty.js";

let newJoke = asyncHandler(async (req, res) => {
  let body = req.body;
  let { joke, tags, rating } = body;
  console.log(tags);
  if (isEmpty([joke, tags])) {
    return res
      .status(codes.badRequest)
      .json(
        new ApiErrorResponse("Some fields are missing", codes.badRequest).res()
      );
  }

  let newJoke = await Joke.create({ ...body });
  if (!newJoke) {
    return res
      .status(codes.interalServerError)
      .json(
        new ApiErrorResponse(
          "Joke creation failed",
          codes.interalServerError
        ).res()
      );
  }
  return res.status(codes.ok).json(
    new ApiResponse("Joke created successfully", codes.ok, {
      joke: newJoke.joke,
    }).res()
  );
});

export default newJoke;
