import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const VerifyEmail = () => {
  const { token } = useParams();
  const [status, setStatus] = useState({ loading: true, success: false, message: '' });

  useEffect(() => {
    const verifyEmail = async () => {
      try {
        const response = await fetch(`/api/auth/verify-email/${token}`);
        const data = await response.json();
        
        setStatus({
          loading: false,
          success: response.ok,
          message: response.ok 
            ? 'Votre email a été vérifié avec succès !'
            : data.error
        });
      } catch (err) {
        setStatus({
          loading: false,
          success: false,
          message: "Erreur lors de la vérification de l'email"
        });
      }
    };

    verifyEmail();
  }, [token]);

  if (status.loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Vérification en cours...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg text-center"
      >
        {status.success ? (
          <FaCheckCircle className="mx-auto h-12 w-12 text-green-500" />
        ) : (
          <FaTimesCircle className="mx-auto h-12 w-12 text-red-500" />
        )}

        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
          {status.success ? 'Email Vérifié' : 'Erreur de Vérification'}
        </h2>

        <p className={`mt-2 text-sm ${
          status.success ? 'text-green-600' : 'text-red-600'
        }`}>
          {status.message}
        </p>

        <div className="mt-6">
          <Link
            to="/auth/login"
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            Se connecter
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default VerifyEmail;