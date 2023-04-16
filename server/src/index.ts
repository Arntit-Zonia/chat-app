import * as dotenv from "dotenv";
dotenv.config();

import httpServer from "./app";

httpServer.listen(process.env.PORT, () => {
  console.log(`Server started at http://localhost:${process.env.PORT}`);
});
