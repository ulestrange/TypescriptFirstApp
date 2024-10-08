import express, {Router} from 'express';
import {
  getGradeHistories,
  getGradesForClass,

} from '../controllers/gradeHistories';



const router: Router = express.Router();

router.get('/', getGradeHistories);

router.get('/class/:id', getGradesForClass)


export default router;