import { Collection, Db, MongoClient } from "mongodb";
import { Short } from "@/type";

const MONGO_URI = process.env.MONGO_URI as string;

if (!MONGO_URI) {
  throw new Error("MONGO_URI is not defined");
}

const DB_NAME = "mp5-db"; 
export const URLS_COLLECTION = "urls";

let client: MongoClient | null = null;
let db: Db | null = null;

async function connect(): Promise<Db> {
  if (!client) {
    client = new MongoClient(MONGO_URI);
    await client.connect();
  }

  return client.db(DB_NAME);
}

export default async function getCollection(
  collectionName: string
): Promise<Collection> {
  if (!db) {
    db = await connect();
  }

  return db.collection(collectionName);
}

export async function createAlias(alias: string, url: string): Promise<Short | null> {
  const collection = await getCollection(URLS_COLLECTION);

  const exists = await collection.findOne({ alias });
  if (exists) return null;

  try {
      new URL(url); 
  } catch {
      return null;
  }

  const res = await fetch(url).catch(() => null);
  if (!res || !res.ok) {
      return null;
  }

  await collection.insertOne({ alias, url });
  return {
      success: true,
      alias,
      url,
  };
}

export async function findAlias(alias: string): Promise<string | null> {
  const collection = await getCollection(URLS_COLLECTION);
  const result = await collection.findOne({ alias });
  return result?.url || null;
}