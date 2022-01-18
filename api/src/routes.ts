import { AuthController } from '@controllers/MessageController';
import { Router } from 'express';

const router = Router();

const authController = new AuthController();

router.use('/send', authController.send)

export { router };