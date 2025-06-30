import mongoose from "mongoose";
import codes from "../constants/statusCodes.js";
import Joke from "../models/joke.model.js";
import ApiErrorResponse from "../utils/apiErrorResponse.js";
import ApiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import isEmpty from "../utils/isEmpty.js";

let getTags = asyncHandler(async (req, res) => {
  let tagAggr = await Joke.aggregate([
    { $unwind: "$tags" },
    { $group: { _id: null, tagList: { $addToSet: "$tags" } } },
    { $project: { _id: 0, tagList: 1 } },
  ]);

  const tags = tagAggr[0]?.tagList || [];
  if (isEmpty(tags)) {
    return res
      .status(codes.notFound)
      .json(new ApiErrorResponse("Tags are not found", codes.notFound).res());
  }
  return res.status(codes.ok).json(
    new ApiResponse("Tags are found successfully", codes.ok, {
      tags: tags,
    }).res()
  );
});

export default getTags;
