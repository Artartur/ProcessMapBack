import { Collection, Document } from "mongodb";
import { database } from "../database/connection";
import { IAreas } from "../types/areas.interface";

export abstract class BaseRepository<T extends Document> {
  protected collection: Collection<T> | null = null;
  protected abstract collectionName: string;

  protected getCollection(): Collection<T> {
    if (!this.collection) {
      const db = database.getDb();
      this.collection = db.collection<T>(this.collectionName);
    }
    return this.collection;
  }
}
