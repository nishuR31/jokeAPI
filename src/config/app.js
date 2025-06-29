import express from "express";
import cors from "cors";
import expressLimit from "express-rate-limit";
import dotenv from "dotenv";
import logger from "../utils/logger.js";
import jokeApiRoute from "../routes/joke.route.js";
import ApiErrorResponse from "../utils/apiErrorResponse.js";
import codes from "../constants/statusCodes.js";
import ApiResponse from "../utils/apiResponse.js";
import password from "../utils/password.js";
dotenv.config({ path: "../../.env" });
let port = process.env.PORT || 3000;

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

app.get("/", (req, res) => {
  res.send("Server fired up");
});

app.get("/.env", (req, res) => {
  return res.status(codes.ok).json(
    new ApiResponse("Env fetching", codes.ok, {
      processEnv: [process.env.MONGO_URI, process.env.PORT],
    }).res()
  );
});

app.use(baseRoute, jokeApiRoute);

app.listen(port, async () => {
  await password();
  console.log(`http://localhost:${port}\nServer fired up`);
});

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

// export default app;
