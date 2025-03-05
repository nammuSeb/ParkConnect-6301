import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaClock, FaCalendar, FaCreditCard } from 'react-icons/fa';

const Booking = () => {
  const { id } = useParams();
  const [bookingDetails, setBookingDetails] = useState({
    startTime: '',
    duration: '1h',
    vehicleType: 'car'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement booking logic
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-xl shadow-lg p-6"
      >
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          Réserver votre place
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date et heure d'arrivée
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <FaCalendar className="text-gray-400" />
                </div>
                <input
                  type="datetime-local"
                  className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  value={bookingDetails.startTime}
                  onChange={(e) => setBookingDetails({...bookingDetails, startTime: e.target.value})}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Durée
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                  <FaClock className="text-gray-400" />
                </div>
                <select
                  className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  value={bookingDetails.duration}
                  onChange={(e) => setBookingDetails({...bookingDetails, duration: e.target.value})}
                >
                  <option value="1h">1 heure</option>
                  <option value="2h">2 heures</option>
                  <option value="4h">4 heures</option>
                  <option value="day">Journée</option>
                  <option value="week">Semaine</option>
                  <option value="month">Mois</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Type de véhicule
              </label>
              <select
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                value={bookingDetails.vehicleType}
                onChange={(e) => setBookingDetails({...bookingDetails, vehicleType: e.target.value})}
              >
                <option value="car">Voiture</option>
                <option value="van">Camionnette</option>
                <option value="truck">Camion</option>
              </select>
            </div>
          </div>

          <div className="pt-4">
            <button
              type="submit"
              className="w-full flex items-center justify-center px-8 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition duration-300"
            >
              <FaCreditCard className="mr-2" />
              Procéder au paiement
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default Booking;