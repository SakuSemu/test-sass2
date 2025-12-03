import React from 'react';
import { Link } from 'react-router-dom';
import { Coins, Home, LayoutDashboard, ShoppingBag, User } from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';

const Navbar = () => {
  const { coins, currency, setCurrency, getCurrencySymbol, level } = useCurrency();

  return (
    <nav className="glass-panel" style={{
      position: 'sticky',
      top: '1rem',
      zIndex: 100,
      margin: '0 var(--spacing-md)',
      padding: '0.75rem 2rem'
    }}>
      <div className="flex-center" style={{ justifyContent: 'space-between' }}>
        <Link to="/" className="flex-center" style={{ textDecoration: 'none', gap: '0.5rem' }}>
          <div style={{
            background: 'var(--color-primary)',
            padding: '0.5rem',
            borderRadius: '50%',
            display: 'flex'
          }}>
            <Coins size={24} color="#fff" />
          </div>
          <span style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--text-main)' }}>
            CoinLeo
          </span>
        </Link>

        <div className="flex-center" style={{ gap: '2rem' }}>
          <NavLink to="/" icon={<Home size={20} />} label="Home" />
          <NavLink to="/dashboard" icon={<LayoutDashboard size={20} />} label="Dashboard" />
          <NavLink to="/shop" icon={<ShoppingBag size={20} />} label="Shop" />
          <NavLink to="/avatar" icon={<User size={20} />} label="Avatar" />
        </div>

        <div className="flex-center" style={{ gap: '1rem' }}>
          {/* Currency Selector */}
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            style={{
              padding: '0.5rem',
              borderRadius: 'var(--radius-sm)',
              border: '1px solid var(--text-muted)',
              background: 'white',
              cursor: 'pointer'
            }}
          >
            <option value="USD">USD ($)</option>
            <option value="EUR">EUR (€)</option>
            <option value="JPY">JPY (¥)</option>
          </select>

          <div className="glass-panel" style={{ padding: '0.5rem 1rem', borderRadius: 'var(--radius-full)', background: 'rgba(255,215,0,0.2)' }}>
            <span style={{ fontWeight: '700', color: 'var(--text-main)' }}>💰 {coins} {getCurrencySymbol()}</span>
          </div>

          <Link to="/avatar" style={{ textDecoration: 'none' }}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              background: 'var(--color-secondary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 'bold',
              position: 'relative',
              cursor: 'pointer'
            }}>
              {level}
              <div style={{
                position: 'absolute',
                bottom: '-2px',
                right: '-2px',
                background: 'var(--color-primary)',
                borderRadius: '50%',
                width: '16px',
                height: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '10px'
              }}>
                ⭐
              </div>
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ to, icon, label }) => (
  <Link to={to} className="flex-center" style={{
    textDecoration: 'none',
    color: 'var(--text-main)',
    fontWeight: '600',
    gap: '0.5rem',
    transition: 'color 0.2s'
  }}>
    {icon}
    <span>{label}</span>
  </Link>
);

export default Navbar;
