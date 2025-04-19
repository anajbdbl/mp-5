import { db } from "./mongo";

export async function findAlias(alias: string) {
  return db.collection("urls").findOne({ alias });
}

export async function createAlias(alias: string, url: string) {
  return db.collection("urls").insertOne({ alias, url });
}
