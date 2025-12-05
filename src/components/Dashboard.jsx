import React, { useState, useEffect } from 'react';
import { Target, TrendingUp, CheckCircle, Gamepad2, Star, Award } from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';
import CoinLeoMascot from './CoinLeoMascot';
import NeedsVsWantsGame from './NeedsVsWantsGame';
import MoneyMatchUp from './games/MoneyMatchUp';
import SavingsStory from './games/SavingsStory';
import AllowanceAdventure from './games/AllowanceAdventure';

const Dashboard = () => {
    const { coins, getCurrencySymbol, xp, level } = useCurrency();
    const [selectedGame, setSelectedGame] = useState('needs-vs-wants');

    // Calculate XP progress to next level
    const xpForCurrentLevel = (level - 1) ** 2 * 100;
    const xpForNextLevel = level ** 2 * 100;
    const xpProgress = xp - xpForCurrentLevel;
    const xpNeeded = xpForNextLevel - xpForCurrentLevel;
    const xpPercentage = Math.min(100, (xpProgress / xpNeeded) * 100);

    const levelTitle = level < 5 ? 'Beginner' : level < 10 ? 'Intermediate' : 'Expert';

    return (
        <div className="min-h-screen bg-gray-50">
            <div className="container py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-2">Welcome back! 👋</h1>
                    <p className="text-lg text-gray-600">
                        You have <span className="font-semibold text-indigo-600">{coins} {getCurrencySymbol()}</span> to spend
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    {/* Level Card */}
                    <div className="card">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                                    <Star className="text-indigo-600" size={24} />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500">Your Level</p>
                                    <p className="text-2xl font-bold text-gray-900">Level {level}</p>
                                </div>
                            </div>
                            <span className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-medium rounded-full">
                                {levelTitle}
                            </span>
                        </div>
                        <div className="progress-bar">
                            <div className="progress-fill" style={{ width: `${xpPercentage}%` }}></div>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">{Math.floor(xpProgress)} / {xpNeeded} XP to next level</p>
                    </div>

                    {/* Total XP Card */}
                    <div className="card">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                                <TrendingUp className="text-green-600" size={24} />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Total XP</p>
                                <p className="text-2xl font-bold text-gray-900">{Math.floor(xp)}</p>
                            </div>
                        </div>
                    </div>

                    {/* Achievements Card */}
                    <div className="card">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-12 h-12 bg-amber-100 rounded-xl flex items-center justify-center">
                                <Award className="text-amber-600" size={24} />
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Achievements</p>
                                <p className="text-2xl font-bold text-gray-900">0 / 12</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Savings Goals */}
                        <div className="card">
                            <div className="flex items-center justify-between mb-6">
                                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                    <Target className="text-indigo-600" size={24} />
                                    Savings Goals
                                </h2>
                                <button className="btn btn-secondary text-sm">+ Add Goal</button>
                            </div>

                            <div className="space-y-6">
                                <GoalCard title="New Bicycle" current={80} target={150} symbol={getCurrencySymbol()} />
                                <GoalCard title="Lego Set" current={25} target={60} symbol={getCurrencySymbol()} />
                            </div>
                        </div>

                        {/* Learning Games */}
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                                <Gamepad2 className="text-indigo-600" size={24} />
                                Learning Games
                            </h2>

                            {/* Game Selector */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                                <GameButton
                                    active={selectedGame === 'needs-vs-wants'}
                                    onClick={() => setSelectedGame('needs-vs-wants')}
                                    label="Needs vs Wants"
                                />
                                <GameButton
                                    active={selectedGame === 'money-match'}
                                    onClick={() => setSelectedGame('money-match')}
                                    label="Money Match"
                                />
                                <GameButton
                                    active={selectedGame === 'savings-story'}
                                    onClick={() => setSelectedGame('savings-story')}
                                    label="Savings Story"
                                />
                                <GameButton
                                    active={selectedGame === 'allowance-adventure'}
                                    onClick={() => setSelectedGame('allowance-adventure')}
                                    label="Allowance"
                                />
                            </div>

                            {/* Game Display */}
                            <div className="card animate-fadeIn">
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
                        <div className="card text-center">
                            <div className="mb-4">
                                <CoinLeoMascot size={120} mood="happy" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 mb-2">CoinLeo's Tip</h3>
                            <p className="text-sm text-gray-600">
                                "Save a little bit every day and watch your money grow! 🌱"
                            </p>
                        </div>

                        {/* Quick Stats */}
                        <div className="card">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
                            <div className="space-y-3">
                                <StatRow label="Games Played" value="12" />
                                <StatRow label="Lessons Completed" value="8" />
                                <StatRow label="Login Streak" value="5 days" />
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
            <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-gray-900">{title}</span>
                <span className="text-sm text-gray-500">{symbol}{current} / {symbol}{target}</span>
            </div>
            <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${percentage}%` }}></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">{percentage}% complete</p>
        </div>
    );
};

const GameButton = ({ active, onClick, label }) => (
    <button
        onClick={onClick}
        className={`px-4 py-3 rounded-lg font-medium text-sm transition-all ${active
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-white text-gray-700 border border-gray-200 hover:border-gray-300 hover:bg-gray-50'
            }`}
    >
        {label}
    </button>
);

const StatRow = ({ label, value }) => (
    <div className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
        <span className="text-sm text-gray-600">{label}</span>
        <span className="text-sm font-semibold text-gray-900">{value}</span>
    </div>
);

export default Dashboard;
