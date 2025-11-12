import express from 'express';
import { addUser, deleteUser, getUser, getUsers } from '../controllers/usersController.js';

const router = express.Router();

router.get('/', getUsers);
router.get('/', getUser);
router.post('/', addUser);
router.delete('/:id', deleteUser);

export default router;