import { MongoClient, Db, Collection}  from "mongodb";
import  dotenv from "dotenv";
import User from '../models/user'


// export async function connectToDatabase()   {
//   dotenv.config();
//   const connectionString : string  = process.env.DB_CONN_STRING || "";
//   const dbName : string = process.env.DB_NAME || "Web2_2024";
//   const client = new MongoClient(connectionString);

//   try{
//   await client.connect();
//   }
//   catch (error : unknown)
//   {
//     if (error instanceof Error)
//     {
//      console.log(`issue connection ${error.message}`);
//     }
//     else{
//       console.log(`error with ${error}`)
//     }
//   }
//   console.log('after client.connect');

//   const db: Db = client.db(dbName);
//   return db;
// }



  dotenv.config();
  const connectionString : string  = process.env.DB_CONN_STRING || "";
  const dbName : string = process.env.DB_NAME || "Web2_2024";
  const client = new MongoClient(connectionString);

let db : Db 
  export let usersCollection : Collection<User>

  export const collections: { users?: Collection<User> } = {};

client.connect().then
(()=>
  {
  db = client.db(dbName);
  usersCollection  = db.collection('users');
  collections.users = usersCollection;
  console.log('Connected to database');
}
)
.catch ((error) => 
{
    if (error instanceof Error)
    {
     console.log(`issue with db connection ${error.message}`);
    }
    else{
      console.log(`error with ${error}`)
    }
  });


 




// // MongoDB connection
// client.connect().then(() => {
//   console.log('Connected to MongoDB');
// }).catch(err => console.log(err));

// // Set Database
// //const db = client.db(dbName)

// export default db
// export default database;


//     client.connect()
//     .then(() => {
//       db = client.db(dbName);
//       // const usersCollection: Collection<User> = db.collection('users');
//       // collections.users = usersCollection;
//       console.log(`Connected to database: ${dbName}`);
//       export db;
//     })
//     .catch((error: Error) => {
//         console.error("Database connection failed", error.message);
//         process.exit();
//     })




// console.log('connectiong');

// // MongoDB connection
// client.connect().then(() => {
//     console.log('Connected to MongoDB');
//   }).catch(err => console.log(err));

//     const db = client.db(dbName);


    
// export default db;
       
       
