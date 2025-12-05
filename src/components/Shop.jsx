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
      addXP(5);
      setShowConfirm(false);
      setSelectedItem(null);
    } else {
      alert("Not enough coins! Keep playing games to earn more.");
    }
  };

  const isOwned = (itemId) => inventory.some(i => i.id === itemId);
  const isLocked = (item) => level < item.unlockLevel;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Shop</h1>
          <p className="text-lg text-gray-600 mb-6">Spend your coins on awesome rewards!</p>
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-amber-50 border border-amber-200 rounded-xl">
            <ShoppingBag className="text-amber-600" size={20} />
            <span className="text-xl font-bold text-amber-900">{coins} {symbol}</span>
          </div>
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {shopItems.map(item => {
            const owned = isOwned(item.id);
            const locked = isLocked(item);

            return (
              <div
                key={item.id}
                className={`card transition-all ${!locked && !owned ? 'hover:shadow-lg cursor-pointer' : 'opacity-60'}`}
                onClick={() => !locked && !owned && setSelectedItem(item)}
              >
                <div className="text-center">
                  <div className="text-6xl mb-4">{item.emoji}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{item.name}</h3>

                  {locked && (
                    <div className="flex items-center justify-center gap-2 text-gray-500 mb-3">
                      <Lock size={16} />
                      <span className="text-sm">Level {item.unlockLevel} required</span>
                    </div>
                  )}

                  {item.buff && !locked && (
                    <div className="flex items-center justify-center gap-1 text-indigo-600 mb-3">
                      <Sparkles size={14} />
                      <span className="text-xs font-medium">{item.buff.description}</span>
                    </div>
                  )}

                  <div className="text-2xl font-bold text-amber-600 mb-4">
                    {item.price} {symbol}
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

        {/* Purchase Confirmation Modal */}
        {showConfirm && selectedItem && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="card max-w-sm w-full animate-slideUp">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Confirm Purchase</h3>
              <p className="text-center text-gray-600 mb-6">
                Buy <strong>{selectedItem.name}</strong> for <strong>{selectedItem.price} {symbol}</strong>?
              </p>
              <div className="flex gap-3">
                <button
                  className="btn btn-secondary flex-1"
                  onClick={() => { setShowConfirm(false); setSelectedItem(null); }}
                >
                  Cancel
                </button>
                <button className="btn btn-primary flex-1" onClick={confirmPurchase}>
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Shop;
