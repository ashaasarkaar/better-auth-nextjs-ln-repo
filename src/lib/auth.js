import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.AUTH_DB_URI);
const db = client.db();



export const auth = betterAuth({
   emailAndPassword: { 
    enabled: true, 
  }, 

  // database: mongodbAdapter(client.db(), { client }),

    database: mongodbAdapter(db, {
    client,
  }),
  //...
});