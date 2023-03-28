import { Types } from "mongoose";

export interface ICar {
  _id?: Types.ObjectId;
  brand: string;
  model: string;
  year: number;
}
