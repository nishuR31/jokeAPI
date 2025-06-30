import codes from "../constants/statusCodes.js";
import Joke from "../models/joke.model.js";
import ApiErrorResponse from "../utils/apiErrorResponse.js";
import ApiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import isEmpty from "../utils/isEmpty.js";
import mongoose from "mongoose";

let jokeId = asyncHandler(async (req, res) => {
  let id = req.params.id;
  if (isEmpty([id])) {
    return res
      .status(codes.badRequest)
      .json(new ApiErrorResponse("ID is required", codes.badRequest).res());
  }

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(codes.badRequest)
      .json(new ApiErrorResponse("Invalid ID format", codes.badRequest).res());
  }
  let joke = await Joke.findById(id);
  if (!joke) {
    return res.status(codes.notFound).json(
      new ApiErrorResponse("Joke not found", codes.notFound, {
        id: id,
      }).res()
    );
  }
  return res.status(codes.ok).json(
    new ApiResponse(`Joke with id: ${id} found successfully`, codes.ok, {
      joke: joke.joke,
      rating: joke.rating,
      tags: joke.tags,
    }).res()
  );
});

export default jokeId;
