import { Request, Response } from 'express';


import { gradeHistoriesCollection } from "../database";
import {GradeHistory, ValidateGradeHistory} from '../models/gradeHistory'
import { ObjectId} from 'mongodb';
import Joi from 'joi';

export const getGradeHistories =async  (req: Request, res: Response) => {


    try {

      const {filter} = req.query; 

      const filterObj = filter ? JSON.parse(filter as string) : {};

     const gradeHistories = (await gradeHistoriesCollection.find(filterObj).toArray()) as GradeHistory[];

    // const gradeHistories = (await gradeHistoriesCollection.find({"class_id": 1}).toArray()) as GradeHistory[];
     res.status(200).json(gradeHistories);
  
   } catch (error) {
  
    if (error instanceof Error)
    {
      console.log(`Error with get ${error.message}`)
    }

     res.status(500).send("oppss");
   }
  };