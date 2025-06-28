import express from "express";
import cors from "cors";
import expressLimit from "express-rate-limit";
import dotenv from "dotenv";
import logger from "../utils/logger.js";
import handler from "../utils/handler.js";
dotenv.config({ path: "../../.env" });
let port = process.env.PORT || 3000;

let limit = expressLimit({
  windowMs: 60 * 1000,
  max: 60,
  message: "Limit reached, kindly wait..",
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

handler(
  app.listen(port, () => {
    console.log(`http://localhost:${port}`);
  })
);

// export default app;
