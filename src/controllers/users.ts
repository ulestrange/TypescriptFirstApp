import { Request, Response } from 'express';
import User from '../models/user'
import { collections } from "../services/database.service";

export const getUsers =async  (req: Request, res: Response) => {
    //to do: get all users from the database
    try {
       const users = (await collections.users?.find({}).toArray()) as User[];

       res.status(200).json(users);

   } catch (error) {
       res.status(500).send("oppss");
   }
};

export const getUserById = (req: Request, res: Response) => {
  // get a single  user by ID from the database
  let id:string = req.params.id;
  res.json({"message": `get a user ${id} received`})
};

export const createUser = async (req: Request, res: Response) => {
  // create a new user in the database


  try {
    const newUser = req.body as User;
    console.table(newUser);

    if(collections.users)
    {
      console.log("we have a collection")
    }
    else{
      console.log("we have no collection")
    }

    const result = await collections.users?.insertOne(newUser)

    if (result) {
        res.status(201).json(result)}
        else {
        res.status(500).send("Failed to create a new user.");
        }
    }
   catch (error ) {
    console.error(error);
    res.status(400).send("Unable to create new user");
}
};

export const updateUser = (req: Request, res: Response) => {
  // update a user in the database

  console.log(req.body); //for now just log the data

  res.json({"message": `update user ${req.params.id} with data from the post message`})
};

export const deleteUser = (req: Request, res: Response) => {
  // logic to delete user by ID from the database

  res.json({"message": `delete user ${req.params.id} from the database`}).status(201)
};