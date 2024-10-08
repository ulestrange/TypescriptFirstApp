import express, {Router} from 'express';
import {
  getGradeHistories,

} from '../controllers/gradeHistories';



const router: Router = express.Router();

router.get('/', getGradeHistories);


export default router;