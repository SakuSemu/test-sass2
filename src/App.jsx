import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CurrencyProvider } from './context/CurrencyContext';
import { ParentProvider } from './context/ParentContext';
import Layout from './components/Layout';
import Hero from './components/Hero';
import Dashboard from './components/Dashboard';
import Shop from './components/Shop';

// Placeholder components for new routes (will be created in later phases)
const Avatar = () => <div className="container pt-8"><h2>Avatar Page (Coming Soon)</h2></div>;
const ParentDashboard = () => <div className="container pt-8"><h2>Parent Dashboard (Coming Soon)</h2></div>;
const GameHub = () => <div className="container pt-8"><h2>Game Hub (Coming Soon)</h2></div>;

function App() {
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
      </CurrencyProvider>
    </ParentProvider>
  );
}

export default App;
