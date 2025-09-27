import express from 'express';
import { loginController } from '../controllers/auth.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = express.Router();

router.route('/login').get(authMiddleware, loginController);

export default router;
