import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaEnvelope } from 'react-icons/fa';

const VerifyEmailSent = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg text-center"
      >
        <FaEnvelope className="mx-auto h-12 w-12 text-primary-600" />

        <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
          Vérifiez votre email
        </h2>

        <div className="mt-2 text-sm text-gray-600">
          <p>Un email de vérification a été envoyé à votre adresse.</p>
          <p className="mt-2">
            Veuillez cliquer sur le lien dans l'email pour activer votre compte.
          </p>
        </div>

        <div className="mt-6 space-y-4">
          <p className="text-sm text-gray-500">
            N'avez-vous pas reçu l'email ? Vérifiez votre dossier spam ou
          </p>
          <button
            className="text-primary-600 hover:text-primary-500 font-medium"
            onClick={() => {
              // Implement resend verification email logic
            }}
          >
            Renvoyer l'email de vérification
          </button>
        </div>

        <div className="mt-6">
          <Link
            to="/auth/login"
            className="text-sm text-primary-600 hover:text-primary-500"
          >
            Retour à la connexion
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default VerifyEmailSent;