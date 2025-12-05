import React, { useState, useEffect } from 'react';
import { Target, TrendingUp, Gamepad2, Star, Trophy, Flame } from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';
import CoinLeoMascot from './CoinLeoMascot';
import NeedsVsWantsGame from './NeedsVsWantsGame';
import MoneyMatchUp from './games/MoneyMatchUp';
import SavingsStory from './games/SavingsStory';
import AllowanceAdventure from './games/AllowanceAdventure';

const Dashboard = () => {
    const { coins, getCurrencySymbol, xp, level } = useCurrency();
    const [selectedGame, setSelectedGame] = useState('needs-vs-wants');

    // Calculate XP progress
    const xpForCurrentLevel = (level - 1) ** 2 * 100;
    const xpForNextLevel = level ** 2 * 100;
    const xpProgress = xp - xpForCurrentLevel;
    const xpNeeded = xpForNextLevel - xpForCurrentLevel;
    const xpPercentage = Math.min(100, (xpProgress / xpNeeded) * 100);

    const levelTitle = level < 5 ? 'Beginner' : level < 10 ? 'Explorer' : 'Master';

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-50 to-purple-50">
            <div className="container py-8">
                {/* Welcome Header */}
                <div className="mb-8 text-center md:text-left">
                    <h1 className="text-5xl font-bold mb-3 animate-bounce-in">Welcome Back! 👋</h1>
                    <p className="text-2xl text-gray-700">
                        You have <span className="font-bold text-green-600">{coins} {getCurrencySymbol()}</span> to spend!
                    </p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {/* Level Card */}
                    <div className="fun-card fun-card-green p-6 animate-bounce-in">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="w-16 h-16 bg-green-500 rounded-2xl flex items-center justify-center shadow-lg">
                                <Star className="text-white" size={32} fill="white" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 font-semibold">Your Level</p>
                                <p className="text-3xl font-bold">Level {level}</p>
                            </div>
                        </div>
                        <div className="badge badge-green mb-3">{levelTitle}</div>
                        <div className="progress-container">
                            <div className="progress-bar" style={{ width: `${xpPercentage}%` }}></div>
                        </div>
                        <p className="text-sm text-gray-600 mt-2 font-semibold">
                            {Math.floor(xpProgress)} / {xpNeeded} XP to next level
                        </p>
                    </div>

                    {/* Total XP Card */}
                    <div className="fun-card fun-card-orange p-6 animate-bounce-in" style={{ animationDelay: '0.1s' }}>
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                                <TrendingUp className="text-white" size={32} />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 font-semibold">Total XP</p>
                                <p className="text-4xl font-bold text-orange-600">{Math.floor(xp)}</p>
                            </div>
                        </div>
                    </div>

                    {/* Streak Card */}
                    <div className="fun-card fun-card-blue p-6 animate-bounce-in" style={{ animationDelay: '0.2s' }}>
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
                                <Flame className="text-white" size={32} />
                            </div>
                            <div>
                                <p className="text-sm text-gray-600 font-semibold">Day Streak</p>
                                <p className="text-4xl font-bold text-blue-600">5 🔥</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Savings Goals */}
                        <div className="fun-card p-8">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-3xl font-bold flex items-center gap-3">
                                    <Target className="text-purple-600" size={32} />
                                    My Savings Goals
                                </h2>
                                <button className="btn btn-outline text-sm px-6">+ Add Goal</button>
                            </div>

                            <div className="space-y-6">
                                <GoalCard title="New Bicycle 🚲" current={80} target={150} symbol={getCurrencySymbol()} />
                                <GoalCard title="Lego Set 🧱" current={25} target={60} symbol={getCurrencySymbol()} />
                            </div>
                        </div>

                        {/* Learning Games */}
                        <div>
                            <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                                <Gamepad2 className="text-green-600" size={32} />
                                Learning Games
                            </h2>

                            {/* Game Selector */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                                <GameButton
                                    active={selectedGame === 'needs-vs-wants'}
                                    onClick={() => setSelectedGame('needs-vs-wants')}
                                    emoji="🛒"
                                    label="Needs vs Wants"
                                />
                                <GameButton
                                    active={selectedGame === 'money-match'}
                                    onClick={() => setSelectedGame('money-match')}
                                    emoji="💰"
                                    label="Money Match"
                                />
                                <GameButton
                                    active={selectedGame === 'savings-story'}
                                    onClick={() => setSelectedGame('savings-story')}
                                    emoji="📖"
                                    label="Savings Story"
                                />
                                <GameButton
                                    active={selectedGame === 'allowance-adventure'}
                                    onClick={() => setSelectedGame('allowance-adventure')}
                                    emoji="🎒"
                                    label="Allowance"
                                />
                            </div>

                            {/* Game Display */}
                            <div className="fun-card p-8 animate-bounce-in">
                                {selectedGame === 'needs-vs-wants' && <NeedsVsWantsGame />}
                                {selectedGame === 'money-match' && <MoneyMatchUp />}
                                {selectedGame === 'savings-story' && <SavingsStory />}
                                {selectedGame === 'allowance-adventure' && <AllowanceAdventure />}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Mascot Card */}
                        <div className="fun-card fun-card-green text-center p-8">
                            <div className="mb-4 animate-float">
                                <CoinLeoMascot size={140} mood="happy" />
                            </div>
                            <h3 className="text-2xl font-bold mb-3">CoinLeo's Tip 💡</h3>
                            <p className="text-lg text-gray-700 leading-relaxed">
                                "Save a little bit every day and watch your money grow! 🌱"
                            </p>
                        </div>

                        {/* Quick Stats */}
                        <div className="fun-card p-6">
                            <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                                <Trophy className="text-yellow-500" size={28} />
                                Your Stats
                            </h3>
                            <div className="space-y-4">
                                <StatRow emoji="🎮" label="Games Played" value="12" />
                                <StatRow emoji="📚" label="Lessons Done" value="8" />
                                <StatRow emoji="🔥" label="Day Streak" value="5 days" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const GoalCard = ({ title, current, target, symbol }) => {
    const percentage = Math.min(100, Math.round((current / target) * 100));
    return (
        <div>
            <div className="flex items-center justify-between mb-3">
                <span className="font-bold text-xl">{title}</span>
                <span className="text-lg text-gray-600 font-semibold">{symbol}{current} / {symbol}{target}</span>
            </div>
            <div className="progress-container">
                <div className="progress-bar" style={{ width: `${percentage}%` }}></div>
            </div>
            <p className="text-sm text-gray-600 mt-2 font-semibold">{percentage}% complete! 🎉</p>
        </div>
    );
};

const GameButton = ({ active, onClick, emoji, label }) => (
    <button
        onClick={onClick}
        className={`px-6 py-4 rounded-2xl font-bold text-lg transition-all flex items-center gap-3 ${active
                ? 'bg-green-500 text-white shadow-fun transform scale-105'
                : 'bg-white text-gray-700 shadow-md hover:shadow-lg hover:scale-105'
            }`}
    >
        <span className="text-2xl">{emoji}</span>
        <span>{label}</span>
    </button>
);

const StatRow = ({ emoji, label, value }) => (
    <div className="flex items-center justify-between py-3 border-b-2 border-gray-100 last:border-0">
        <div className="flex items-center gap-3">
            <span className="text-2xl">{emoji}</span>
            <span className="text-lg font-semibold text-gray-700">{label}</span>
        </div>
        <span className="text-lg font-bold text-gray-900">{value}</span>
    </div>
);

export default Dashboard;
