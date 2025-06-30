import express from "express";

import help from "../controllers/help.js";


let helpRoute = express.Router();
helpRoute.get("/help",help);

export default helpRoute;
