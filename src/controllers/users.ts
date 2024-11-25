import { Request, Response } from 'express';


import { usersCollection } from "../database";
import {User, ValidateUser} from '../models/user'
import { ObjectId} from 'mongodb';
import Joi from 'joi';
import * as argon2 from 'argon2';

export const getUsers = async  (req: Request, res: Response) => {
   
  try {
   const users = (await usersCollection.find({})
   .project ({hashedPassword : 0}).
   toArray()) as User[];
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
    const user = await usersCollection.findOne(query, 
      { projection: { hashedPassword: 0 } }) as User;

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

    let validateResult : Joi.ValidationResult = ValidateUser(req.body)

    if (validateResult.error) {
      res.status(400).json(validateResult.error);
      return;
    }

    const existingUser = await usersCollection.findOne({email: req.body.email})

    if (existingUser) {
      res.status(400).json({"error": "existing email"});
      return;
    }

    /// note - missing a check to verify the email belongs to the user
   

    let newUser : User = 
    { 
      name: req.body.name ,
      email: req.body.email.toLowerCase(),
      phonenumber : req.body.phonenumber,
      dateJoined : new Date(),
      lastUpdated :new Date(),
    }

    newUser.hashedPassword = await argon2.hash(req.body.password)

    //console.log(newUser.hashedPassword)

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

 const {name, email, phonenumber } = req.body;

  let id:string = req.params.id;
 

  const newData: Partial<User> =
  {
    lastUpdated: new Date(),
  }

  if (name) newData.name = name;
  if(email) newData.email = email;
  if (phonenumber) newData.phonenumber = phonenumber;

  // still need to validate the data

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


