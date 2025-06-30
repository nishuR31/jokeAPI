import express from "express";
import cors from "cors";
import expressLimit from "express-rate-limit";
import logger from "../utils/logger.js";
import jokeApiRoute from "../routes/joke.route.js";
import ApiErrorResponse from "../utils/apiErrorResponse.js";
import codes from "../constants/statusCodes.js";
import helpRoute from "../routes/help.route.js";

const baseRoute = "/api/v1";

let limit = expressLimit({
  windowMs: 60 * 1000,
  max: 60,
  message: "Limit reached, kindly wait until limit gets refreshed..",
});

let app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(limit);
app.use(cors());
app.use(logger);

app.get(baseRoute, (req, res) => {
  res.send("Server fired up");
});

app.use(baseRoute, jokeApiRoute);
app.use(baseRoute, helpRoute);

// app.listen(port);
// app.listen(port, () => {
//   // await password();
//   console.log(`Server fired up in: http://localhost:${port}`);
// });

app.use((err, req, res, next) => {
  return res
    .status(codes.badRequest)
    .json(
      new ApiErrorResponse(
        "Error occured, control recieved to error route",
        codes.badRequest,
        {},
        err
      ).res()
    );
});

export default app;
