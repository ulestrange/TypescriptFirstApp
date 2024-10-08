import { Request, Response } from 'express';


import { gradeHistoriesCollection } from "../database";
import {GradeHistory, ValidateGradeHistory, ValidateScore} from '../models/gradeHistory'
import { ObjectId} from 'mongodb';
import Joi from 'joi';


export const createGradeHistory = async (req: Request, res: Response) =>{

let validateResult = ValidateGradeHistory(req.body)
if (validateResult.error) {
    res.status(400).json(validateResult.error);
    return;
  }

  const newGradeHistory = req.body as GradeHistory;

  try {
  const result = await gradeHistoriesCollection.insertOne(newGradeHistory)

  if (result) {
      res.status(201)
      .location(`${result.insertedId}`)
      .json({message : 
        `Created a new history with id ${result.insertedId}`})}
      else {
      res.status(500).send("Failed to create a new hisotry.");
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
  res.status(400).send(`Unable to create new history`);
}
};

export const updateGradeHistory = async (req: Request, res: Response) => {


  const newValue = req.body;

  let validateResult = ValidateScore(req.body)
   if (validateResult.error) {
    res.status(400).json(validateResult.error);
    return;
  }
  
  try {
  const query = { _id: new ObjectId(req.params.id) };
  const result = await gradeHistoriesCollection.updateOne(
   query,  // Find document by _id
    { $push: { scores: req.body } }  // Push the new value into the array
  )
  if (result.modifiedCount > 0) {
    res.status(200).json({message : `Updated Grades`})}
  else if (result.matchedCount = 0){
    res.status(400).json({message: `Failed to update grades.`});
    }
    else 
    {
      res.status(404).json({"Message" : `${req.params.id} not found `});
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



export const getGradeHistories =async  (req: Request, res: Response) => {
    try {
    const {filter} = req.query; 

    // If "page" and "pageSize" are not sent we will default them to 1 and 0 (no limit)

    const page = parseInt(req.query.page as string, 10) || 1;
    const pageSize = parseInt(req.query.pageSize as string, 0) || 0;


    const filterObj = filter ? JSON.parse(filter as string) : {};

     const gradeHistories = (await gradeHistoriesCollection
      .find(filterObj)
      .project({'student_id': 1, 'class_id' : 1, '_id' : 0})
      .sort({'class_id' : 1})
      .skip((page-1)*pageSize)
      .limit(pageSize)
      .toArray()) as GradeHistory[];

    //const gradeHistories = (await gradeHistoriesCollection.find({"class_id": 1}).toArray()) as GradeHistory[];
    
    res.status(200).json(gradeHistories);
  
   } catch (error) {
  
    if (error instanceof Error)
    {
      console.log(`Error with get ${error.message}`)
    }

     res.status(500).send("oppss");
   }
  };

  export const getGradesForClass=async(req: Request, res: Response) => {
   const filter: Partial<GradeHistory> = {}
   try {
     const classID = parseInt(req.params.id);
     filter.class_id = classID;
   }
   catch (error)
   {
    res.status(400).send("Incorrct classID parameter");
   }  
  try {     
       const gradeHistories = (await gradeHistoriesCollection
        .find(filter)
        .toArray()) as GradeHistory[];
      res.status(200).json(gradeHistories);   
     } catch (error) { 
      if (error instanceof Error) {
        console.log(`Error with getting data for a classID ${error.message}`)
      }
    res.status(500).send("oppss");
     }
    };

    export const getGradesForStudent   = 
  async  (req: Request, res: Response) => {
    
  const filter: Partial<GradeHistory> = {}

   try {
     const studentID = parseInt(req.params.id);
     filter.student_id = studentID;
   }
   catch (error)
   {
    res.status(400).send("Incorrct student ID parameter");
   }  
  try {
      
       const gradeHistories = (await gradeHistoriesCollection
        .find(filter)
        .toArray()) as GradeHistory[];

      res.status(200).json(gradeHistories);
    
     } catch (error) {
    
      if (error instanceof Error)
      {
        console.log(`Error with getting data for a student ID ${error.message}`)
      }
  
       res.status(500).send("oppss");
     }
    };
  
