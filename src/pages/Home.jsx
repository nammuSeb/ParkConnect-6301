import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaClock, FaTruck, FaUserMd, FaCalendarAlt } from 'react-icons/fa';

const Home = () => {
  const features = [
    {
      icon: <FaClock className="h-6 w-6" />,
      title: "Réservation Flexible",
      description: "Réservez à l'heure, à la journée, à la semaine ou au mois"
    },
    {
      icon: <FaTruck className="h-6 w-6" />,
      title: "Créneaux Spéciaux",
      description: "Solutions dédiées pour livraisons et déménagements"
    },
    {
      icon: <FaUserMd className="h-6 w-6" />,
      title: "Accès Prioritaire",
      description: "Service premium pour les professionnels essentiels"
    },
    {
      icon: <FaCalendarAlt className="h-6 w-6" />,
      title: "Partage Intelligent",
      description: "Partagez votre place avec un calendrier collaboratif"
    }
  ];

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative bg-primary-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Le Stationnement Intelligent à Genève
            </h1>
            <p className="text-xl mb-8">
              La solution qui adapte le stationnement à vos besoins précis
            </p>
            <Link
              to="/search"
              className="inline-block bg-white text-primary-600 px-8 py-3 rounded-lg font-semibold hover:bg-primary-50 transition duration-300"
            >
              Trouver une place
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Nos Services
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <div className="text-primary-600 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;