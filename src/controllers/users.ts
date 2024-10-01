import { Request, Response } from 'express';


import { usersCollection } from "../database";
import {User} from '../models/user'
import { ObjectId} from 'mongodb';

export const getUsers =async  (req: Request, res: Response) => {
   
  try {
   const users = (await usersCollection.find({}).toArray()) as User[];
   res.status(200).json(users);

 } catch (error) {

  if (error instanceof Error)
  {
    console.log(`Error with get ${error.message}`)
  }
   res.status(500).send("oppss");
 }
};


export const getUserById = async (req: Request, res: Response) => {
  //get a single  user by ID from the database
  
  let id:string = req.params.id;
  try {
    const query = { _id: new ObjectId(id) };
    const user = (await usersCollection.findOne(query)) as User;

    if (user) {
        res.status(200).send(user);
    }
} catch (error) {
  if (error instanceof Error)
  {
    console.log(`issue with getting a single user ${error.message}`)
  }
  else{
    console.log(`issue with getting a single user ${error}`)
  }

    res.status(404).send(`Unable to find matching document with id: ${req.params.id}`);
}
};

export const createUser = async (req: Request, res: Response) => {
  // create a new user in the database
  try {
    const newUser = req.body as User;
    console.table(newUser);

    const result = await usersCollection.insertOne(newUser)

    if (result) {
        res.status(201)
        .location(`${result.insertedId}`)
        .json({message : 
          `Created a new user with id ${result.insertedId}`})}
        else {
        res.status(500).send("Failed to create a new user.");
        }
    }
   catch (error) {
    if (error instanceof Error)
    {
     console.log(`issue with inserting ${error.message}`);
    }
    else{
      console.log(`error with ${error}`)
    }
    res.status(400).send(`Unable to create new user`);
}
};


export const updateUser = async (req: Request, res: Response) => {
  // update a user in the database

  console.log(req.body); //for now just log the data

  let id:string = req.params.id;
 

  const newData = req.body;

  try {

    const query = { _id: new ObjectId(id) };
    const result = await usersCollection.updateOne(query, {$set : newData});

    if (result.modifiedCount > 0) {
      res.status(200).json({message : `Updated User`})}
    else if (result.matchedCount = 0){
      res.status(400).json({message: `Failed to update user.`});
      }
      else 
      {
        res.status(404).json({"Message" : `${id} not found `});
      }
  }
  catch (error) {
    if (error instanceof Error)
    {
      console.log(`eror with ${error.message}`);
    }
    else {
      console.error(error);
    }
    res.status(400).send(`Unable to update user ${req.params.id}`);
}
};


export const deleteUser = async (req: Request, res: Response) => { 
  
  let id:string = req.params.id;
  try {
    const query = { _id: new ObjectId(id) };
    const result = await usersCollection.deleteOne(query);

    if (result && result.deletedCount) {
        res.status(202).json({message :`Successfully removed user with id ${id}`});
    } else if (!result) {
        res.status(400).json({message: `Failed to remove user with id ${id}`});
    } else if (!result.deletedCount) {
        res.status(404).json({message: `no user fround with id ${id}`});
    }
} catch (error) {
  if (error instanceof Error)
   console.error(`eror with ${error.message}`);
   else {
    console.error(error);
  }
  res.status(400).send(`Unable to delete user ${req.params.id}`);
}
};
