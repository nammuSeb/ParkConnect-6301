import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { createNotification } from './notificationController';

const prisma = new PrismaClient();

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;
    const { firstName, lastName, email, phone } = req.body;

    // Vérifier si l'email existe déjà
    if (email !== req.user!.email) {
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        return res.status(400).json({ error: "Cet email est déjà utilisé" });
      }
    }

    // Mettre à jour le profil
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        firstName,
        lastName,
        email,
        phone,
      },
    });

    // Créer une notification
    await createNotification(
      userId,
      'Profil mis à jour',
      'Vos informations de profil ont été mises à jour avec succès',
      'SUCCESS'
    );

    res.json({
      user: {
        id: updatedUser.id,
        email: updatedUser.email,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        phone: updatedUser.phone,
        role: updatedUser.role,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la mise à jour du profil" });
  }
};

export const changePassword = async (req: Request, res: Response) => {
  try {
    const userId = req.user!.id;
    const { currentPassword, newPassword } = req.body;

    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return res.status(404).json({ error: "Utilisateur non trouvé" });
    }

    const isValidPassword = await bcrypt.compare(currentPassword, user.password);
    if (!isValidPassword) {
      return res.status(400).json({ error: "Mot de passe actuel incorrect" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12);
    await prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });

    await createNotification(
      userId,
      'Mot de passe modifié',
      'Votre mot de passe a été modifié avec succès',
      'SUCCESS'
    );

    res.json({ message: "Mot de passe modifié avec succès" });
  } catch (error) {
    res.status(500).json({ error: "Erreur lors du changement de mot de passe" });
  }
};