import { ObjectId } from "mongodb";

export interface IProcesses {
  _id: ObjectId;
  areaId: ObjectId;
  createdAt: Date;
  documents: string;
  name: string;
  responsible: string;
  systems: string;
  tool: string;
  type: string;
  updatedAt: Date;
}
