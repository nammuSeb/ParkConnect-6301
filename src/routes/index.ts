// Ajoutez ces routes au fichier routes/index.ts existant
import * as userController from '../controllers/userController';
import * as notificationController from '../controllers/notificationController';

// Routes du profil utilisateur
router.put('/users/profile', authenticateUser, userController.updateProfile);
router.put('/users/change-password', authenticateUser, userController.changePassword);

// Routes des notifications
router.get('/notifications', authenticateUser, notificationController.getNotifications);
router.put('/notifications/:id/read', authenticateUser, notificationController.markNotificationAsRead);