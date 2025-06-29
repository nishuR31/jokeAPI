import express from "express";
import jokeRouter from "../routers/joke.router.js";

let jokeApiRoute=express.Router();

jokeApiRoute.use("/joke-api",jokeRouter)


export default jokeApiRoute;