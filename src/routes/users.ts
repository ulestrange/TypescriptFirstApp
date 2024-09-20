import express, {Router} from 'express';
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from '../controllers/users';

import { authenticateKey } from '../middleware/auth';

const router: Router = express.Router();

router.get('/', getUsers);
router.get('/:id', authenticateKey,  getUserById);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;