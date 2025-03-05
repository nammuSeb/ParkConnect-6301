import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Search from '../pages/Search';
import Booking from '../pages/Booking';
import Dashboard from '../pages/Dashboard';
import ParkingSpot from '../pages/ParkingSpot';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import ForgotPassword from '../pages/auth/ForgotPassword';
import ResetPassword from '../pages/auth/ResetPassword';
import VerifyEmail from '../pages/auth/VerifyEmail';
import VerifyEmailSent from '../pages/auth/VerifyEmailSent';
import PrivateRoute from './PrivateRoute';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/search" element={<Search />} />
      <Route path="/auth/login" element={<Login />} />
      <Route path="/auth/register" element={<Register />} />
      <Route path="/auth/forgot-password" element={<ForgotPassword />} />
      <Route path="/auth/reset-password/:token" element={<ResetPassword />} />
      <Route path="/auth/verify-email/:token" element={<VerifyEmail />} />
      <Route path="/auth/verify-email-sent" element={<VerifyEmailSent />} />
      <Route element={<PrivateRoute />}>
        <Route path="/booking/:id" element={<Booking />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>
      <Route path="/spot/:id" element={<ParkingSpot />} />
    </Routes>
  );
};

export default AppRoutes;