import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaClock, FaParking, FaWheelchair } from 'react-icons/fa';

const ParkingSpot = () => {
  const { id } = useParams();

  const spotDetails = {
    name: "Place du Molard P12",
    address: "Place du Molard, 1204 Genève",
    type: "Extérieur",
    accessibility: true,
    availableHours: "24/7",
    pricing: {
      hourly: "3 CHF",
      daily: "25 CHF",
      monthly: "400 CHF"
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-xl shadow-lg overflow-hidden"
      >
        <div className="h-48 bg-gray-200">
          {/* Image placeholder */}
          <div className="h-full flex items-center justify-center text-gray-500">
            Photo de l'emplacement
          </div>
        </div>

        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            {spotDetails.name}
          </h1>

          <div className="space-y-4">
            <div className="flex items-center">
              <FaMapMarkerAlt className="text-primary-600 mr-2" />
              <span>{spotDetails.address}</span>
            </div>

            <div className="flex items-center">
              <FaParking className="text-primary-600 mr-2" />
              <span>{spotDetails.type}</span>
            </div>

            <div className="flex items-center">
              <FaClock className="text-primary-600 mr-2" />
              <span>{spotDetails.availableHours}</span>
            </div>

            {spotDetails.accessibility && (
              <div className="flex items-center">
                <FaWheelchair className="text-primary-600 mr-2" />
                <span>Accessible PMR</span>
              </div>
            )}

            <div className="border-t pt-4 mt-4">
              <h2 className="text-lg font-semibold mb-2">Tarifs</h2>
              <div className="grid grid-cols-3 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Heure</p>
                  <p className="font-semibold">{spotDetails.pricing.hourly}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Jour</p>
                  <p className="font-semibold">{spotDetails.pricing.daily}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Mois</p>
                  <p className="font-semibold">{spotDetails.pricing.monthly}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6">
            <button className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 transition duration-300">
              Réserver cette place
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ParkingSpot;