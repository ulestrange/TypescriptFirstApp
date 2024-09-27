import express, {Router} from 'express';
import {
  getBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
} from '../controllers/books';

import { authenticateKey } from '../middleware/auth.middleware';

const router: Router = express.Router();

router.get('/', getBooks);
router.get('/:id',  getBookById);
router.post('/',  createBook);
router.put('/:id', updateBook);
router.delete('/:id', deleteBook);

export default router;