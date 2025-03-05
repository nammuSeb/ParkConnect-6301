import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import Stripe from 'stripe';
import QRCode from 'qrcode';
import { CreateBookingDTO } from '../types';

const prisma = new PrismaClient();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const createBooking = async (req: Request, res: Response) => {
  try {
    const bookingData: CreateBookingDTO = req.body;
    const userId = req.user!.id;

    // Vérifier la disponibilité
    const isAvailable = await checkAvailability(
      bookingData.parkingSpotId,
      bookingData.startTime,
      bookingData.endTime
    );

    if (!isAvailable) {
      return res.status(400).json({ error: "Créneau non disponible" });
    }

    // Calculer le prix
    const amount = await calculatePrice(
      bookingData.parkingSpotId,
      bookingData.startTime,
      bookingData.endTime
    );

    // Créer la session de paiement Stripe
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [{
        price_data: {
          currency: 'chf',
          product_data: {
            name: 'Réservation de parking',
          },
          unit_amount: Math.round(amount * 100),
        },
        quantity: 1,
      }],
      mode: 'payment',
      success_url: `${process.env.FRONTEND_URL}/booking/success/{CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/booking/cancel`,
    });

    // Créer la réservation
    const booking = await prisma.booking.create({
      data: {
        userId,
        parkingSpotId: bookingData.parkingSpotId,
        startTime: bookingData.startTime,
        endTime: bookingData.endTime,
        amount,
        status: 'PENDING',
        paymentId: session.id,
      },
    });

    // Générer le QR code
    const qrCode = await QRCode.toDataURL(booking.id);

    await prisma.booking.update({
      where: { id: booking.id },
      data: { qrCode },
    });

    res.json({ sessionId: session.id, bookingId: booking.id });
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la création de la réservation" });
  }
};

const checkAvailability = async (
  parkingSpotId: string,
  startTime: Date,
  endTime: Date
): Promise<boolean> => {
  const conflictingBooking = await prisma.booking.findFirst({
    where: {
      parkingSpotId,
      status: 'CONFIRMED',
      OR: [
        {
          AND: [
            { startTime: { lte: startTime } },
            { endTime: { gt: startTime } },
          ],
        },
        {
          AND: [
            { startTime: { lt: endTime } },
            { endTime: { gte: endTime } },
          ],
        },
      ],
    },
  });

  return !conflictingBooking;
};

const calculatePrice = async (
  parkingSpotId: string,
  startTime: Date,
  endTime: Date
): Promise<number> => {
  const spot = await prisma.parkingSpot.findUnique({
    where: { id: parkingSpotId },
  });

  if (!spot) throw new Error("Place de parking non trouvée");

  const hours = Math.ceil((endTime.getTime() - startTime.getTime()) / (1000 * 60 * 60));
  
  if (hours <= 24) {
    return hours * spot.hourlyRate;
  } else if (hours <= 168) { // 7 days
    return Math.ceil(hours / 24) * spot.dailyRate;
  } else {
    return Math.ceil(hours / 720) * spot.monthlyRate; // 720 hours = 30 days
  }
};