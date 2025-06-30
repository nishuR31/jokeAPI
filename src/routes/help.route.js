import express from "express";
import asyncHandler from "../utils/asyncHandler.js";
import codes from "../constants/statusCodes.js";
import help from "../routes/help.router.js";


let helpRoute = express.Router();
helpRoute.get(
  "/",help
);

export default helpRoute;
