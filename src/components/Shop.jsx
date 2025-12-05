import React, { useState } from 'react';
import { ShoppingBag, Check, Lock, Sparkles, Coins, Star, Zap, Crown } from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';
import { shopItems } from '../data/items';

const Shop = () => {
  const { coins, spendCoins, addToInventory, inventory, getCurrencySymbol, level, addXP } = useCurrency();
  const symbol = getCurrencySymbol();
  const [selectedItem, setSelectedItem] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleBuyClick = (item) => {
    setSelectedItem(item);
    setShowConfirm(true);
  };

  const confirmPurchase = () => {
    if (selectedItem && spendCoins(selectedItem.price)) {
      addToInventory(selectedItem);
      addXP(5);
      setShowConfirm(false);
      setSelectedItem(null);
    } else {
      alert("Not enough coins! Play more games to earn coins!");
    }
  };

  const isOwned = (itemId) => inventory.some(i => i.id === itemId);
  const isLocked = (item) => level < item.unlockLevel;

  return (
    <div style={{ minHeight: '100vh', background: '#F9FAFB' }}>
      <div className="container" style={{ paddingTop: '3rem', paddingBottom: '3rem' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', marginBottom: '1rem' }}>
            <ShoppingBag size={40} style={{ color: '#4F46E5' }} />
            <h1 style={{ fontSize: '3rem', fontWeight: 800 }}>Shop</h1>
          </div>
          <p style={{ fontSize: '1.25rem', color: '#4B5563', marginBottom: '1.5rem' }}>
            Spend your hard-earned coins on awesome rewards!
          </p>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.75rem',
            padding: '1rem 2rem',
            background: 'linear-gradient(135deg, #F59E0B, #F97316)',
            borderRadius: '9999px',
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
          }}>
            <Coins size={28} style={{ color: 'white' }} />
            <span style={{ fontSize: '1.5rem', fontWeight: 700, color: 'white' }}>
              {coins} {symbol}
            </span>
          </div>
        </div>

        {/* Items Grid - Desktop 4 columns */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '1.5rem'
        }}>
          {shopItems.map((item, index) => {
            const owned = isOwned(item.id);
            const locked = isLocked(item);

            return (
              <div
                key={item.id}
                className="card"
                style={{
                  cursor: !locked && !owned ? 'pointer' : 'default',
                  opacity: locked || owned ? 0.7 : 1,
                  transition: 'all 0.2s',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onClick={() => !locked && !owned && setSelectedItem(item)}
                onMouseEnter={(e) => {
                  if (!locked && !owned) {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.boxShadow = '0 10px 15px -3px rgb(0 0 0 / 0.1)';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 1px 3px 0 rgb(0 0 0 / 0.1)';
                }}
              >
                {/* Rarity Badge */}
                {item.unlockLevel > 5 && (
                  <div style={{
                    position: 'absolute',
                    top: '0.75rem',
                    right: '0.75rem',
                    background: 'linear-gradient(135deg, #F59E0B, #F97316)',
                    color: 'white',
                    padding: '0.25rem 0.5rem',
                    borderRadius: '0.25rem',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem'
                  }}>
                    <Crown size={12} />
                    RARE
                  </div>
                )}

                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>{item.emoji}</div>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                    {item.name}
                  </h3>

                  {locked && (
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      color: '#6B7280',
                      marginBottom: '0.75rem',
                      fontSize: '0.875rem'
                    }}>
                      <Lock size={16} />
                      <span>Level {item.unlockLevel}</span>
                    </div>
                  )}

                  {item.buff && !locked && (
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.375rem',
                      background: '#EEF2FF',
                      color: '#4F46E5',
                      padding: '0.5rem',
                      borderRadius: '0.5rem',
                      marginBottom: '0.75rem',
                      fontSize: '0.75rem',
                      fontWeight: 600
                    }}>
                      <Sparkles size={14} />
                      <span>{item.buff.description}</span>
                    </div>
                  )}

                  <div style={{
                    fontSize: '1.5rem',
                    fontWeight: 800,
                    color: '#F59E0B',
                    marginBottom: '1rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem'
                  }}>
                    <Coins size={20} />
                    {item.price}
                  </div>

                  <button
                    className={owned ? 'btn btn-secondary' : 'btn btn-primary'}
                    style={{ width: '100%', fontSize: '0.875rem' }}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!locked && !owned) handleBuyClick(item);
                    }}
                    disabled={owned || locked}
                  >
                    {owned ? (
                      <><Check size={16} /> Owned</>
                    ) : locked ? (
                      <><Lock size={16} /> Locked</>
                    ) : (
                      <>Buy Now</>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Purchase Confirmation Modal */}
        {showConfirm && selectedItem && (
          <div style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 50,
            padding: '1rem'
          }}>
            <div className="card" style={{ maxWidth: '28rem', width: '100%' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '5rem', marginBottom: '1rem' }}>{selectedItem.emoji}</div>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>
                  Buy {selectedItem.name}?
                </h3>
                <p style={{ color: '#4B5563', marginBottom: '1.5rem' }}>
                  This will cost <strong style={{ color: '#F59E0B' }}>{selectedItem.price} {symbol}</strong>
                </p>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <button
                    className="btn btn-secondary"
                    style={{ flex: 1 }}
                    onClick={() => { setShowConfirm(false); setSelectedItem(null); }}
                  >
                    Cancel
                  </button>
                  <button
                    className="btn btn-primary"
                    style={{ flex: 1 }}
                    onClick={confirmPurchase}
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
