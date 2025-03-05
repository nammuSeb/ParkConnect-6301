import { Router } from 'express';
import authRoutes from './auth.js';
import parkingRoutes from './parking.js';
import bookingRoutes from './booking.js';
import userRoutes from './user.js';
import { authenticateUser } from '../middleware/auth.js';

const router = Router();

router.use('/auth', authRoutes);
router.use('/parking', parkingRoutes);
router.use('/booking', authenticateUser, bookingRoutes);
router.use('/user', authenticateUser, userRoutes);

export default router;