import mongoose from "mongoose";
import codes from "../constants/statusCodes.js";
import Joke from "../models/joke.model.js";
import ApiErrorResponse from "../utils/apiErrorResponse.js";
import ApiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import isEmpty from "../utils/isEmpty.js";


let editJoke = asyncHandler(async (req, res) => {
  let body = req.body;
  let id = req.params.id;
  let { joke, tags, rating } = body;
  let payload = { joke, tags, rating };
  if (isEmpty([joke, ...tags, id])) {
    return res
      .status(codes.badRequest)
      .json(
        new ApiErrorResponse("Some fields are missing ", codes.badRequest).res()
      );
  }
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res
      .status(codes.badRequest)
      .json(
        new ApiErrorResponse("Id is wrong or invalid ", codes.badRequest).res()
      );
  }

  let updatedJoke = await Joke.findByIdAndUpdate(id, payload, {
    new: true,
    validateBeforeSave: true,
  });
  if (!updatedJoke) {
    return res
      .status(codes.notFound)
      .json(
        new ApiErrorResponse("No jokes found to update", codes.notFound).res()
      );
  }
  return res.status(codes.ok).json(
    new ApiResponse("joke successfully update", codes.ok, {
      "Updated joke": updatedJoke.joke,
    }).res()
  );
});

export default editJoke;
