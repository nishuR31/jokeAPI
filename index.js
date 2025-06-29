import { configDotenv } from "dotenv";
configDotenv({ path: "./.env" });
import app from "./src/config/app.js";
import connectDB from "./src/config/mongoDB.js";

const port = process.env.PORT || 4000;
const mongoUri = process.env.MONGO_URI;

async function fireUp() {
  await connectDB(mongoUri);

  app.listen(port, () => {
    console.log(`🚀 Server is live at: http://localhost:${port}`);
  });
}

fireUp();
