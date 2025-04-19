import { MongoClient } from "mongodb";

const uri = process.env.MONGO_URI!;
const client = new MongoClient(uri);

const db = client.db("shortener"); 

export async function findAlias(alias: string) {
  return db.collection("urls").findOne({ alias });
}

export async function createAlias(alias: string, url: string) {
  return db.collection("urls").insertOne({ alias, url });
}
