import express from "express";
import asyncHandler from "../utils/asyncHandler.js";
import isEmpty from "../utils/isEmpty";
import codes from "../constants/statusCodes/js";
import Joke from "../models/joke.model.js";
import ApiErrorResponse from "../utils/apiErrorResponse.js";
import ApiResponse from "../utils/apiResponse.js";

let jokeRouter = express.Router();

jokeRouter.get(
  "/joke", //tags=tag tags=tag&tags=tag
  asyncHandler(async (req, res) => {
    let tags = req.query.tags;
    let tagList = Array.isArray(tags) ? tags : [tags];

    if (isEmpty(tagList)) {
      return res
        .status(codes.badRequest)
        .json(new ApiErrorResponse("Tag is empty", codes.badRequest).res());
    }
    let joke = await Joke.findOne({ tags: { $in: tagList } });
    if (!joke) {
      return res
        .status(codes.notFound)
        .json(new ApiErrorResponse("Joke not found", codes.notFound).res());
    }

    return res
      .status(codes.ok)
      .json(new ApiResponse("Joke fetched successfully", codes.ok, joke).res());
  })
);
