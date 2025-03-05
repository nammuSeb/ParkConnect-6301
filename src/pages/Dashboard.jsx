import { motion } from 'framer-motion';
import { FaCar, FaHistory, FaClock } from 'react-icons/fa';

const Dashboard = () => {
  const activeBookings = [
    {
      id: 1,
      location: "Place du Molard",
      startTime: "2024-03-20 14:00",
      duration: "2h",
      status: "active"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Tableau de bord
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center mb-4">
              <FaCar className="text-primary-600 text-xl mr-2" />
              <h2 className="text-xl font-semibold">Places actives</h2>
            </div>
            <p className="text-3xl font-bold text-gray-900">1</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center mb-4">
              <FaHistory className="text-primary-600 text-xl mr-2" />
              <h2 className="text-xl font-semibold">Réservations passées</h2>
            </div>
            <p className="text-3xl font-bold text-gray-900">12</p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-lg">
            <div className="flex items-center mb-4">
              <FaClock className="text-primary-600 text-xl mr-2" />
              <h2 className="text-xl font-semibold">Heures totales</h2>
            </div>
            <p className="text-3xl font-bold text-gray-900">48</p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Réservations actives</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Emplacement</th>
                  <th className="text-left py-3 px-4">Date</th>
                  <th className="text-left py-3 px-4">Durée</th>
                  <th className="text-left py-3 px-4">Statut</th>
                </tr>
              </thead>
              <tbody>
                {activeBookings.map((booking) => (
                  <tr key={booking.id} className="border-b">
                    <td className="py-3 px-4">{booking.location}</td>
                    <td className="py-3 px-4">{booking.startTime}</td>
                    <td className="py-3 px-4">{booking.duration}</td>
                    <td className="py-3 px-4">
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                        Actif
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Dashboard;