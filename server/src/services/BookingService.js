import { v4 as uuidv4 } from 'uuid';
import pool from '../config/database.js';
import stripe from '../config/stripe.js';

class BookingService {
  async createBooking(userId, spotId, startTime, endTime, amount) {
    const connection = await pool.getConnection();
    try {
      const bookingId = uuidv4();
      
      // Créer la session de paiement Stripe
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'chf',
              product_data: {
                name: 'Réservation de parking',
              },
              unit_amount: Math.round(amount * 100),
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: `${process.env.FRONTEND_URL}/booking/success/${bookingId}`,
        cancel_url: `${process.env.FRONTEND_URL}/booking/cancel`,
      });

      // Créer la réservation
      await connection.query(
        `INSERT INTO bookings (id, userId, parkingSpotId, startTime, endTime, amount, paymentId)
         VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [bookingId, userId, spotId, startTime, endTime, amount, session.id]
      );

      return {
        bookingId,
        sessionId: session.id
      };
    } finally {
      connection.release();
    }
  }

  async confirmBooking(bookingId) {
    const connection = await pool.getConnection();
    try {
      await connection.query(
        'UPDATE bookings SET status = ? WHERE id = ?',
        ['CONFIRMED', bookingId]
      );

      // Mettre à jour le statut de la place
      const [booking] = await connection.query(
        'SELECT parkingSpotId FROM bookings WHERE id = ?',
        [bookingId]
      );

      await connection.query(
        'UPDATE parking_spots SET status = ? WHERE id = ?',
        ['OCCUPIED', booking[0].parkingSpotId]
      );

      return true;
    } finally {
      connection.release();
    }
  }
}

export default new BookingService();