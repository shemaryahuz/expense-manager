import express from 'express';
import { deleteUser, getUser, getUsers } from '../controllers/usersController.js';
import { authMiddleware } from "../middlewares/authMiddleware.js";


const router = express.Router();

router.get('/', authMiddleware, getUsers);
router.get('/me', authMiddleware, getUser);
router.delete('/me', authMiddleware, deleteUser);

export default router;