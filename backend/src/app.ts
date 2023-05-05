import express, { NextFunction, Request, Response } from "express";
import mongoose from "mongoose";

import { configs } from "./configs";
import { authRouter, userRouter } from "./routers";
import { IError } from "./types";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRouter);
app.use("/auth", authRouter);

app.use((err: IError, req: Request, res: Response, next: NextFunction) => {
  const status = err.status;

  return res.status(status).json({
    message: err.message,
    status,
  });
});

const connectionDb = async () => {
  let dbCon = false;
  while (!dbCon) {
    try {
      console.log('Connecting to database...');
      mongoose.connect(configs.DB_URL).then();
      dbCon = true;
    } catch (e) {
      console.log('Database unavailable, wait 3 seconds');
      await new Promise(resolve => setTimeout(resolve, 3000));
    }
  }
}

const start = async () => {
  try {
    await connectionDb();
    await app.listen(configs.PORT, () => configs.HOST);
    console.log(`Server has started on PORT ${configs.PORT} :)`);
  } catch (e) {
    console.log(e);
  }
}

start();