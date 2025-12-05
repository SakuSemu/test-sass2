import React from 'react';
import { Link } from 'react-router-dom';
import { Coins, User, Home, ShoppingBag, Palette, Users } from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';

const Navbar = () => {
  const { coins, getCurrencySymbol, level } = useCurrency();

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-14 h-14 bg-gradient-to-br from-green-400 to-green-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
              <span className="text-3xl">🦁</span>
            </div>
            <span className="text-2xl font-bold text-green-600">CoinLeo</span>
          </Link>

          {/* Navigation Links - Hidden on mobile */}
          <div className="hidden md:flex items-center gap-2">
            <NavLink to="/dashboard" icon={<Home size={20} />}>Home</NavLink>
            <NavLink to="/shop" icon={<ShoppingBag size={20} />}>Shop</NavLink>
            <NavLink to="/avatar" icon={<Palette size={20} />}>Avatar</NavLink>
            <NavLink to="/parent-dashboard" icon={<Users size={20} />}>Parents</NavLink>
          </div>

          {/* User Stats */}
          <div className="flex items-center gap-3">
            <div className="badge badge-orange">
              <Coins size={20} />
              <span className="text-lg font-bold">{coins}</span>
            </div>
            <div className="badge badge-blue">
              <User size={20} />
              <span className="text-lg font-bold">Lv {level}</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ to, icon, children }) => (
  <Link
    to={to}
    className="flex items-center gap-2 px-4 py-3 rounded-2xl font-semibold text-gray-700 hover:bg-green-50 hover:text-green-600 transition-all"
  >
    {icon}
    <span>{children}</span>
  </Link>
);

export default Navbar;

