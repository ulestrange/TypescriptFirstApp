import express, {Router} from 'express';
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from '../controllers/users';

import { authenticateKey, validJWTProvided } from '../middleware/auth.middleware';

const router: Router = express.Router();

router.get('/', getUsers);
router.get('/:id',  getUserById);
router.post('/',  createUser);
router.put('/:id', updateUser);
router.delete('/:id', validJWTProvided, deleteUser);

export default router;