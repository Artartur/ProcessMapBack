import { ObjectId } from "mongodb";

export interface ISubProcesses {
  _id: ObjectId,
  createdAt: Date,
  name: string,
  processId: ObjectId,
  type: string,
  updatedAt: Date
}
