import express, {Router} from 'express';
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from '../controllers/users';

import { authenticateKey } from '../middleware/auth.middleware';

const router: Router = express.Router();

router.get('/', getUsers);
router.get('/:id',  getUserById);
router.post('/', authenticateKey, createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

export default router;