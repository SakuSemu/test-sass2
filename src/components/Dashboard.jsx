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
        <div className="container pt-8 pb-16">
            <header className="mb-8">
                <h2 className="text-4xl font-bold mb-2">Welcome back, Explorer! 🚀</h2>
                <p className="text-gray-600 mb-4">
                    You have <strong>{coins} {getCurrencySymbol()}</strong>. Keep learning to earn more!
                </p>

                {/* XP Bar */}
                <div className="glass-panel p-4 rounded-2xl">
                    <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                            <Star className="text-yellow-500" size={24} />
                            <span className="text-xl font-bold">Level {level}</span>
                        </div>
                        <span className="text-sm text-gray-600">{Math.floor(xpProgress)} / {xpNeeded} XP</span>
                    </div>
                    <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full transition-all duration-1000 ease-out"
                            style={{ width: `${xpPercentage}%` }}
                        ></div>
                    </div>
                </div>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    {/* Savings Goals */}
                    <section className="glass-panel p-6 rounded-2xl">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-2xl font-bold flex items-center gap-2">
                                <Target className="text-purple-600" size={28} />
                                Savings Goals
                            </h3>
                            <button className="btn btn-secondary text-sm px-4 py-2">+ New Goal</button>
                        </div>

                        <GoalCard title="New Bicycle" current={80} target={150} color="var(--color-primary)" symbol={getCurrencySymbol()} />
                        <GoalCard title="Lego Set" current={25} target={60} color="#4FD1C5" symbol={getCurrencySymbol()} />
                    </section>

                    {/* Games Section */}
                    <section>
                        <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                            <Gamepad2 className="text-blue-600" size={28} />
                            Learning Games
                        </h3>

                        {/* Game Selector */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
                            <button
                                onClick={() => setSelectedGame('needs-vs-wants')}
                                className={`btn text-sm px-2 ${selectedGame === 'needs-vs-wants' ? 'btn-primary' : 'btn-secondary'}`}
                            >
                                Needs vs Wants
                            </button>
                            <button
                                onClick={() => setSelectedGame('money-match')}
                                className={`btn text-sm px-2 ${selectedGame === 'money-match' ? 'btn-primary' : 'btn-secondary'}`}
                            >
                                Money Match
                            </button>
                            <button
                                onClick={() => setSelectedGame('savings-story')}
                                className={`btn text-sm px-2 ${selectedGame === 'savings-story' ? 'btn-primary' : 'btn-secondary'}`}
                            >
                                Savings Story
                            </button>
                            <button
                                onClick={() => setSelectedGame('allowance-adventure')}
                                className={`btn text-sm px-2 ${selectedGame === 'allowance-adventure' ? 'btn-primary' : 'btn-secondary'}`}
                            >
                                Allowance Adv.
                            </button>
                        </div>

                        {/* Game Display */}
                        <div className="animate-fadeIn">
                            {selectedGame === 'needs-vs-wants' && <NeedsVsWantsGame />}
                            {selectedGame === 'money-match' && <MoneyMatchUp />}
                            {selectedGame === 'savings-story' && <SavingsStory />}
                            {selectedGame === 'allowance-adventure' && <AllowanceAdventure />}
                        </div>
                    </section>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                    <div className="glass-panel p-6 rounded-2xl text-center relative">
                        <SpeechBubble text={mascotMessage} />
                        <CoinLeoMascot size={120} mood="happy" />
                        <h4 className="text-lg font-bold mt-4 mb-2">CoinLeo says:</h4>
                        <p className="text-gray-600 italic text-sm">
                            "{mascotMessage}"
                        </p>
                    </div>

                    <div className="glass-panel p-6 rounded-2xl">
                        <h4 className="text-xl font-bold mb-4">Your Progress</h4>
                        <div className="space-y-4">
                            <StatRow
                                icon={<TrendingUp size={20} className="text-green-600" />}
                                label="Level"
                                value={`${level} (${level < 5 ? 'Beginner' : level < 10 ? 'Novice' : 'Expert'})`}
                            />
                            <StatRow
                                icon={<CheckCircle size={20} className="text-blue-600" />}
                                label="Total XP"
                                value={Math.floor(xp)}
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
