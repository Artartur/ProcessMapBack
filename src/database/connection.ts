import 'dotenv/config';
import { MongoClient, Db } from "mongodb";

class DatabaseConnection {
  DB_NAME = process.env.DB_NAME;
  URI = process.env.URI;

  private db: Db | null = null;
  private client: MongoClient;

  constructor() {
    this.client = new MongoClient(this.URI as string);
  }

  async connect(): Promise<void> {
    try {
      await this.client.connect();

      this.db = this.client.db(this.DB_NAME);
      console.log('MongoDb connected');
    } catch (error) {
      console.log('Error: ', error);
      throw error;
    }
  }

  getDb(): Db {
    if (!this.db) {
      throw new Error("Bd hasn't been initialized");
    }

    return this.db;
  }

  async close(): Promise<void> {
    if (this.client) {
      await this.client.close();
    }
  }
}

export const database = new DatabaseConnection();
