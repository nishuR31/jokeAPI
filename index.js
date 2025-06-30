import express from "express";
import { configDotenv } from "dotenv";
import favicon from "serve-favicon";
import path from "path";
import url from "url";

import app from "./src/config/app.js";
import connectDB from "./src/config/mongoDB.js";

configDotenv({ path: "./.env" });

const port = process.env.PORT || 4000;
const mongoUri = process.env.MONGO_URI;

// ✅ Serve static files (important)
app.use(express.static(path.join(path.dirname(url.fileURLToPath(import.meta.url)), "public")));

// ✅ Set favicon (must exist at /public/favicon.ico)
app.use(favicon(path.join(path.dirname(url.fileURLToPath(import.meta.url)), "public", "favicon.ico")));

async function fireUp() {
  await connectDB(mongoUri);
  app.listen(port, () => {
    console.log(`🚀 Server is live at: http://localhost:${port}`);
  });
}

fireUp();
