/* external imports */

import express, { Application, Request, Response } from "express";

import morgan from "morgan";
import cors from "cors";

import dotenv from "dotenv";

import { Db } from "mongodb";

dotenv.config();

/* internal imports */

import userRoutes from "./routes/users";
import gradeHistoriesRoutes from "./routes/gradeHistories";

import { authenticateKey } from "./middleware/auth.middleware";

const PORT = process.env.PORT || 3006;

const app: Application = express();

app.use(morgan("tiny"));
app.use(express.json());

// const corsOptions = {
//   origin: ['http://localhost:4200'],
//   optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
// }

const corsOptions = {};
//app.use(cors<Request>(corsOptions)); // this is too braod need to narrow

app.use(cors());

//app.use(authenticateKey); // all the routes below

app.get("/ping", async (_req: Request, res: Response) => {
  res.json({
    message: "hello from Una - has this changed",
  });
});

app.get("/bananas", async (_req: Request, res: Response) => {
  res.send("hello world, this is bananas - ha ha ha ha hda ha ");
});

app.use("/api/v1/users", userRoutes);
app.use("/api/v1/gradeHistories", gradeHistoriesRoutes);

app.listen(PORT, () => {
  console.log("Server is running on port ready for deploy 1 --", PORT);
});
