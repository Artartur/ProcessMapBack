import { ObjectId } from "mongodb";
import { BaseRepository } from "./baseRepository";
import { ISubProcesses } from "../types/subProcesses.interface";

export class SubProcessRepository extends BaseRepository<ISubProcesses> {
  protected collectionName = 'SubProcesses'

  public async findAll(): Promise<ISubProcesses[]> {
    return await this.getCollection().find({}).toArray();
  }

  public async findById(id: string): Promise<ISubProcesses | null> {
    return await this.getCollection().findOne({ _id: new ObjectId(id) });
  }

  public async findByName(name: string): Promise<ISubProcesses | null> {
    return await this.getCollection().findOne({ name: name });
  }

  public async create(process: Omit<ISubProcesses, '_id'>): Promise<ISubProcesses> {
    const newProcess = {
      ...process,
      createdAt: new Date()
    };

    const result = await this.getCollection().insertOne(newProcess as ISubProcesses);
    return { ...newProcess, _id: result.insertedId } as ISubProcesses;
  }

  public async update(id: string, area: Partial<ISubProcesses>): Promise<ISubProcesses | null> {
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
