import express from 'express';
import { getAll, getOne, create, update, deleteOne } from './controllers/book';

const router = express.Router();

router.get('/api/book', getAll);
router.get('/api/book/:id', getOne);
router.post('/api/book', create);
router.put('/api/book/:id', update);
router.delete('/api/book/:id', deleteOne);

export default router;
