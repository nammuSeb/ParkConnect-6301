import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaSearch, FaMapMarkerAlt, FaClock } from 'react-icons/fa';

const Search = () => {
  const [searchParams, setSearchParams] = useState({
    location: '',
    date: '',
    duration: '1h'
  });

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search logic
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-xl shadow-lg p-6 mb-8"
      >
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Trouvez votre place de parking
        </h1>
        
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaMapMarkerAlt className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Localisation"
                className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                value={searchParams.location}
                onChange={(e) => setSearchParams({...searchParams, location: e.target.value})}
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaClock className="text-gray-400" />
              </div>
              <input
                type="datetime-local"
                className="pl-10 w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                value={searchParams.date}
                onChange={(e) => setSearchParams({...searchParams, date: e.target.value})}
              />
            </div>

            <div>
              <select
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                value={searchParams.duration}
                onChange={(e) => setSearchParams({...searchParams, duration: e.target.value})}
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

          <button
            type="submit"
            className="w-full md:w-auto px-8 py-3 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition duration-300 flex items-center justify-center"
          >
            <FaSearch className="mr-2" />
            Rechercher
          </button>
        </form>
      </motion.div>

      {/* Map placeholder */}
      <div className="bg-gray-200 rounded-xl h-[400px] flex items-center justify-center">
        <p className="text-gray-600">Carte interactive des places disponibles</p>
      </div>
    </div>
  );
};

export default Search;