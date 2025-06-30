import express from "express";

import getJokes from "../controllers/getJokes.js";
import getTags from "../controllers/getTags.js";
import deleteJoke from "../controllers/deleteJoke.js";
import newJoke from "../controllers/newJoke.js";
import editJoke from "../controllers/editJoke.js";
import paginate from "../controllers/paginate.js";
import jokeId from "../controllers/jokeId.js";
import getJoke from "../controllers/getJoke.js";
let jokeRouter = express.Router();

jokeRouter.get(
  "/joke",
  getJoke
  //tags=tag tags=tag&tags=tag
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
  getJokes
);

jokeRouter.get("/tags", getTags);

jokeRouter.delete("/:id/delete", deleteJoke);

jokeRouter.post("/joke", newJoke);

jokeRouter.put("/:id/edit", editJoke);

jokeRouter.get("/page", paginate);

jokeRouter.get("/id/:id", jokeId);

export default jokeRouter;
