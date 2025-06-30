import express from "express";
import asyncHandler from "../utils/asyncHandler.js";
import isEmpty from "../utils/isEmpty.js";
import codes from "../constants/statusCodes.js";
import Joke from "../models/joke.model.js";
import ApiErrorResponse from "../utils/apiErrorResponse.js";
import ApiResponse from "../utils/apiResponse.js";
import mongoose from "mongoose";
let jokeRouter = express.Router();

jokeRouter.get(
  "/joke", //tags=tag tags=tag&tags=tag
  asyncHandler(async (req, res) => {
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
    let joke = await Joke.aggregate([
      { $match: { tags: { $in: tagList } } },
      { $sample: { size: 1 } },
      { $project: { __v: 0, createdAt: 0, updatedAt: 0 } },
    ]);
    if (!joke || isEmpty([joke])) {
      return res
        .status(codes.notFound)
        .json(new ApiErrorResponse("Joke not found", codes.notFound).res());
    }

    return res.status(codes.ok).json(
      new ApiResponse("Joke fetched successfully", codes.ok, {
        joke: joke,
      }).res()
    );
  })
);
//     return res.status(codes.ok).json(
//       new ApiResponse("Joke fetched successfully", codes.ok, {
//         joke: joke.joke,
//         tags: joke.tags,
//         rating: joke.rating,
//       }).res()
//     );
//   })
// );

jokeRouter.get(
  "/jokes", //tags=tag || tags=tag&tags=tag
  asyncHandler(async (req, res) => {
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
);

jokeRouter.get(
  "/tags",
  asyncHandler(async (req, res) => {
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
  })
);

jokeRouter.delete(
  "/:id/delete",
  asyncHandler(async (req, res) => {
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
  })
);

jokeRouter.post(
  "/joke",
  asyncHandler(async (req, res) => {
    let body = req.body;
    let { joke, tags, rating } = body;
    console.log(tags)
    if (isEmpty([joke,tags])) {
      return res
        .status(codes.badRequest)
        .json(
          new ApiErrorResponse(
            "Some fields are missing",
            codes.badRequest
          ).res()
        );
    }

    let newJoke = await Joke.create({...body});
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
  })
);

jokeRouter.put(
  "/:id/edit",
  asyncHandler(async (req, res) => {
    let body = req.body;
    let id = req.params.id;
    let { joke, tags, rating } = body;
    let payload = { joke, tags, rating };
    if (isEmpty([joke, ...tags,id])) {
      return res
        .status(codes.badRequest)
        .json(
          new ApiErrorResponse(
            "Some fields are missing ",
            codes.badRequest
          ).res()
        );
    }
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(codes.badRequest)
        .json(
          new ApiErrorResponse(
            "Id is wrong or invalid ",
            codes.badRequest
          ).res()
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
  })
);

jokeRouter.get(
  "/page", //?page=1&limit=10
  asyncHandler(async (req, res) => {
    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit);
    let size = (page - 1) * limit;
    let jokes = await Joke.aggregate([{ $skip: size }, { $limit: limit }]);
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
  })
);

jokeRouter.get(
  "/id/:id",
  asyncHandler(async (req, res) => {
    let id = req.params.id;
    if (isEmpty([id])) {
      return res
        .status(codes.badRequest)
        .json(new ApiErrorResponse("ID is required", codes.badRequest).res());
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res
        .status(codes.badRequest)
        .json(
          new ApiErrorResponse("Invalid ID format", codes.badRequest).res()
        );
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
        rating:joke.rating,
        tags:joke.tags,
      }).res()
    );
  })
);

export default jokeRouter;
