import React from 'react';
import { Link } from 'react-router-dom';
import { Coins, User } from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';

const Navbar = () => {
  const { coins, getCurrencySymbol, level } = useCurrency();

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center group-hover:bg-indigo-700 transition-colors">
              <Coins className="text-white" size={24} />
            </div>
            <span className="text-xl font-bold text-gray-900">CoinLeo</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center gap-1">
            <NavLink to="/dashboard">Dashboard</NavLink>
            <NavLink to="/shop">Shop</NavLink>
            <NavLink to="/avatar">Avatar</NavLink>
            <NavLink to="/parent-dashboard">Parents</NavLink>
          </div>

          {/* User Info */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-50 rounded-lg">
              <Coins className="text-amber-600" size={18} />
              <span className="font-semibold text-amber-900">{coins}</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1.5 bg-indigo-50 rounded-lg">
              <User className="text-indigo-600" size={18} />
              <span className="font-semibold text-indigo-900">Lv {level}</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ to, children }) => (
  <Link
    to={to}
    className="px-4 py-2 text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors font-medium"
  >
    {children}
  </Link>
);

export default Navbar;
