import { v4 as uuidv4 } from 'uuid';
import pool from '../config/database.js';

class ParkingService {
  async findNearbySpots(latitude, longitude, radius) {
    const connection = await pool.getConnection();
    try {
      const [spots] = await connection.query(
        `SELECT *,
         (6371 * acos(
           cos(radians(?)) * cos(radians(latitude)) *
           cos(radians(longitude) - radians(?)) +
           sin(radians(?)) * sin(radians(latitude))
         )) AS distance
         FROM parking_spots
         WHERE status = 'AVAILABLE'
         HAVING distance < ?
         ORDER BY distance
         LIMIT 10`,
        [latitude, longitude, latitude, radius]
      );

      return spots;
    } finally {
      connection.release();
    }
  }

  async getSpotDetails(spotId) {
    const connection = await pool.getConnection();
    try {
      const [spots] = await connection.query(
        'SELECT * FROM parking_spots WHERE id = ?',
        [spotId]
      );

      if (spots.length === 0) {
        throw new Error('Parking spot not found');
      }

      return spots[0];
    } finally {
      connection.release();
    }
  }

  async checkAvailability(spotId, startTime, endTime) {
    const connection = await pool.getConnection();
    try {
      const [bookings] = await connection.query(
        `SELECT id FROM bookings
         WHERE parkingSpotId = ?
         AND status = 'CONFIRMED'
         AND ((startTime <= ? AND endTime > ?)
         OR (startTime < ? AND endTime >= ?))`,
        [spotId, startTime, startTime, endTime, endTime]
      );

      return bookings.length === 0;
    } finally {
      connection.release();
    }
  }
}

export default new ParkingService();