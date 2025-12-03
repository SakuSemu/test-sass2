import React, { useState } from 'react';
import { useCurrency } from '../../context/CurrencyContext';
import { Wallet, Heart, PiggyBank, ArrowRight } from 'lucide-react';

const AllowanceAdventure = () => {
    const { addCoins, addXP } = useCurrency();
    const [week, setWeek] = useState(1);
    const [gameState, setGameState] = useState('intro'); // intro, playing, summary
    const [stats, setStats] = useState({ saved: 0, spent: 0, donated: 0 });
    const [mood, setMood] = useState(50); // 0-100

    const TOTAL_WEEKS = 4;
    const WEEKLY_ALLOWANCE = 20;

    const handleAction = (action) => {
        let newStats = { ...stats };
        let newMood = mood;
        let feedback = "";

        switch (action) {
            case 'save':
                newStats.saved += WEEKLY_ALLOWANCE;
                newMood += 5;
                feedback = "Smart move! Your savings are growing.";
                break;
            case 'spend':
                newStats.spent += WEEKLY_ALLOWANCE;
                newMood += 20; // Spending is fun in the short term!
                feedback = "You bought something cool! Enjoy it.";
                break;
            case 'donate':
                newStats.donated += WEEKLY_ALLOWANCE;
                newMood += 15;
                feedback = "That was very kind of you! Helping others feels good.";
                break;
            case 'split':
                newStats.saved += 10;
                newStats.spent += 5;
                newStats.donated += 5;
                newMood += 10;
                feedback = "A balanced approach! Very wise.";
                break;
            default:
                break;
        }

        setStats(newStats);
        setMood(Math.min(100, newMood));

        if (week < TOTAL_WEEKS) {
            setWeek(prev => prev + 1);
        } else {
            finishGame(newStats);
        }
    };

    const finishGame = (finalStats) => {
        setGameState('summary');
        // Calculate rewards based on balance
        const coinReward = Math.floor(finalStats.saved * 1.5) + (finalStats.donated * 2); // Bonus for saving and donating
        const xpReward = 50 + (finalStats.saved > 0 ? 20 : 0) + (finalStats.donated > 0 ? 20 : 0);

        addCoins(coinReward);
        addXP(xpReward);
    };

    const resetGame = () => {
        setWeek(1);
        setStats({ saved: 0, spent: 0, donated: 0 });
        setMood(50);
        setGameState('intro');
    };

    if (gameState === 'intro') {
        return (
            <div className="glass-panel p-8 rounded-2xl text-center max-w-2xl mx-auto">
                <div className="text-6xl mb-4">📅</div>
                <h3 className="text-3xl font-bold mb-4">Allowance Adventure</h3>
                <p className="text-gray-600 mb-6">
                    You'll get <strong>${WEEKLY_ALLOWANCE}</strong> every week for {TOTAL_WEEKS} weeks.
                    Decide how to use your money! Will you save up for something big, spend it on fun stuff, or help others?
                </p>
                <button className="btn btn-primary text-lg px-8 py-3" onClick={() => setGameState('playing')}>
                    Start Adventure
                </button>
            </div>
        );
    }

    if (gameState === 'summary') {
        return (
            <div className="glass-panel p-8 rounded-2xl text-center max-w-2xl mx-auto animate-slideUp">
                <div className="text-6xl mb-4">📊</div>
                <h3 className="text-3xl font-bold mb-6">Adventure Complete!</h3>

                <div className="grid grid-cols-3 gap-4 mb-8">
                    <div className="bg-blue-50 p-4 rounded-xl">
                        <PiggyBank className="text-blue-500 mx-auto mb-2" size={32} />
                        <div className="text-sm text-gray-500">Saved</div>
                        <div className="text-2xl font-bold text-blue-700">${stats.saved}</div>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-xl">
                        <Wallet className="text-purple-500 mx-auto mb-2" size={32} />
                        <div className="text-sm text-gray-500">Spent</div>
                        <div className="text-2xl font-bold text-purple-700">${stats.spent}</div>
                    </div>
                    <div className="bg-pink-50 p-4 rounded-xl">
                        <Heart className="text-pink-500 mx-auto mb-2" size={32} />
                        <div className="text-sm text-gray-500">Donated</div>
                        <div className="text-2xl font-bold text-pink-700">${stats.donated}</div>
                    </div>
                </div>

                <div className="bg-yellow-100 p-4 rounded-xl mb-6">
                    <p className="text-lg font-bold text-yellow-800">
                        Rewards Earned: +{Math.floor(stats.saved * 1.5) + (stats.donated * 2)} coins | +{50 + (stats.saved > 0 ? 20 : 0) + (stats.donated > 0 ? 20 : 0)} XP
                    </p>
                </div>

                <button className="btn btn-primary" onClick={resetGame}>
                    Play Again
                </button>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto">
            <div className="glass-panel p-8 rounded-2xl animate-fadeIn">
                <div className="flex justify-between items-center mb-8">
                    <h3 className="text-2xl font-bold">Week {week} of {TOTAL_WEEKS}</h3>
                    <div className="bg-green-100 px-4 py-2 rounded-full text-green-800 font-bold">
                        Allowance: ${WEEKLY_ALLOWANCE}
                    </div>
                </div>

                <div className="mb-8 text-center">
                    <p className="text-xl text-gray-700 mb-6">You received your allowance! What will you do?</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <button
                            onClick={() => handleAction('save')}
                            className="p-6 rounded-xl bg-blue-50 border-2 border-blue-200 hover:bg-blue-100 transition-all text-left group"
                        >
                            <div className="flex items-center gap-3 mb-2">
                                <PiggyBank className="text-blue-600" size={24} />
                                <span className="font-bold text-blue-900">Save It All</span>
                            </div>
                            <p className="text-sm text-blue-700">Put $20 in your piggy bank for later.</p>
                        </button>

                        <button
                            onClick={() => handleAction('spend')}
                            className="p-6 rounded-xl bg-purple-50 border-2 border-purple-200 hover:bg-purple-100 transition-all text-left group"
                        >
                            <div className="flex items-center gap-3 mb-2">
                                <Wallet className="text-purple-600" size={24} />
                                <span className="font-bold text-purple-900">Spend It All</span>
                            </div>
                            <p className="text-sm text-purple-700">Buy toys and treats right now!</p>
                        </button>

                        <button
                            onClick={() => handleAction('donate')}
                            className="p-6 rounded-xl bg-pink-50 border-2 border-pink-200 hover:bg-pink-100 transition-all text-left group"
                        >
                            <div className="flex items-center gap-3 mb-2">
                                <Heart className="text-pink-600" size={24} />
                                <span className="font-bold text-pink-900">Donate It</span>
                            </div>
                            <p className="text-sm text-pink-700">Give $20 to a good cause.</p>
                        </button>

                        <button
                            onClick={() => handleAction('split')}
                            className="p-6 rounded-xl bg-yellow-50 border-2 border-yellow-200 hover:bg-yellow-100 transition-all text-left group"
                        >
                            <div className="flex items-center gap-3 mb-2">
                                <div className="flex -space-x-1">
                                    <PiggyBank size={16} className="text-blue-600" />
                                    <Wallet size={16} className="text-purple-600" />
                                    <Heart size={16} className="text-pink-600" />
                                </div>
                                <span className="font-bold text-yellow-900">Split It</span>
                            </div>
                            <p className="text-sm text-yellow-700">Save $10, Spend $5, Donate $5.</p>
                        </button>
                    </div>
                </div>

                {/* Current Stats Mini-View */}
                <div className="flex justify-center gap-6 text-sm text-gray-500 border-t pt-4">
                    <div className="flex items-center gap-1"><PiggyBank size={14} /> Saved: ${stats.saved}</div>
                    <div className="flex items-center gap-1"><Wallet size={14} /> Spent: ${stats.spent}</div>
                    <div className="flex items-center gap-1"><Heart size={14} /> Donated: ${stats.donated}</div>
                </div>
            </div>
        </div>
    );
};

export default AllowanceAdventure;
