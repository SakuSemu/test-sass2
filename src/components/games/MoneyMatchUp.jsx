import React, { useState, useEffect } from 'react';
import { useCurrency } from '../../context/CurrencyContext';
import { Clock, Trophy, Zap } from 'lucide-react';

const MoneyMatchUp = () => {
    const { addCoins, addXP } = useCurrency();
    const [gameState, setGameState] = useState('ready'); // ready, playing, finished
    const [timeLeft, setTimeLeft] = useState(60);
    const [score, setScore] = useState(0);
    const [matches, setMatches] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedPrice, setSelectedPrice] = useState(null);
    const [correctMatches, setCorrectMatches] = useState(0);

    const items = [
        { id: 1, name: 'Apple', emoji: '🍎', price: 2 },
        { id: 2, name: 'Bicycle', emoji: '🚲', price: 150 },
        { id: 3, name: 'Book', emoji: '📚', price: 15 },
        { id: 4, name: 'Pizza', emoji: '🍕', price: 12 },
        { id: 5, name: 'Toy Car', emoji: '🚗', price: 25 },
        { id: 6, name: 'Ice Cream', emoji: '🍦', price: 5 },
    ];

    const [shuffledPrices, setShuffledPrices] = useState([]);

    useEffect(() => {
        if (gameState === 'playing') {
            const timer = setInterval(() => {
                setTimeLeft(prev => {
                    if (prev <= 1) {
                        endGame();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
            return () => clearInterval(timer);
        }
    }, [gameState]);

    const startGame = () => {
        setGameState('playing');
        setTimeLeft(60);
        setScore(0);
        setCorrectMatches(0);
        setMatches([]);
        setSelectedItem(null);
        setSelectedPrice(null);
        // Shuffle prices
        const prices = [...items].sort(() => Math.random() - 0.5);
        setShuffledPrices(prices);
    };

    const handleItemClick = (item) => {
        if (matches.includes(item.id)) return;
        setSelectedItem(item);
        checkMatch(item, selectedPrice);
    };

    const handlePriceClick = (priceItem) => {
        if (matches.includes(priceItem.id)) return;
        setSelectedPrice(priceItem);
        checkMatch(selectedItem, priceItem);
    };

    const checkMatch = (item, priceItem) => {
        if (!item || !priceItem) return;

        if (item.id === priceItem.id) {
            // Correct match!
            setMatches(prev => [...prev, item.id]);
            setScore(prev => prev + 10);
            setCorrectMatches(prev => prev + 1);
            setSelectedItem(null);
            setSelectedPrice(null);

            // Check if all matched
            if (matches.length + 1 === items.length) {
                setTimeout(() => endGame(), 500);
            }
        } else {
            // Wrong match - flash red and reset
            setTimeout(() => {
                setSelectedItem(null);
                setSelectedPrice(null);
            }, 500);
        }
    };

    const endGame = () => {
        setGameState('finished');
        const coinsEarned = correctMatches * 5;
        const xpEarned = 15 + (correctMatches * 2);
        addCoins(coinsEarned);
        addXP(xpEarned);
    };

    if (gameState === 'ready') {
        return (
            <div className="glass-panel p-8 rounded-2xl text-center max-w-2xl mx-auto">
                <div className="text-6xl mb-4">🎯</div>
                <h3 className="text-3xl font-bold mb-4">Money Match-Up</h3>
                <p className="text-gray-600 mb-6">
                    Match each item with its correct price! You have 60 seconds to match as many as you can.
                    Earn <strong>5 coins</strong> per correct match!
                </p>
                <button className="btn btn-primary text-lg px-8 py-3" onClick={startGame}>
                    <Zap size={20} /> Start Game
                </button>
            </div>
        );
    }

    if (gameState === 'finished') {
        return (
            <div className="glass-panel p-8 rounded-2xl text-center max-w-2xl mx-auto animate-slideUp">
                <div className="text-6xl mb-4">🎉</div>
                <h3 className="text-3xl font-bold mb-4">Game Over!</h3>
                <div className="mb-6">
                    <p className="text-xl mb-2">You matched <strong>{correctMatches}</strong> out of {items.length} items!</p>
                    <p className="text-lg text-gray-600">Score: <strong>{score}</strong> points</p>
                </div>
                <div className="bg-yellow-100 p-4 rounded-xl mb-6">
                    <p className="text-lg font-bold text-yellow-800">
                        +{correctMatches * 5} coins | +{15 + (correctMatches * 2)} XP
                    </p>
                </div>
                <button className="btn btn-primary" onClick={startGame}>
                    Play Again
                </button>
            </div>
        );
    }

    // Playing state
    return (
        <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <div className="glass-panel px-4 py-2 rounded-full flex items-center gap-2">
                    <Clock size={20} />
                    <span className="font-bold">{timeLeft}s</span>
                </div>
                <div className="glass-panel px-4 py-2 rounded-full flex items-center gap-2">
                    <Trophy size={20} />
                    <span className="font-bold">{score} pts</span>
                </div>
            </div>

            {/* Game Board */}
            <div className="grid grid-cols-2 gap-8">
                {/* Items Column */}
                <div>
                    <h4 className="text-xl font-bold mb-4 text-center">Items</h4>
                    <div className="space-y-3">
                        {items.map(item => (
                            <button
                                key={item.id}
                                onClick={() => handleItemClick(item)}
                                disabled={matches.includes(item.id)}
                                className={`w-full glass-panel p-4 rounded-xl transition-all ${matches.includes(item.id)
                                        ? 'opacity-50 cursor-not-allowed bg-green-100'
                                        : selectedItem?.id === item.id
                                            ? 'ring-4 ring-blue-500 scale-105'
                                            : 'hover:scale-105 cursor-pointer'
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <span className="text-4xl">{item.emoji}</span>
                                    <span className="text-lg font-semibold">{item.name}</span>
                                    {matches.includes(item.id) && <span className="ml-auto text-green-600">✓</span>}
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Prices Column */}
                <div>
                    <h4 className="text-xl font-bold mb-4 text-center">Prices</h4>
                    <div className="space-y-3">
                        {shuffledPrices.map(item => (
                            <button
                                key={`price-${item.id}`}
                                onClick={() => handlePriceClick(item)}
                                disabled={matches.includes(item.id)}
                                className={`w-full glass-panel p-4 rounded-xl transition-all ${matches.includes(item.id)
                                        ? 'opacity-50 cursor-not-allowed bg-green-100'
                                        : selectedPrice?.id === item.id
                                            ? 'ring-4 ring-blue-500 scale-105'
                                            : 'hover:scale-105 cursor-pointer'
                                    }`}
                            >
                                <div className="flex items-center justify-center gap-2">
                                    <span className="text-2xl font-bold text-yellow-600">${item.price}</span>
                                    {matches.includes(item.id) && <span className="text-green-600">✓</span>}
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Feedback */}
            {selectedItem && selectedPrice && selectedItem.id !== selectedPrice.id && (
                <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-500 text-white px-8 py-4 rounded-2xl text-2xl font-bold animate-pulse">
                    Try Again!
                </div>
            )}
        </div>
    );
};

export default MoneyMatchUp;
