import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CurrencyProvider } from './context/CurrencyContext';
import Layout from './components/Layout';
import Hero from './components/Hero';
import Dashboard from './components/Dashboard';
import Shop from './components/Shop';

function App() {
  return (
    <CurrencyProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Hero />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/shop" element={<Shop />} />
          </Routes>
        </Layout>
      </Router>
    </CurrencyProvider>
  );
}

export default App;
