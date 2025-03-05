import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import { sendVerificationEmail } from '../utils/email';
import { RegisterDTO, LoginDTO } from '../types';

const prisma = new PrismaClient();

export const register = async (req: Request, res: Response) => {
  try {
    const userData: RegisterDTO = req.body;

    // Vérifier si l'email existe déjà
    const existingUser = await prisma.user.findUnique({
      where: { email: userData.email }
    });

    if (existingUser) {
      return res.status(400).json({ error: "Cet email est déjà utilisé" });
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(userData.password, 12);
    const verifyToken = uuidv4();

    // Créer l'utilisateur
    const user = await prisma.user.create({
      data: {
        email: userData.email,
        password: hashedPassword,
        firstName: userData.firstName,
        lastName: userData.lastName,
        phone: userData.phone,
        verifyToken
      }
    });

    // Envoyer l'email de vérification
    await sendVerificationEmail(user.email, verifyToken);

    res.status(201).json({
      message: "Inscription réussie. Veuillez vérifier votre email."
    });
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de l'inscription" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password }: LoginDTO = req.body;

    // Trouver l'utilisateur
    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return res.status(401).json({ error: "Email ou mot de passe incorrect" });
    }

    // Vérifier le mot de passe
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ error: "Email ou mot de passe incorrect" });
    }

    // Vérifier si l'email est vérifié
    if (!user.isVerified) {
      return res.status(401).json({ error: "Veuillez vérifier votre email" });
    }

    // Mettre à jour la dernière connexion
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLogin: new Date() }
    });

    // Générer le token JWT
    const token = jwt.sign(
      { userId: user.id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: '24h' }
    );

    res.json({
      token,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la connexion" });
  }
};

export const verifyEmail = async (req: Request, res: Response) => {
  try {
    const { token } = req.params;

    const user = await prisma.user.findUnique({
      where: { verifyToken: token }
    });

    if (!user) {
      return res.status(400).json({ error: "Token invalide" });
    }

    await prisma.user.update({
      where: { id: user.id },
      data: {
        isVerified: true,
        verifyToken: null
      }
    });

    res.json({ message: "Email vérifié avec succès" });
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la vérification" });
  }
};

export const requestPasswordReset = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const resetToken = uuidv4();

    const user = await prisma.user.findUnique({
      where: { email }
    });

    if (!user) {
      return res.status(404).json({ error: "Utilisateur non trouvé" });
    }

    await prisma.user.update({
      where: { id: user.id },
      data: { resetToken }
    });

    // TODO: Envoyer l'email de réinitialisation

    res.json({ message: "Instructions envoyées par email" });
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la demande" });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { token, newPassword } = req.body;

    const user = await prisma.user.findUnique({
      where: { resetToken: token }
    });

    if (!user) {
      return res.status(400).json({ error: "Token invalide" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 12);

    await prisma.user.update({
      where: { id: user.id },
      data: {
        password: hashedPassword,
        resetToken: null
      }
    });

    res.json({ message: "Mot de passe réinitialisé avec succès" });
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la réinitialisation" });
  }
};