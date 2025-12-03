import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CurrencyProvider } from './context/CurrencyContext';
import { ParentProvider } from './context/ParentContext';
import Layout from './components/Layout';
import Hero from './components/Hero';
import Dashboard from './components/Dashboard';
import Shop from './components/Shop';
import Avatar from './pages/Avatar';
import ParentDashboard from './pages/ParentDashboard';
import { LevelUpModal, BadgeUnlockedModal } from './components/Notifications';
import { badges } from './data/badges';

// Placeholder components for routes not yet implemented
const GameHub = () => <div className="container pt-8"><h2>Game Hub (Coming Soon)</h2></div>;

function App() {
  const [levelUpData, setLevelUpData] = useState(null);
  const [badgeData, setBadgeData] = useState(null);

  useEffect(() => {
    const handleLevelUp = (e) => {
      setLevelUpData(e.detail);
    };

    const handleBadgeUnlock = (e) => {
      const badge = badges.find(b => b.id === e.detail.badgeId);
      if (badge) setBadgeData(badge);
    };

    window.addEventListener('levelUp', handleLevelUp);
    window.addEventListener('badgeUnlocked', handleBadgeUnlock);

    return () => {
      window.removeEventListener('levelUp', handleLevelUp);
      window.removeEventListener('badgeUnlocked', handleBadgeUnlock);
    };
  }, []);

  return (
    <ParentProvider>
      <CurrencyProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Hero />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/avatar" element={<Avatar />} />
              <Route path="/games" element={<GameHub />} />
              <Route path="/parent-dashboard" element={<ParentDashboard />} />
            </Routes>
          </Layout>
        </Router>

        {/* Global Notifications */}
        {levelUpData && (
          <LevelUpModal level={levelUpData.level} onClose={() => setLevelUpData(null)} />
        )}
        {badgeData && (
          <BadgeUnlockedModal badge={badgeData} onClose={() => setBadgeData(null)} />
        )}
      </CurrencyProvider>
    </ParentProvider>
  );
}

export default App;
