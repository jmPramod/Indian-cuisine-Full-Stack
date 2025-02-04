import express from "express";
import { envFiles } from "./helper/helper";
import cors from "cors";
import morgan from "morgan";
import swaggerUI from "swagger-ui-express";
import * as swaggerDocument from "../src/config/swagger.json";
import { connectMongooseDB } from "./config/db.connect";
import { errorHandler } from "./middlewears/global.middlewear";
import { authRoute } from "./routes/auth.routes";
import cookies from 'cookie-parser'
import { foodRoute } from "./routes/food.routes";
import dotenv from "dotenv";
dotenv.config();
const app = express();
// envFiles();
const runServer = async () => {
  //--------------- middlewear--------------------
  app.use(cors({ origin: "*", credentials: true })); // cors middlewear
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(morgan("dev"));
  app.use(cookies());
  app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument)); // swagger API documentation
  app.use("/", authRoute);
  app.use("/", foodRoute);
  app.use(errorHandler); // global error middlewear
  connectMongooseDB(); // connect MongoDB
};

export { runServer, app };
