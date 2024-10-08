import { Request, Response } from 'express';


import { gradeHistoriesCollection } from "../database";
import {GradeHistory, ValidateGradeHistory} from '../models/gradeHistory'
import { ObjectId} from 'mongodb';
import Joi from 'joi';

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

  export const getGradesForClass   = 
  async  (req: Request, res: Response) => {
    
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
    
      if (error instanceof Error)
      {
        console.log(`Error with getting data for a classID ${error.message}`)
      }
  
       res.status(500).send("oppss");
     }
    };
  
