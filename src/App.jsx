import { HashRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import AppRoutes from './routes/AppRoutes';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import QuickFind from './components/QuickFind';

function App() {
  return (
    <HashRouter>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Navbar />
        <main className="flex-grow">
          <AppRoutes />
        </main>
        <QuickFind />
        <Footer />
        <Toaster position="top-center" />
      </div>
    </HashRouter>
  );
}

export default App;