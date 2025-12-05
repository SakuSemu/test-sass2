import React from 'react';
import { Link } from 'react-router-dom';
import { Coins, User, Home, ShoppingBag, Palette, Users } from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';

const Navbar = () => {
  const { coins, level } = useCurrency();

  return (
    <nav style={{
      background: 'white',
      borderBottom: '1px solid #E5E7EB',
      position: 'sticky',
      top: 0,
      zIndex: 50
    }}>
      <div className="container">
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '4rem'
        }}>
          {/* Logo */}
          <Link to="/" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            textDecoration: 'none'
          }}>
            <div style={{
              width: '2.5rem',
              height: '2.5rem',
              background: 'linear-gradient(135deg, #4F46E5, #7C3AED)',
              borderRadius: '0.5rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.5rem'
            }}>
              🦁
            </div>
            <span style={{
              fontSize: '1.5rem',
              fontWeight: 700,
              color: '#4F46E5'
            }}>
              CoinLeo
            </span>
          </Link>

          {/* Navigation */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <NavLink to="/dashboard" icon={<Home size={18} />}>Dashboard</NavLink>
            <NavLink to="/shop" icon={<ShoppingBag size={18} />}>Shop</NavLink>
            <NavLink to="/avatar" icon={<Palette size={18} />}>Avatar</NavLink>
            <NavLink to="/parent-dashboard" icon={<Users size={18} />}>Parents</NavLink>
          </div>

          {/* Stats */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div className="badge badge-warning">
              <Coins size={16} />
              <span>{coins}</span>
            </div>
            <div className="badge badge-primary">
              <User size={16} />
              <span>Level {level}</span>
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
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      padding: '0.5rem 1rem',
      borderRadius: '0.5rem',
      fontWeight: 600,
      fontSize: '0.875rem',
      color: '#374151',
      textDecoration: 'none',
      transition: 'all 0.15s'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.background = '#F3F4F6';
      e.currentTarget.style.color = '#4F46E5';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.background = 'transparent';
      e.currentTarget.style.color = '#374151';
    }}
  >
    {icon}
    <span>{children}</span>
  </Link>
);

export default Navbar;
