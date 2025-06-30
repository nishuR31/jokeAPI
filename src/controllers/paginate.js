import codes from "../constants/statusCodes.js";
import Joke from "../models/joke.model.js";
import ApiErrorResponse from "../utils/apiErrorResponse.js";
import ApiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import isEmpty from "../utils/isEmpty.js";
import mongoose from "mongoose";


let paginate = asyncHandler(async (req, res) => {
    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit);
    let size = (page - 1) * limit;
    let jokes = await Joke.aggregate([
      { $skip: size },
      { $limit: limit },
      { $project: { __v: 0, createdAt: 0, updatedAt: 0 } },
    ]);
    let jokesAggr = await Joke.aggregate([{ $count: "joke" }]);
    let totalJokes = jokesAggr[0]?.joke || 0;
    let totalPages = Math.ceil(totalJokes / limit);

    let remainingJokes = totalJokes - size - jokes.length;

    if (page > totalPages) {
      return res
        .status(codes.badRequest)
        .json(
          new ApiErrorResponse(
            "Page number exceeds total pages",
            codes.badRequest
          ).res()
        );
    }

    if (isEmpty([jokes]) || jokes.length === 0 || totalJokes === 0) {
      return res
        .status(codes.notFound)
        .json(
          new ApiErrorResponse("Joke fetching error", codes.notFound).res()
        );
    }

    return res.status(codes.ok).json(
      new ApiResponse(
        `${limit} jokes successfully fetched. ${remainingJokes} jokes remaining.`,
        codes.ok,
        {
          jokes: jokes, // you should return them!
          page: page,
          limit: limit,
          totalJokes: totalJokes,
          remainingJokes: remainingJokes,
          hasMore: page < totalPages,
          nextPage: page < totalPages ? page + 1 : null,
        }
      ).res()
    );
  });

export default paginate;
