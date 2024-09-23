import { MongoClient, Db, Collection}  from "mongodb";
import  dotenv from "dotenv";
import User from '../models/user'



dotenv.config();

const connectionString : string  = process.env.DB_CONN_STRING || "";
const dbName : string = process.env.DB_NAME || "";

const client = new MongoClient(connectionString);

export const collections: { users? : Collection<User> } = {}


export const connectToDatabase = async()  => {
    let db : Db | null = null;
    if (db) return db; // Return the cached instance if available 
    client.connect()
    .then(() => {
      db = client.db(dbName);
      const usersCollection: Collection<User> = db.collection('users');
      collections.users = usersCollection;
      console.log(`Connected to database: ${dbName}`);
    })
    .catch((error: Error) => {
        console.error("Database connection failed", error.message);
        process.exit();
    })

};


console.log('connectiong');

// MongoDB connection
client.connect().then(() => {
    console.log('Connected to MongoDB');
  }).catch(err => console.log(err));

    const db = client.db(dbName);


    
export default db;
       
       
