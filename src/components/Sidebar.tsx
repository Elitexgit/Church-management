import { Home, Layers, Users, Calendar, MessageSquare, PlayCircle, MessageCircle, BookOpen, UserCircle, UserCheck, User, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface SidebarProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

export default function Sidebar({ currentPage, onPageChange }: SidebarProps) {
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

  const handleLogout = async () => {
    
    await signOut();
  };

  return (
    // Updated background and shadow for a premium feel
    <aside className="w-64 bg-gray-900 text-white min-h-screen fixed left-0 top-0 overflow-y-auto hidden lg:block shadow-2xl">
      <div className="flex flex-col h-full">
        
        
        <div className="p-6 bg-blue-900/10 border-b border-blue-900">
          <div className="flex items-center gap-3">
            
            
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center shadow-lg">
               <BookOpen className="w-6 h-6 text-white" />
            </div>
            
            <div>
              <h1 className="text-xl font-extrabold text-white tracking-wider">DLCF OROZO</h1>
              <p className="text-xs text-blue-300 uppercase tracking-widest">Deeper Life</p>
            </div>
          </div>
        </div>

        {/* --- Navigation Menu --- */}
        <nav className="flex-grow p-4 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentPage === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onPageChange(item.id)}
                // Modern active state: full-width pill with distinct color
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
        <div className="p-4 border-t border-gray-800 space-y-2">
            
            {/* Profile Link */}
            <button
                onClick={() => onPageChange('profile')}
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

            {/* Logout Button (Highlighting danger action) */}
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
  );
}