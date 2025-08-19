import { ObjectId } from "mongodb";

export interface IAreas {
  _id: ObjectId;
  color: string;
  createdAt: Date;
  description: string;
  name: string;
  type: string;
  updatedAt: Date;
}
