import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  Sparkles,
  Shirt,
  Palette,
  MessageSquare,
  Layers,
  Search,
  Menu,
  X,
  User,
  LogOut,
  ChevronDown
} from 'lucide-react';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const navLinks = [
    { name: 'Wardrobe', path: '/wardrobe', icon: Shirt },
    { name: 'Color Analysis', path: '/color-analysis', icon: Palette },
    { name: 'AI Stylist', path: '/consultation', icon: MessageSquare },
    { name: 'Studio', path: '/studio', icon: Layers },
    { name: 'Inspo Match', path: '/analyzer', icon: Search },
    { name: 'Pricing', path: '/pricing' },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-50 bg-[#FDFBF7]/90 backdrop-blur-md border-b border-[#EFE7D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-full bg-[#1F140B] flex items-center justify-center text-[#FDFBF7] shadow-sm group-hover:scale-105 transition-transform">
            <Sparkles className="w-4 h-4 text-[#DFD1B8]" />
          </div>
          <span className="font-serif text-2xl font-bold tracking-widest text-[#1F140B]">
            AURA
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-[#1F140B] text-[#FDFBF7]'
                    : 'text-[#5C3826] hover:text-[#1F140B] hover:bg-[#F7F3EB]'
                }`}
              >
                {Icon && <Icon className="w-3.5 h-3.5" />}
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* User Account / Auth Buttons */}
        <div className="hidden md:flex items-center space-x-3">
          {isAuthenticated ? (
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#DFD1B8] hover:border-[#1F140B] transition-colors text-sm font-medium text-[#1F140B]"
              >
                <div className="w-6 h-6 rounded-full bg-[#EFE7D8] flex items-center justify-center text-xs font-semibold text-[#5C3826]">
                  {user?.name?.[0] || 'U'}
                </div>
                <span>{user?.name?.split(' ')[0] || 'My Closet'}</span>
                <span className="px-1.5 py-0.5 text-[10px] rounded uppercase font-bold tracking-wider bg-[#F7F3EB] text-[#A27035]">
                  {user?.plan || 'Free'}
                </span>
                <ChevronDown className="w-3.5 h-3.5 text-[#5C3826]" />
              </button>

              {userDropdownOpen && (
                <div
                  onMouseLeave={() => setUserDropdownOpen(false)}
                  className="absolute right-0 mt-2 w-56 bg-[#FDFBF7] rounded-xl shadow-lg border border-[#EFE7D8] py-2 z-50 animate-fadeIn"
                >
                  <div className="px-4 py-2 border-b border-[#EFE7D8]">
                    <p className="text-xs text-[#5C3826] font-medium">Signed in as</p>
                    <p className="text-sm font-bold text-[#1F140B] truncate">{user?.email}</p>
                    <p className="text-xs text-[#A27035] mt-0.5">
                      Season: <span className="font-semibold">{user?.activeColorSeason || 'Deep Autumn'}</span>
                    </p>
                  </div>

                  <Link
                    to="/wardrobe"
                    onClick={() => setUserDropdownOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-[#5C3826] hover:bg-[#F7F3EB] hover:text-[#1F140B]"
                  >
                    <Shirt className="w-4 h-4" />
                    My Digital Wardrobe
                  </Link>
                  <Link
                    to="/pricing"
                    onClick={() => setUserDropdownOpen(false)}
                    className="flex items-center gap-2 px-4 py-2 text-sm text-[#5C3826] hover:bg-[#F7F3EB] hover:text-[#1F140B]"
                  >
                    <Sparkles className="w-4 h-4 text-[#A27035]" />
                    Upgrade to Pro
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-red-700 hover:bg-red-50"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-medium text-[#5C3826] hover:text-[#1F140B]"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 text-sm font-medium bg-[#1F140B] text-[#FDFBF7] rounded-full hover:bg-[#3D2817] transition-colors shadow-sm"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#1F140B] hover:text-[#5C3826]"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-[#EFE7D8] bg-[#FDFBF7] px-4 pt-2 pb-6 space-y-3">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2.5 px-3 py-2 rounded-lg text-base font-medium text-[#1F140B] hover:bg-[#F7F3EB]"
              >
                {Icon && <Icon className="w-5 h-5 text-[#5C3826]" />}
                {link.name}
              </Link>
            );
          })}
          <div className="pt-4 border-t border-[#EFE7D8] flex flex-col gap-2">
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-full border border-red-200 text-red-700 hover:bg-red-50 font-medium"
              >
                <LogOut className="w-4 h-4" />
                Sign Out ({user?.name})
              </button>
            ) : (
              <>
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center px-4 py-2.5 rounded-full border border-[#1F140B] text-[#1F140B] font-medium"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full text-center px-4 py-2.5 rounded-full bg-[#1F140B] text-[#FDFBF7] font-medium"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
