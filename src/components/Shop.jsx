import React, { useState } from 'react';
import { ShoppingBag, Check, Lock, Sparkles, Coins } from 'lucide-react';
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
      alert("Not enough coins! Play more games to earn coins! 🎮");
    }
  };

  const isOwned = (itemId) => inventory.some(i => i.id === itemId);
  const isLocked = (item) => level < item.unlockLevel;

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-yellow-50">
      <div className="container py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 animate-bounce-in">🛍️ CoinLeo Shop</h1>
          <p className="text-2xl text-gray-700 mb-6">Spend your coins on awesome rewards!</p>
          <div className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full shadow-fun">
            <Coins className="text-white" size={32} />
            <span className="text-3xl font-bold text-white">{coins} {symbol}</span>
          </div>
        </div>

        {/* Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {shopItems.map(item => {
            const owned = isOwned(item.id);
            const locked = isLocked(item);

            return (
              <div
                key={item.id}
                className={`fun-card p-8 transition-all ${!locked && !owned ? 'hover:scale-105 cursor-pointer animate-bounce-in' : 'opacity-60'}`}
                onClick={() => !locked && !owned && setSelectedItem(item)}
                style={{ animationDelay: `${item.id * 0.1}s` }}
              >
                <div className="text-center">
                  <div className="text-8xl mb-4 animate-wiggle">{item.emoji}</div>
                  <h3 className="text-2xl font-bold mb-3">{item.name}</h3>

                  {locked && (
                    <div className="flex items-center justify-center gap-2 text-gray-500 mb-4">
                      <Lock size={20} />
                      <span className="font-semibold">Unlock at Level {item.unlockLevel}</span>
                    </div>
                  )}

                  {item.buff && !locked && (
                    <div className="flex items-center justify-center gap-2 text-purple-600 mb-4 bg-purple-50 py-2 px-4 rounded-full">
                      <Sparkles size={16} />
                      <span className="text-sm font-bold">{item.buff.description}</span>
                    </div>
                  )}

                  <div className="text-3xl font-bold text-orange-600 mb-6">
                    💰 {item.price} {symbol}
                  </div>

                  <button
                    className={`btn w-full ${owned ? 'btn-outline' : locked ? 'btn-outline opacity-50' : 'btn-primary'}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      if (!locked && !owned) handleBuyClick(item);
                    }}
                    disabled={owned || locked}
                  >
                    {owned ? <><Check size={20} /> You Own This!</> : locked ? <><Lock size={20} /> Locked</> : '🛒 Buy Now'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Purchase Confirmation Modal */}
        {showConfirm && selectedItem && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 animate-bounce-in">
            <div className="fun-card fun-card-orange max-w-md w-full p-8">
              <div className="text-center">
                <div className="text-8xl mb-4">{selectedItem.emoji}</div>
                <h3 className="text-3xl font-bold mb-4">Buy {selectedItem.name}?</h3>
                <p className="text-xl text-gray-700 mb-6">
                  This will cost <strong className="text-orange-600">{selectedItem.price} {symbol}</strong>
                </p>
                <div className="flex gap-4">
                  <button
                    className="btn btn-outline flex-1"
                    onClick={() => { setShowConfirm(false); setSelectedItem(null); }}
                  >
                    ❌ Cancel
                  </button>
                  <button className="btn btn-primary flex-1" onClick={confirmPurchase}>
                    ✅ Buy It!
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
