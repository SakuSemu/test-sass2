import React from 'react';
import { ShoppingBag, Check } from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';

const Shop = () => {
  const { coins, spendCoins, addToInventory, inventory, getCurrencySymbol } = useCurrency();
  const symbol = getCurrencySymbol();

  const items = [
    { id: 1, name: 'Cool Hat', price: 50, emoji: '🧢' },
    { id: 2, name: 'Skateboard', price: 150, emoji: '🛹' },
    { id: 3, name: 'Guitar', price: 300, emoji: '🎸' },
    { id: 4, name: 'Robot Pet', price: 500, emoji: '🤖' },
    { id: 5, name: 'Super Cape', price: 100, emoji: '🦸' },
    { id: 6, name: 'Telescope', price: 250, emoji: '🔭' },
  ];

  const handleBuy = (item) => {
    if (inventory.some(i => i.id === item.id)) return; // Already owned

    if (spendCoins(item.price)) {
      addToInventory(item);
      alert(`You bought the ${item.name}!`);
    } else {
      alert("Not enough coins! Keep playing games to earn more.");
    }
  };

  const isOwned = (itemId) => inventory.some(i => i.id === itemId);

  return (
    <div className="container" style={{ paddingTop: '2rem' }}>
      <header style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <h2>CoinLeo Shop</h2>
        <p style={{ color: 'var(--text-muted)' }}>Spend your hard-earned coins on cool rewards!</p>
        <p style={{ fontWeight: 'bold', marginTop: '0.5rem' }}>Your Balance: {coins} {symbol}</p>
      </header>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '2rem' }}>
        {items.map(item => {
          const owned = isOwned(item.id);
          return (
            <div key={item.id} className="glass-panel" style={{ padding: '2rem', textAlign: 'center', transition: 'transform 0.2s', opacity: owned ? 0.7 : 1 }}>
              <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>{item.emoji}</div>
              <h4 style={{ marginBottom: '0.5rem' }}>{item.name}</h4>
              <div style={{ color: 'var(--color-primary-dark)', fontWeight: 'bold', marginBottom: '1rem' }}>
                💰 {item.price} {symbol}
              </div>
              <button
                className={`btn ${owned ? 'btn-secondary' : 'btn-primary'}`}
                style={{ width: '100%', padding: '0.5rem', cursor: owned ? 'default' : 'pointer' }}
                onClick={() => handleBuy(item)}
                disabled={owned}
              >
                {owned ? <><Check size={16} /> Owned</> : 'Buy'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Shop;
