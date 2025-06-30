import mongoose from "mongoose";
import required from "../utils/required.js";

const allowedTags = ["nsfw", "sfw", "dad", "knock-knock","incest"];

const jokeSchema = new mongoose.Schema(
  {
    joke: {
      type: String,
      required: [true, required("joke")],
      trim: true,
      unique: true,
    },
    tags: {
      type: [String],
      enum: allowedTags,
      required: [true, required("tags of joke")],
      default: ["sfw"],
      validate: {
        validator: function (arr) {
          return arr.length > 0 && arr.every(tag => allowedTags.includes(tag));
        },
        message: props => `Tags are invalid: ${props.value}. Allowed tags are: ${allowedTags.join(", ")}`,
      },
    },
    rating: {
      type: Number,
      min: [0, "Rating must be at least 0"],
      max: [10, "Rating cannot exceed 10"],
      required: [true, required("rating")],
      default: 0,
      validate: {
        validator: Number.isInteger,
        message: "Rating must be an integer",
      },
    },
  },
  { timestamps: true }
);


let Joke=mongoose.model("Joke", jokeSchema);
export default Joke;
