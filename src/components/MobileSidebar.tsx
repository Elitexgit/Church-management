import { Home, Layers, Users, Calendar, MessageSquare, PlayCircle, MessageCircle, BookOpen, UserCircle, UserCheck, User, LogOut, X } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface MobileSidebarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileSidebar({ currentPage, onPageChange, isOpen, onClose }: MobileSidebarProps) {
  const { signOut } = useAuth();

  const menuItems = [
    // Core Navigation
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'registration', label: 'Event Registration', icon: Layers },
    // Event/Logistics
    { id: 'programs', label: 'Programs & Schedule', icon: Calendar },
    { id: 'meals', label: 'Meal Plan', icon: Users },
    { id: 'consultation', label: 'Consultation Booking', icon: UserCheck },
    // Engagement/Content
    { id: 'media', label: 'Media & Resources', icon: PlayCircle },
    { id: 'quiz', label: 'Bible Quiz', icon: BookOpen },
    { id: 'dp', label: 'Profile Picture Generator', icon: UserCircle },
    // Communication
    { id: 'communication', label: 'General Communication', icon: MessageSquare },
    { id: 'feedback', label: 'Feedback & Forms', icon: MessageCircle },
  ];

  const handlePageChange = (page: string) => {
    onPageChange(page);
    onClose();
  };

  const handleLogout = async () => {
    await signOut();
    onClose();
  };

  // The component renders the overlay and the sidebar itself
  return (
    <>
      {/* --- Overlay (Backdrop) --- */}
      {/* Fades in/out with the isOpen state */}
      <div
        className={`fixed inset-0 bg-black/70 z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        } lg:hidden`}
        onClick={onClose}
      />
      
      {/* --- Mobile Sidebar Panel --- */}
      <aside
        className={`w-64 max-w-xs bg-gray-900 text-white min-h-screen fixed top-0 z-50 lg:hidden shadow-2xl transition-transform duration-500 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
            
          {/* --- Header/Logo Section --- */}
          <div className="p-4 bg-blue-900/10 border-b border-gray-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
                    <BookOpen className="w-5 h-5 text-white" />
                </div>
                <div>
                    <h1 className="text-lg font-extrabold text-white tracking-wider">DLCM OROZO</h1>
                    <p className="text-xs text-blue-300 uppercase tracking-widest">app</p>
                </div>
            </div>
            {/* Explicit Close Button */}
            <button
                onClick={onClose}
                className="p-1 rounded-full text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
                aria-label="Close menu"
            >
                <X size={24} />
            </button>
          </div>

          {/* --- Navigation Menu --- */}
          <nav className="flex-grow p-4 space-y-1 overflow-y-auto">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handlePageChange(item.id)}
                  className={`
                    w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-200 text-left
                    ${isActive
                      ? 'bg-blue-600 text-white shadow-md font-semibold'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-blue-400'
                    }
                  `}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm">{item.label}</span>
                  {isActive && (
                      <span className="ml-auto w-1 h-5 bg-blue-300 rounded-full"></span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* --- Footer / User Actions --- */}
          <div className="p-4 border-t border-gray-800 space-y-2 flex-shrink-0">
            
            {/* Profile Link */}
            <button
                onClick={() => handlePageChange('profile')}
                className={`
                    w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-colors text-left
                    ${currentPage === 'profile'
                        ? 'bg-gray-800 text-blue-400 font-medium'
                        : 'text-gray-400 hover:bg-gray-800 hover:text-blue-400'
                    }
                `}
            >
                <User className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm">My Profile</span>
            </button>

            {/* Logout Button */}
            <button
                onClick={handleLogout}
                className="w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-colors text-left text-gray-400 hover:bg-red-900/40 hover:text-red-300"
            >
                <LogOut className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm">Logout</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}