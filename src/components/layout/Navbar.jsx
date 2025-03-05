import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaParking, FaSearch, FaUser, FaSignOutAlt } from 'react-icons/fa';

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/auth/login');
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <FaParking className="h-8 w-8 text-primary-600" />
              <span className="ml-2 text-xl font-semibold text-gray-900">ParkConnect</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <motion.div whileHover={{ scale: 1.05 }}>
              <Link to="/search" className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-primary-600">
                <FaSearch className="mr-2" />
                Rechercher
              </Link>
            </motion.div>
            
            {user ? (
              <>
                <motion.div whileHover={{ scale: 1.05 }}>
                  <Link to="/dashboard" className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-primary-600">
                    <FaUser className="mr-2" />
                    {user.firstName}
                  </Link>
                </motion.div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  onClick={handleLogout}
                  className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-primary-600"
                >
                  <FaSignOutAlt className="mr-2" />
                  Déconnexion
                </motion.button>
              </>
            ) : (
              <motion.div whileHover={{ scale: 1.05 }}>
                <Link to="/auth/login" className="flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-primary-600">
                  <FaUser className="mr-2" />
                  Connexion
                </Link>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;