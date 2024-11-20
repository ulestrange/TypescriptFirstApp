import express, {Router} from 'express';
import { handleLogin } from '../controllers/auth';

const router: Router = express.Router();


router.post('/',  handleLogin);


export default router;