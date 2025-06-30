import codes from "../constants/statusCodes.js";
import Joke from "../models/joke.model.js";
import ApiErrorResponse from "../utils/apiErrorResponse.js";
import ApiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import isEmpty from "../utils/isEmpty.js";
import mongoose from "mongoose";


let deleteJoke = asyncHandler(async (req, res) => {
  const id = req.params.id;

  // Optional: Validate ObjectId format
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(codes.badRequest)
      .json(new ApiErrorResponse("Invalid joke ID", codes.badRequest).res());
  }

  const deletedJoke = await Joke.findByIdAndDelete(id);

  if (!deletedJoke) {
    return res
      .status(codes.notFound)
      .json(new ApiErrorResponse("Joke not found", codes.notFound).res());
  }

  return res.status(codes.ok).json(
    new ApiResponse("Joke successfully deleted", codes.ok, {
      id: deletedJoke._id,
      joke: deletedJoke.joke,
      tags: deletedJoke.tags,
      rating: deletedJoke.rating,
    }).res()
  );
});

export default deleteJoke;
