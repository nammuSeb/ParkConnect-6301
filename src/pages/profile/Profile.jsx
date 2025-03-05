import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaUser, FaEnvelope, FaPhone, FaLock, FaBell } from 'react-icons/fa';
import NotificationList from '../../components/notifications/NotificationList';

const Profile = () => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    email: user.email,
    phone: user.phone || '',
  });
  const [message, setMessage] = useState({ type: '', content: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/users/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (response.ok) {
        setUser(data.user);
        localStorage.setItem('user', JSON.stringify(data.user));
        setMessage({ type: 'success', content: 'Profil mis à jour avec succès' });
        setIsEditing(false);
      } else {
        setMessage({ type: 'error', content: data.error });
      }
    } catch (err) {
      setMessage({ type: 'error', content: 'Erreur lors de la mise à jour' });
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Profile Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="md:col-span-2"
        >
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Mon Profil</h2>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="text-primary-600 hover:text-primary-700"
              >
                {isEditing ? 'Annuler' : 'Modifier'}
              </button>
            </div>

            {message.content && (
              <div className={`p-4 rounded-lg mb-4 ${
                message.type === 'success' 
                  ? 'bg-green-50 text-green-800' 
                  : 'bg-red-50 text-red-500'
              }`}>
                {message.content}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Prénom
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                      <FaUser className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      disabled={!isEditing}
                      className={`pl-10 w-full px-3 py-2 border border-gray-300 rounded-lg ${
                        isEditing 
                          ? 'focus:ring-2 focus:ring-primary-500 focus:border-transparent' 
                          : 'bg-gray-50'
                      }`}
                      value={formData.firstName}
                      onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nom
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                      <FaUser className="text-gray-400" />
                    </div>
                    <input
                      type="text"
                      disabled={!isEditing}
                      className={`pl-10 w-full px-3 py-2 border border-gray-300 rounded-lg ${
                        isEditing 
                          ? 'focus:ring-2 focus:ring-primary-500 focus:border-transparent' 
                          : 'bg-gray-50'
                      }`}
                      value={formData.lastName}
                      onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                    <FaEnvelope className="text-gray-400" />
                  </div>
                  <input
                    type="email"
                    disabled={!isEditing}
                    className={`pl-10 w-full px-3 py-2 border border-gray-300 rounded-lg ${
                      isEditing 
                        ? 'focus:ring-2 focus:ring-primary-500 focus:border-transparent' 
                        : 'bg-gray-50'
                    }`}
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Téléphone
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                    <FaPhone className="text-gray-400" />
                  </div>
                  <input
                    type="tel"
                    disabled={!isEditing}
                    className={`pl-10 w-full px-3 py-2 border border-gray-300 rounded-lg ${
                      isEditing 
                        ? 'focus:ring-2 focus:ring-primary-500 focus:border-transparent' 
                        : 'bg-gray-50'
                    }`}
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
              </div>

              {isEditing && (
                <div className="flex justify-end space-x-4">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition duration-300"
                  >
                    Enregistrer
                  </button>
                </div>
              )}
            </form>
          </div>
        </motion.div>

        {/* Notifications Section */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="md:col-span-1"
        >
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center mb-6">
              <FaBell className="text-primary-600 mr-2" />
              <h2 className="text-xl font-semibold">Notifications</h2>
            </div>
            <NotificationList />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;