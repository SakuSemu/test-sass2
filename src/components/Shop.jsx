import React, { useState } from 'react';
import { ShoppingBag, Check, Lock, Sparkles } from 'lucide-react';
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
      addXP(5); // Bonus XP for making a purchase
      setShowConfirm(false);
      setSelectedItem(null);
    } else {
      alert("Not enough coins! Keep playing games to earn more.");
    }
  };

  const isOwned = (itemId) => inventory.some(i => i.id === itemId);
  const isLocked = (item) => level < item.unlockLevel;

  return (
    <div className="container pt-8 pb-16">
      <header className="mb-8 text-center">
        <h2 className="text-4xl font-bold mb-2">CoinLeo Shop</h2>
        <p className="text-gray-600 mb-4">Spend your hard-earned coins on cool rewards!</p>
        <div className="inline-block glass-panel px-6 py-3 rounded-full">
          <span className="text-xl font-bold">Your Balance: {coins} {symbol}</span>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {shopItems.map(item => {
          const owned = isOwned(item.id);
          const locked = isLocked(item);

          return (
            <div
              key={item.id}
              className={`glass-panel p-6 rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-xl ${locked ? 'opacity-50' : owned ? 'opacity-75' : ''
                }`}
              onClick={() => !locked && !owned && setSelectedItem(item)}
              style={{ cursor: locked || owned ? 'default' : 'pointer' }}
            >
              <div className="text-center">
                <div className="text-7xl mb-4">{item.emoji}</div>
                <h4 className="text-xl font-bold mb-2">{item.name}</h4>

                {locked && (
                  <div className="flex items-center justify-center gap-2 text-gray-500 mb-2">
                    <Lock size={16} />
                    <span className="text-sm">Unlock at Level {item.unlockLevel}</span>
                  </div>
                )}

                {item.buff && !locked && (
                  <div className="flex items-center justify-center gap-1 text-purple-600 mb-3">
                    <Sparkles size={14} />
                    <span className="text-xs font-semibold">{item.buff.description}</span>
                  </div>
                )}

                <div className="text-2xl font-bold text-yellow-600 mb-4">
                  💰 {item.price} {symbol}
                </div>

                <button
                  className={`btn w-full ${owned ? 'btn-secondary' : 'btn-primary'}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (!locked && !owned) handleBuyClick(item);
                  }}
                  disabled={owned || locked}
                >
                  {owned ? <><Check size={16} /> Owned</> : locked ? <><Lock size={16} /> Locked</> : 'Buy Now'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Item Detail Modal */}
      {selectedItem && !showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" onClick={() => setSelectedItem(null)}>
          <div className="glass-panel p-8 rounded-3xl max-w-md w-full animate-slideUp" onClick={(e) => e.stopPropagation()}>
            <div className="text-center">
              <div className="text-9xl mb-4">{selectedItem.emoji}</div>
              <h3 className="text-3xl font-bold mb-2">{selectedItem.name}</h3>
              <p className="text-gray-600 mb-4">{selectedItem.description}</p>

              {selectedItem.buff && (
                <div className="bg-purple-100 p-4 rounded-xl mb-4">
                  <div className="flex items-center justify-center gap-2 text-purple-700 mb-2">
                    <Sparkles size={20} />
                    <span className="font-bold">Special Ability</span>
                  </div>
                  <p className="text-sm text-purple-900">{selectedItem.buff.description}</p>
                </div>
              )}

              <div className="text-3xl font-bold text-yellow-600 mb-6">
                💰 {selectedItem.price} {symbol}
              </div>

              <div className="flex gap-3">
                <button className="btn btn-secondary flex-1" onClick={() => setSelectedItem(null)}>
                  Cancel
                </button>
                <button className="btn btn-primary flex-1" onClick={() => { setShowConfirm(true); }}>
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Purchase Confirmation */}
      {showConfirm && selectedItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="glass-panel p-8 rounded-3xl max-w-sm w-full animate-slideUp">
            <h3 className="text-2xl font-bold mb-4 text-center">Confirm Purchase</h3>
            <p className="text-center mb-6">
              Are you sure you want to buy <strong>{selectedItem.name}</strong> for <strong>{selectedItem.price} {symbol}</strong>?
            </p>
            <div className="flex gap-3">
              <button className="btn btn-secondary flex-1" onClick={() => { setShowConfirm(false); setSelectedItem(null); }}>
                No, Cancel
              </button>
              <button className="btn btn-primary flex-1" onClick={confirmPurchase}>
                Yes, Buy It!
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Shop;
