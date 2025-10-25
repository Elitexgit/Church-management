import { useState } from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Sidebar from './components/Sidebar';
import MobileSidebar from './components/MobileSidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Registration from './pages/Registration';
import Meals from './pages/Meals';
import Programs from './pages/Programs';
import Communication from './pages/Communication';
import Media from './pages/Media';
import Feedback from './pages/Feedback';
import Quiz from './pages/Quiz';
import GetDP from './pages/GetDP';
import Consultation from './pages/Consultation';
import Profile from './pages/Profile';
import Login from './pages/Login';
import SignUp from './pages/SignUp';

function AppContent() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [authView, setAuthView] = useState<'login' | 'signup'>('login');
  const { user, profile, loading } = useAuth();

  const handleMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard userName={profile?.full_name || 'User'} />;
      case 'registration':
        return <Registration />;
      case 'meals':
        return <Meals />;
      case 'programs':
        return <Programs />;
      case 'communication':
        return <Communication />;
      case 'media':
        return <Media />;
      case 'feedback':
        return <Feedback />;
      case 'quiz':
        return <Quiz />;
      case 'dp':
        return <GetDP />;
      case 'consultation':
        return <Consultation />;
      case 'profile':
        return <Profile />;
      default:
        return <Dashboard userName={profile?.full_name || 'User'} />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#2c4f87] to-[#1e3a5f] flex items-center justify-center">
        <div className="text-white text-xl">DLCF OROZO...</div>
      </div>
    );
  }

  if (!user) {
    if (authView === 'signup') {
      return <SignUp onSwitchToLogin={() => setAuthView('login')} />;
    }
    return <Login onSwitchToSignUp={() => setAuthView('signup')} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar currentPage={currentPage} onPageChange={setCurrentPage} />
      <MobileSidebar
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
      <Header
        user={{ name: profile?.full_name || 'User', avatar: profile?.avatar_url }}
        onMenuToggle={handleMenuToggle}
        isMobileMenuOpen={isMobileMenuOpen}
      />
      <main className="lg:ml-80 pt-20 px-4 lg:px-8 pb-8">
        <div className="max-w-7xl mx-auto">
          {renderPage()}
        </div>
      </main>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
