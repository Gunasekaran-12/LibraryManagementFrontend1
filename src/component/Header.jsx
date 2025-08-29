import { Link, useLocation, useNavigate } from "react-router-dom";
import { BookOpen, Users, ClipboardList, UserCog, User, Sparkles, LogIn, UserPlus, ChevronDown, LogOut } from "lucide-react";
import { useState } from "react";
import { useAuth } from '../context/AuthContext'; // Import the hook

const NavLink = ({ to, icon: Icon, children }) => {
  const { pathname } = useLocation();
  const active = pathname === to;

  return (
    <Link
      to={to}
      className={`group relative flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all duration-500 overflow-hidden text-sm
        ${active
          ? "bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 text-white shadow-xl transform scale-105 shadow-purple-500/30"
          : "bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-indigo-50 hover:text-purple-700 hover:shadow-lg hover:scale-102 border border-white/50"
        }`}
    >
      {/* Animated Background Glow */}
      <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${
        active ? 'opacity-100' : ''
      }`}>
        <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 to-indigo-400/20 blur-xl"></div>
      </div>
      
      {/* Content */}
      <div className="relative flex items-center gap-2">
        <Icon className={`w-4 h-4 transition-all duration-300 ${
          active ? 'text-white animate-pulse' : 'text-purple-600 group-hover:text-purple-700 group-hover:scale-110'
        }`} />
        <span className="font-medium tracking-wide">{children}</span>
        
        {/* Animated Arrow */}
        <span className={`ml-1 text-xs transition-all duration-300 transform ${
          active 
            ? 'opacity-100 translate-x-0 text-white' 
            : 'opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 text-purple-500'
        }`}>
          ✦
        </span>
      </div>
      
      {/* Sparkle Effect for Active */}
      {active && (
        <div className="absolute top-1 right-1">
          <Sparkles className="w-3 h-3 text-white/60 animate-spin" />
        </div>
      )}
    </Link>
  );
};

export default function Header() {
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  // Mock user data - replace with your actual authentication state
  const [isLoggedIn, setIsLoggedIn] = useState(true); // Change to false to see login/register buttons
  const [user, setUser] = useState({
    name: "Guna",
    email: "Guna@example.com",
    avatar: null // Set to null to show initial
  });

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setIsDropdownOpen(false);
    // Add your logout logic here (clear tokens, etc.)
    navigate('/');
  };

  const handleProfileClick = () => {
    setIsDropdownOpen(false);
    navigate('/profile');
  };

  return (
    <>
      {/* Gradient Background */}
      <div className="fixed top-0 left-0 right-0 h-32 bg-gradient-to-br from-violet-900 via-purple-800 to-indigo-900 opacity-10 pointer-events-none"></div>
      
      <header className="relative bg-white/90 backdrop-blur-xl shadow-2xl border-b border-white/20 sticky top-0 z-50">
        {/* Decorative Top Border */}
        <div className="h-1 bg-gradient-to-r from-violet-500 via-purple-500 to-indigo-500"></div>
        
        <div className="max-w-7xl mx-auto px-8 py-6">
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <Link to="/" className="group flex items-center gap-4 transition-all duration-300 hover:scale-105">
            <div className="relative">
              {/* Logo Background */}
              <div className="absolute inset-0 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-2xl blur-lg opacity-30 group-hover:opacity-50 transition-opacity duration-300"></div>
              <div className="relative bg-gradient-to-br from-violet-600 to-indigo-600 p-3 rounded-2xl shadow-xl">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              {/* Floating Sparkles */}
              <div className="absolute -top-1 -right-1">
                <div className="w-2 h-2 bg-yellow-400 rounded-full animate-ping"></div>
              </div>
            </div>
            
            <div className="flex flex-col">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">
                BookNest
              </h1>
              <p className="text-sm text-gray-500 font-medium tracking-wide -mt-1">
                A cozy place for books
              </p>
            </div>
          </Link>

          {/* Center Navigation */}
          <nav className="flex items-center gap-1">
            <NavLink to="/books" icon={BookOpen}>Books</NavLink>
            <NavLink to="/borrowers" icon={Users}>Borrowers</NavLink>
            <NavLink to="/borrow-records" icon={ClipboardList}>Records</NavLink>
            <NavLink to="/librarians" icon={UserCog}>Librarians</NavLink>
            <NavLink to="/users" icon={User}>Users</NavLink>
          </nav>

          {/* Auth Section */}
          <div className="flex items-center gap-3">
            {isLoggedIn ? (
              /* Logged In User Profile */
              <div className="relative">
                <div className="flex items-center gap-3">
                  {/* Profile Button */}
                  <button
                    onClick={handleProfileClick}
                    className="group flex items-center gap-3 px-4 py-2.5 rounded-xl font-medium transition-all duration-300 bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-indigo-50 hover:text-purple-700 hover:shadow-lg hover:scale-102 border border-white/50"
                  >
                    {/* Avatar */}
                    <div className="w-8 h-8 bg-gradient-to-r from-violet-500 to-indigo-600 rounded-full flex items-center justify-center shadow-lg">
                      {user.avatar ? (
                        <img src={user.avatar} alt="Profile" className="w-8 h-8 rounded-full object-cover" />
                      ) : (
                        <span className="text-white text-sm font-bold">
                          {user.name.charAt(0).toUpperCase()}
                        </span>
                      )}
                    </div>
                    
                    {/* User Info */}
                    <div className="flex flex-col text-left">
                      <span className="text-sm font-semibold text-gray-800 group-hover:text-purple-700 transition-colors">
                        {user.name}
                      </span>
                      <span className="text-xs text-gray-500 -mt-0.5">
                        Profile
                      </span>
                    </div>
                  </button>

                  {/* Dropdown Button */}
                  <div className="relative">
                    <button
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}  
                      className="group flex items-center justify-center w-10 h-10 rounded-xl font-medium transition-all duration-300 bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 hover:text-red-700 hover:shadow-lg hover:scale-105 border border-white/50"
                    >
                      <ChevronDown className={`w-4 h-4 transition-all duration-300 ${isDropdownOpen ? 'rotate-180 text-red-600' : 'text-gray-600 group-hover:text-red-700'}`} />
                    </button>

                    {/* Dropdown Menu */}
                    {isDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-white/95 backdrop-blur-xl rounded-xl shadow-2xl border border-white/50 overflow-hidden z-50 animate-in slide-in-from-top-2 duration-200">
                        <div className="py-2">
                          <button
                            onClick={handleProfileClick}
                            className="w-full flex items-center gap-3 px-4 py-3 text-left text-gray-700 hover:bg-gradient-to-r hover:from-purple-50 hover:to-indigo-50 hover:text-purple-700 transition-all duration-200 group"
                          >
                            <User className="w-4 h-4 text-purple-600 group-hover:scale-110 transition-all duration-200" />
                            <span className="font-medium">View Profile</span>
                          </button>
                          
                          <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-1"></div>
                          
                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-4 py-3 text-left text-gray-700 hover:bg-gradient-to-r hover:from-red-50 hover:to-pink-50 hover:text-red-700 transition-all duration-200 group"
                          >
                            <LogOut className="w-4 h-4 text-red-600 group-hover:scale-110 transition-all duration-200" />
                            <span className="font-medium">Logout</span>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Click outside to close dropdown */}
                {isDropdownOpen && (
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setIsDropdownOpen(false)}
                  ></div>
                )}
              </div>
            ) : (
              /* Not Logged In - Auth Buttons */
              <>
                <Link
                  to="/login"
                  className="group flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all duration-300 bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:to-cyan-50 hover:text-blue-700 hover:shadow-lg hover:scale-102 border border-white/50 text-sm"
                >
                  <LogIn className="w-4 h-4 text-blue-600 group-hover:scale-110 transition-all duration-300" />
                  <span>Sign In</span>
                </Link>
                
                <Link
                  to="/register"
                  className="group flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all duration-300 bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg hover:from-emerald-700 hover:to-teal-700 hover:shadow-xl hover:scale-105 text-sm"
                >
                  <UserPlus className="w-4 h-4 text-white group-hover:scale-110 transition-all duration-300" />
                  <span>Register</span>
                </Link>
              </>
            )}
          </div>
        </div>
        </div>
        
        {/* Bottom Glow Effect */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
      </header>
    </>
  );
}
