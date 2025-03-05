import { FaEnvelope, FaPhone, FaMapMarkerAlt } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-secondary-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">ParkConnect Genève</h3>
            <p className="text-gray-300">La solution intelligente pour le stationnement à Genève</p>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-2">
              <div className="flex items-center">
                <FaPhone className="mr-2" />
                <span>+41 22 123 45 67</span>
              </div>
              <div className="flex items-center">
                <FaEnvelope className="mr-2" />
                <span>contact@parkconnect.ch</span>
              </div>
              <div className="flex items-center">
                <FaMapMarkerAlt className="mr-2" />
                <span>Rue du Mont-Blanc 18, 1201 Genève</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Liens Utiles</h3>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-primary-300">À propos</a></li>
              <li><a href="#" className="hover:text-primary-300">Conditions générales</a></li>
              <li><a href="#" className="hover:text-primary-300">Politique de confidentialité</a></li>
              <li><a href="#" className="hover:text-primary-300">FAQ</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} ParkConnect Genève. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;