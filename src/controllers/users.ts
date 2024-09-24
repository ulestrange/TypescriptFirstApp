import { Request, Response } from 'express';


import { usersCollection } from "../database";
import User from '../models/user'
import { ObjectId} from 'mongodb';

export const getUsers =async  (req: Request, res: Response) => {
   
  try {
   const users = (await usersCollection.find({}).toArray()) as User[];
   res.status(200).json(users);

 } catch (error) {
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
    res.status(404).send(`Unable to find matching document with id: ${req.params.id}`);
}
};

export const createUser = async (req: Request, res: Response) => {
  // create a new user in the database
  try {
    const newUser = req.body as User;

    const result = await usersCollection.insertOne(newUser)

    if (result) {
        res.status(201).location(`${result.insertedId}`).json({message : `Created a new user with id ${result.insertedId}`})}
        else {
        res.status(500).send("Failed to create a new user.");
        }
    }
   catch (error) {
    console.error(error);
    res.status(400).send(`Unable to create new user`);
}
};


export const updateUser = (req: Request, res: Response) => {
  // update a user in the database

  console.log(req.body); //for now just log the data

  res.json({"message": `update user ${req.params.id} with data from the post message`})
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
    console.error(error);
    res.status(400).send(error);
}};