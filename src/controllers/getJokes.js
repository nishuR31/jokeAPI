import codes from "../constants/statusCodes.js";
import Joke from "../models/joke.model.js";
import ApiErrorResponse from "../utils/apiErrorResponse.js";
import ApiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import isEmpty from "../utils/isEmpty.js";

let getJokes=asyncHandler(async (req, res) => {
    let tags = req.query.tags;
    if (!tags) {
      return res
        .status(codes.notFound)
        .json(new ApiErrorResponse("No tags provided", codes.notFound).res());
    }

    let tagList = Array.isArray(tags) ? tags : tags ? [tags] : [];

    if (isEmpty(tagList)) {
      return res
        .status(codes.badRequest)
        .json(new ApiErrorResponse("Tag is empty", codes.badRequest).res());
    }
    let jokes = await Joke.aggregate([
      { $match: { tags: { $in: tagList } } },
      { $project: { __v: 0, createdAt: 0, updatedAt: 0 } },
    ]);
    if (!jokes || isEmpty([jokes])) {
      return res
        .status(codes.notFound)
        .json(new ApiErrorResponse("Joke not found", codes.notFound).res());
    }

    return res.status(codes.ok).json(
      new ApiResponse("Joke fetched successfully", codes.ok, {
        jokes: jokes,
      }).res()
    );
  })

  export default getJokes