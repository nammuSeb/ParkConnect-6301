import { Router } from 'express';
import * as authController from '../controllers/authController';
import { validateRegistration, validateLogin } from '../middleware/validation';

const router = Router();

router.post('/register', validateRegistration, authController.register);
router.post('/login', validateLogin, authController.login);
router.get('/verify-email/:token', authController.verifyEmail);
router.post('/forgot-password', authController.requestPasswordReset);
router.post('/reset-password', authController.resetPassword);

export default router;