import express, { Request, Response } from "express";
import mongoose from "mongoose";

import { User } from "./dataBase/User.model";
import {IUser} from "./types/user.types";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/welcome", (req: Request, res: Response) => {
  res.send("WELCOME!!!");
});

app.get("/users", async (req: Request, res: Response): Promise<Response<IUser[]>> => {
  const users = await User.find();

  return res.json(users);
});

app.get("/users/:userId", async (req: Request, res: Response): Promise<Response<IUser>> => {
  const { userId } = req.params;
  const user = await User.findById(userId)

  if (!user) {
    res.status(422).json(`User with id: ${userId} not found`);
  }

  return res.json(user);
});

app.post("/users", async (req: Request, res: Response): Promise<Response<IUser>> => {
  const body = req.body;
  const user = await User.create(body)

  return res.status(201).json({ data: user });
});

app.put("/users/:userId", async (req: Request, res: Response): Promise<Response<IUser>> => {
  const { userId } = req.params;
  const user = req.body;

  const updateUserById = await User.updateOne({_id: userId}, user)

  return res.status(201).json({
    message: 'User updated',
    data: updateUserById
  });
});

app.delete("/users/:userId", async (req: Request, res: Response) => {
  const { userId } = req.params;

  await User.deleteOne({_id: userId})

  res.sendStatus(204);
});

const PORT = 5100;

app.listen(PORT, () => {
  mongoose.connect('mongodb://127.0.0.1:27017/test')
  console.log(`Server has started on PORT ${PORT} :)`);
});
