import express from 'express';
import { deleteUser, getUser, getUsers, updateUser, updateUserPassword } from '../controllers/usersController.js';
import { authMiddleware } from "../middlewares/authMiddleware.js";


const router = express.Router();

router.get('/', authMiddleware, getUsers);
router.get('/me', authMiddleware, getUser);
router.put('/me', authMiddleware, updateUser);
router.put('/me/password', authMiddleware, updateUserPassword);
router.delete('/me', authMiddleware, deleteUser);

export default router;