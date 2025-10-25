import { Menu, X, Bell } from 'lucide-react';

interface HeaderProps {
  user: { name: string; avatar?: string };
  onMenuToggle: () => void;
  isMobileMenuOpen: boolean;
}

export default function Header({ user, onMenuToggle, isMobileMenuOpen }: HeaderProps) {
  // Use the same blue-900 color for consistency with the new sidebar
  const HEADER_BG_COLOR = 'bg-gray-900'; 
  const LOGO_TEXT_COLOR = 'text-white';

  // Extract first letter for avatar fallback
  const userInitial = user.name ? user.name.charAt(0).toUpperCase() : 'U';

  return (
    // Fixed header, positioned correctly for desktop (shifted right by sidebar width)
    <header className={`${HEADER_BG_COLOR} text-white shadow-xl fixed top-0 right-0 left-0 lg:left-64 z-40 transition-all duration-300`}>
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        
        {/* --- Left Section: Mobile Menu Button & Mobile Logo --- */}
        <div className="flex items-center gap-4">
          
          {/* Mobile Menu Toggle Button */}
          <button
            onClick={onMenuToggle}
            className="lg:hidden p-2 text-white hover:bg-gray-800 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          
          {/* Mobile Logo/Title (Visible only on mobile) */}
          <div className="flex items-center gap-2 lg:hidden">
            <h1 className="text-lg font-extrabold tracking-wider">DLCF OROZO</h1>
          </div>

          {/* --- Desktop Breadcrumb/Title Placeholder (Adds space for desktop) --- */}
          <div className="hidden lg:block">
            <span className="text-xl font-semibold text-gray-200">Dashboard</span>
          </div>

        </div>

        {/* --- Right Section: User Actions & Profile --- */}
        <div className="flex items-center gap-4">
            
            {/* Notification Button (New Feature) */}
            <button 
                className="p-2 text-gray-300 hover:text-white hover:bg-gray-800 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 relative"
                aria-label="Notifications"
            >
                <Bell className="w-6 h-6" />
                {/* Badge for notifications */}
                <span className="absolute top-1 right-1 block h-2 w-2 rounded-full ring-2 ring-gray-900 bg-red-500"></span>
            </button>


            {/* User Info & Avatar */}
            <div className="flex items-center gap-3 cursor-pointer p-1 rounded-full hover:bg-gray-800 transition-colors">
                
                {/* User Name (Visible on large screens) */}
                <span className="text-base font-medium hidden md:inline text-gray-200">
                    Hello, {user.name.split(' ')[0]}! 
                </span>

                {/* Avatar */}
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center ring-2 ring-blue-400">
                    {user.avatar ? (
                        <img 
                            src={user.avatar} 
                            alt={user.name} 
                            className="w-full h-full rounded-full object-cover" 
                        />
                    ) : (
                        <span className="text-white font-bold text-lg">{userInitial}</span>
                    )}
                </div>
            </div>
        </div>
      </div>
    </header>
  );
}