import { Request, Response } from 'express';


import { booksCollection } from "../database";
import {Book} from '../models/book'
import { ObjectId} from 'mongodb';

import joi  from 'joi'

export const getBooks =async  (req: Request, res: Response) => {
   
  try {
   const books = (await booksCollection.find().toArray()) ;

   console.log(books[0].publishedDate.getFullYear());
   res.status(200).json(books);

 } catch (error) {
  if (error instanceof Error)
  {
   console.log(`issue with getting  ${error.message}`);
  }
  else{
    console.log(`error with ${error}`)
  }
   res.status(500).send("oppss");
 }
};


export const getBookById = async (req: Request, res: Response) => {
  //get a single  book by ID from the database
  
  let id:string = req.params.id;
  try {
    const query = { _id: new ObjectId(id) };
    const book = (await booksCollection.findOne(query)) as Book;

    if (book) {
        res.status(200).send(book);
    }
} catch (error) {
  if (error instanceof Error)
  {
    console.log(`Issue with getting one book ${error.message}`);
  }
  else{
    console.log(`error with ${error}`)
  }
  
    res.status(404).send(`Unable to find matching document with id: ${req.params.id}`);
}
};

export const createBook = async (req: Request, res: Response) => {
  
//  let validateResult : joi.ValidationResult = ValidateBook(req.body)

//  if (validateResult.error) {
//    res.status(400).json(validateResult.error);
//    return;
//  }

  const newBook = req.body as Book;
 // newBook.dateJoined = new Date();

  newBook.publishedDate = new Date(req.body.publishedDate);
  try {
    
    console.table(newBook);

    const result = await booksCollection.insertOne(newBook)

    if (result) {
        res.status(201)
        .location(`${result.insertedId}`)
        .json({message : 
          `Created a new book with id ${result.insertedId}`})}
        else {
        res.status(500).send("Failed to create a new book.");
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
    res.status(400).send(`Unable to create new book`);
}
};


export const updateBook = async (req: Request, res: Response) => {
  // update a book in the database

  console.log(req.body); //for now just log the data

  let id:string = req.params.id;
 

  const newData = req.body;

  try {

    const query = { _id: new ObjectId(id) };
    const result = await booksCollection.updateOne(query, {$set : newData});

    if (result) {
      res.status(200).json({message : `Updated Book`})}
      else {
      res.status(400).json({message: `Failed to update book.`});
      }
  }
  catch (error) {
    if (error instanceof Error)
    {
     console.log(`issue with updaing  ${error.message}`);
    }
    else{
      console.log(`error with ${error}`)
    }
    res.status(400).send(`Unable to update book`);
}
};


export const deleteBook = async (req: Request, res: Response) => { 
  
  let id:string = req.params.id;
  try {
    const query = { _id: new ObjectId(id) };
    const result = await booksCollection.deleteOne(query);

    if (result && result.deletedCount) {
        res.status(202).json({message :`Successfully removed book with id ${id}`});
    } else if (!result) {
        res.status(400).json({message: `Failed to remove book with id ${id}`});
    } else if (!result.deletedCount) {
        res.status(404).json({message: `no book fround with id ${id}`});
    }
} catch (error) {
    if (error instanceof Error)
    {
     console.log(`issue with deleting ${error.message}`);
    }
    else{
      console.log(`error with ${error}`)
    }
    res.status(400).send(`Unable to delete`);
}
};