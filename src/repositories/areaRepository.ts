import { BaseRepository } from "./baseRepository";
import { IAreas } from "../types/areas.interface";
import { ObjectId } from "mongodb";

export class AreaRepository extends BaseRepository<IAreas> {
  protected collectionName = 'Areas';

  public async findAll(): Promise<IAreas[]> {
    return await this.getCollection().find({}).toArray();
  }

  public async findById(id: string): Promise<IAreas | null> {
    return await this.getCollection().findOne({ _id: new ObjectId(id) });
  }

  public async findByName(name: string): Promise<IAreas | null> {
    return await this.getCollection().findOne({ name: name });
  }

  public async create(area: Omit<IAreas, '_id'>): Promise<IAreas> {
    const newArea = {
      ...area,
      createdAt: new Date()
    };

    const result = await this.getCollection().insertOne(newArea as IAreas);
    return { ...newArea, _id: result.insertedId } as IAreas;
  }

  public async update(id: string, area: Partial<IAreas>): Promise<IAreas | null> {
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
