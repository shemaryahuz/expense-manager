import express from 'express';

import {
    deleteUser,
    getUser,
    getUsers,
    updateUser,
    updatePassword
} from '../controllers/usersController.js';
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get('/', authMiddleware, getUsers);
router.get('/me', authMiddleware, getUser);
router.put('/me', authMiddleware, updateUser);
router.put('/me/password', authMiddleware, updatePassword);
router.delete('/me', authMiddleware, deleteUser);

export default router;