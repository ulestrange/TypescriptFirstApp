import { ObjectId } from "mongodb";
import Joi from 'joi';

export interface GradeHistory {
    id?: ObjectId;
    student_id: number;  // Integer student ID
    class_id: number;    // Integer class ID
    scores: Score[];     // Array of scores
}

interface Score {
    type: 'exam' | 'quiz' | 'homework';  
    score: number;  
}


    
export const ValidateGradeHistory = (gradeHistory : GradeHistory) => {

    const scoreSchema = Joi.object({
        type: Joi.string().valid('exam', 'quiz', 'homework').required(),  // Only allow 'exam', 'quiz', or 'homework'
        score: Joi.number().required().min(0).max(100)  
    });

    const gradeHistorySchema = Joi.object({
        _id: Joi.object({
            $oid: Joi.string()
        }).required(),
        student_id: Joi.number().integer().required(),  
        class_id: Joi.number().integer().required(),    
        scores: Joi.array().items(scoreSchema).min(1).required()  
    });

    return gradeHistorySchema.validate(gradeHistory);
}