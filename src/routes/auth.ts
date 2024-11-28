import express, {Router} from 'express';
import { handleLogin , handleRefresh, handleLogout} from '../controllers/auth';

const router: Router = express.Router();


router.post('/',  handleLogin);

router.post('/refresh', handleRefresh)

router.get('/logout', handleLogout)
export default router;