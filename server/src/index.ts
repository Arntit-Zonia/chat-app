import * as dotenv from "dotenv";
dotenv.config();

import httpServer from "./app";
import connectToDatabase from "./db/mongoose";

connectToDatabase();

const PORT = process.env.PORT || 3000;

httpServer.listen(PORT, () => {
  console.log(`Server started at http://localhost:${process.env.PORT}`);
});
