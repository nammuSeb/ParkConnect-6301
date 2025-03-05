import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaLocationArrow, FaCrosshairs, FaParking } from 'react-icons/fa';
import useGeolocation from '../hooks/useGeolocation';

const QuickFind = () => {
  const [isSearching, setIsSearching] = useState(false);
  const location = useGeolocation({
    enableHighAccuracy: true,
    maximumAge: 30000,
    timeout: 27000
  });

  const handleQuickFind = async () => {
    if (!location.loaded || location.error) {
      return;
    }

    setIsSearching(true);
    try {
      const response = await fetch('/api/parking-spots/nearest', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify({
          latitude: location.coordinates.lat,
          longitude: location.coordinates.lng,
          radius: 1000 // 1km
        })
      });

      const data = await response.json();
      // Rediriger vers le spot le plus proche
      if (data.spots && data.spots.length > 0) {
        window.location.href = `/spot/${data.spots[0].id}`;
      }
    } catch (error) {
      console.error('Error finding nearest spot:', error);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-4 right-4 z-50"
    >
      <button
        onClick={handleQuickFind}
        disabled={!location.loaded || location.error || isSearching}
        className={`flex items-center space-x-2 px-6 py-3 rounded-full shadow-lg 
          ${isSearching ? 'bg-gray-400' : 'bg-primary-600'} 
          text-white font-semibold transform hover:scale-105 transition-transform`}
      >
        {isSearching ? (
          <>
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            <span>Recherche...</span>
          </>
        ) : (
          <>
            <FaLocationArrow className="text-xl" />
            <span>Place rapide</span>
          </>
        )}
      </button>

      {location.error && (
        <div className="absolute bottom-16 right-0 bg-red-50 text-red-500 p-3 rounded-lg shadow-lg text-sm w-64">
          {location.error.message}
        </div>
      )}
    </motion.div>
  );
};

export default QuickFind;