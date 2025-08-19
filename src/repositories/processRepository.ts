import { BaseRepository } from "./baseRepository";
import { IProcesses } from "../types/processes.interface";
import { ObjectId } from "mongodb";

export class ProcessRepository extends BaseRepository<IProcesses> {
  protected collectionName = 'Processes'

  public async findAll(): Promise<IProcesses[]> {
    return await this.getCollection().find({}).toArray();
  }

  public async findById(id: string): Promise<IProcesses | null> {
    return await this.getCollection().findOne({ _id: new ObjectId(id) });
  }

  public async findByName(name: string): Promise<IProcesses | null> {
    return await this.getCollection().findOne({ name: name });
  }

  public async create(process: Omit<IProcesses, '_id'>): Promise<IProcesses> {
    const newProcess = {
      ...process,
      createdAt: new Date()
    };

    const result = await this.getCollection().insertOne(newProcess as IProcesses);
    return { ...newProcess, _id: result.insertedId } as IProcesses;
  }

  public async update(id: string, area: Partial<IProcesses>): Promise<IProcesses | null> {
    const result = await this.getCollection()
      .findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: { ...area, updatedAt: new Date() } },
        {
          returnDocument: 'after',
          upsert: false
        }
      );

    return result || null;
  }

  public async delete(id: string): Promise<boolean> {
    const result = await this.getCollection().deleteOne({ _id: new ObjectId(id) });
    return result.deletedCount === 1;
  }
}
