import React, { useState, useEffect } from 'react';
import { Target, TrendingUp, CheckCircle, Gamepad2, Star } from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';
import CoinLeoMascot from './CoinLeoMascot';
import NeedsVsWantsGame from './NeedsVsWantsGame';
import MoneyMatchUp from './games/MoneyMatchUp';
import SavingsStory from './games/SavingsStory';
import AllowanceAdventure from './games/AllowanceAdventure';
import SpeechBubble from './SpeechBubble';

const Dashboard = () => {
    const { coins, getCurrencySymbol, xp, level } = useCurrency();
    const [selectedGame, setSelectedGame] = useState('needs-vs-wants');
    const [mascotMessage, setMascotMessage] = useState("Remember, saving a little bit every day adds up to a lot!");

    // Calculate XP progress to next level
    const xpForCurrentLevel = (level - 1) ** 2 * 100;
    const xpForNextLevel = level ** 2 * 100;
    const xpProgress = xp - xpForCurrentLevel;
    const xpNeeded = xpForNextLevel - xpForCurrentLevel;
    const xpPercentage = Math.min(100, (xpProgress / xpNeeded) * 100);

    // Update mascot message based on level or random tips
    useEffect(() => {
        const tips = [
            "Remember, saving a little bit every day adds up to a lot!",
            "Needs are things we must have. Wants are things we'd like to have.",
            "Earning money takes hard work. Spending it is easy!",
            "Try to save at least 10% of every coin you earn.",
            "Great job on your progress! Keep going!"
        ];
        setMascotMessage(tips[Math.floor(Math.random() * tips.length)]);
    }, [level]);

    return (
        <div className="container pt-12 pb-24">
            <header className="mb-12">
                <h2 className="text-5xl font-extrabold mb-4 tracking-tight">Welcome back, Explorer! 🚀</h2>
                <p className="text-xl text-gray-600 mb-8">
                    You have <strong className="text-primary-dark">{coins} {getCurrencySymbol()}</strong>. Keep learning to earn more!
                </p>

                {/* XP Bar */}
                <div className="glass-panel p-8 rounded-3xl shadow-lg">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <Star className="text-yellow-500 fill-yellow-500" size={32} />
                            <span className="text-2xl font-bold">Level {level}</span>
                        </div>
                        <span className="text-lg font-medium text-gray-600">{Math.floor(xpProgress)} / {xpNeeded} XP</span>
                    </div>
                    <div className="w-full h-6 bg-gray-200 rounded-full overflow-hidden shadow-inner">
                        <div
                            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-1000 ease-out relative"
                            style={{ width: `${xpPercentage}%` }}
                        >
                            <div className="absolute inset-0 bg-white opacity-20 animate-pulse"></div>
                        </div>
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="lg:col-span-8 space-y-12">
                    {/* Savings Goals */}
                    <section className="glass-panel p-8 rounded-3xl">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-3xl font-bold flex items-center gap-3">
                                <Target className="text-purple-600" size={32} />
                                Savings Goals
                            </h3>
                            <button className="btn btn-secondary text-sm px-6 py-3 shadow-md hover:shadow-lg transition-all">+ New Goal</button>
                        </div>

                        <div className="space-y-8">
                            <GoalCard title="New Bicycle" current={80} target={150} color="var(--color-primary)" symbol={getCurrencySymbol()} />
                            <GoalCard title="Lego Set" current={25} target={60} color="#4FD1C5" symbol={getCurrencySymbol()} />
                        </div>
                    </section>

                    {/* Games Section */}
                    <section>
                        <h3 className="text-3xl font-bold mb-8 flex items-center gap-3">
                            <Gamepad2 className="text-blue-600" size={32} />
                            Learning Games
                        </h3>

                        {/* Game Selector */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
                            <button
                                onClick={() => setSelectedGame('needs-vs-wants')}
                                className={`btn text-base px-4 py-4 transition-all duration-300 ${selectedGame === 'needs-vs-wants' ? 'btn-primary scale-105 shadow-xl ring-4 ring-yellow-100' : 'btn-secondary opacity-90 hover:opacity-100'}`}
                            >
                                Needs vs Wants
                            </button>
                            <button
                                onClick={() => setSelectedGame('money-match')}
                                className={`btn text-base px-4 py-4 transition-all duration-300 ${selectedGame === 'money-match' ? 'btn-primary scale-105 shadow-xl ring-4 ring-yellow-100' : 'btn-secondary opacity-90 hover:opacity-100'}`}
                            >
                                Money Match
                            </button>
                            <button
                                onClick={() => setSelectedGame('savings-story')}
                                className={`btn text-base px-4 py-4 transition-all duration-300 ${selectedGame === 'savings-story' ? 'btn-primary scale-105 shadow-xl ring-4 ring-yellow-100' : 'btn-secondary opacity-90 hover:opacity-100'}`}
                            >
                                Savings Story
                            </button>
                            <button
                                onClick={() => setSelectedGame('allowance-adventure')}
                                className={`btn text-base px-4 py-4 transition-all duration-300 ${selectedGame === 'allowance-adventure' ? 'btn-primary scale-105 shadow-xl ring-4 ring-yellow-100' : 'btn-secondary opacity-90 hover:opacity-100'}`}
                            >
                                Allowance Adv.
                            </button>
                        </div>

                        {/* Game Display */}
                        <div className="animate-fadeIn glass-panel p-8 rounded-3xl min-h-[400px]">
                            {selectedGame === 'needs-vs-wants' && <NeedsVsWantsGame />}
                            {selectedGame === 'money-match' && <MoneyMatchUp />}
                            {selectedGame === 'savings-story' && <SavingsStory />}
                            {selectedGame === 'allowance-adventure' && <AllowanceAdventure />}
                        </div>
                    </section>
                </div>

                {/* Sidebar */}
                <div className="lg:col-span-4 space-y-8">
                    <div className="glass-panel p-8 rounded-3xl text-center relative overflow-visible mt-8 lg:mt-0">
                        <SpeechBubble text={mascotMessage} />
                        <div className="mt-4 transform hover:scale-105 transition-transform duration-500">
                            <CoinLeoMascot size={180} mood="happy" />
                        </div>
                        <h4 className="text-2xl font-bold mt-6 mb-3 text-purple-900">CoinLeo says:</h4>
                        <p className="text-gray-700 italic text-lg leading-relaxed">
                            "{mascotMessage}"
                        </p>
                    </div>

                    <div className="glass-panel p-8 rounded-3xl">
                        <h4 className="text-2xl font-bold mb-6">Your Progress</h4>
                        <div className="space-y-6">
                            <StatRow
                                icon={<TrendingUp size={24} className="text-green-600" />}
                                label="Level"
                                value={<span className="text-xl">{level} <span className="text-sm font-normal text-gray-500">({level < 5 ? 'Beginner' : level < 10 ? 'Novice' : 'Expert'})</span></span>}
                            />
                            <StatRow
                                icon={<CheckCircle size={24} className="text-blue-600" />}
                                label="Total XP"
                                value={<span className="text-xl">{Math.floor(xp)}</span>}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const GoalCard = ({ title, current, target, color, symbol }) => {
    const percentage = Math.min(100, Math.round((current / target) * 100));
    return (
        <div className="mb-6 last:mb-0">
            <div className="flex items-center justify-between mb-2">
                <strong className="text-lg">{title}</strong>
                <span className="text-gray-600 text-sm">{symbol}{current} / {symbol}{target}</span>
            </div>
            <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                    className="h-full rounded-full transition-all duration-1000 ease-out"
                    style={{ width: `${percentage}%`, background: color }}
                ></div>
            </div>
            <div className="text-right mt-1">
                <span className="text-xs text-gray-500">{percentage}% complete</span>
            </div>
        </div>
    );
};

const StatRow = ({ icon, label, value }) => (
    <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
            {icon}
            <span className="text-gray-700">{label}</span>
        </div>
        <strong className="text-gray-900">{value}</strong>
    </div>
);

export default Dashboard;
