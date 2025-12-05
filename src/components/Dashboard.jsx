import React, { useState } from 'react';
import { Target, TrendingUp, Gamepad2, Star, Trophy, Flame, Award, Zap, BookOpen, Coins as CoinsIcon } from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';
import CoinLeoMascot from './CoinLeoMascot';
import NeedsVsWantsGame from './NeedsVsWantsGame';
import MoneyMatchUp from './games/MoneyMatchUp';
import SavingsStory from './games/SavingsStory';
import AllowanceAdventure from './games/AllowanceAdventure';

const Dashboard = () => {
    const { coins, getCurrencySymbol, xp, level } = useCurrency();
    const [selectedGame, setSelectedGame] = useState('needs-vs-wants');

    const xpForCurrentLevel = (level - 1) ** 2 * 100;
    const xpForNextLevel = level ** 2 * 100;
    const xpProgress = xp - xpForCurrentLevel;
    const xpNeeded = xpForNextLevel - xpForCurrentLevel;
    const xpPercentage = Math.min(100, (xpProgress / xpNeeded) * 100);

    const levelTitle = level < 5 ? 'Beginner' : level < 10 ? 'Explorer' : 'Master';

    return (
        <div style={{ minHeight: '100vh', background: '#F9FAFB' }}>
            <div className="container" style={{ paddingTop: '2rem', paddingBottom: '3rem' }}>
                {/* Welcome Header */}
                <div style={{ marginBottom: '2rem' }}>
                    <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>
                        Welcome Back! 👋
                    </h1>
                    <p style={{ fontSize: '1.125rem', color: '#4B5563' }}>
                        You have <span style={{ fontWeight: 700, color: '#10B981' }}>{coins} {getCurrencySymbol()}</span> to spend
                    </p>
                </div>

                {/* Stats Grid - 4 columns */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(4, 1fr)',
                    gap: '1.5rem',
                    marginBottom: '2rem'
                }}>
                    {/* Level Card */}
                    <div className="card" style={{
                        background: 'linear-gradient(135deg, #EEF2FF, #E0E7FF)',
                        borderColor: '#C7D2FE'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                            <div style={{
                                width: '3rem',
                                height: '3rem',
                                background: '#4F46E5',
                                borderRadius: '0.75rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <Star size={24} style={{ color: 'white' }} fill="white" />
                            </div>
                            <div>
                                <p style={{ fontSize: '0.875rem', color: '#6B7280', fontWeight: 600 }}>Level</p>
                                <p style={{ fontSize: '1.875rem', fontWeight: 800, color: '#4F46E5' }}>{level}</p>
                            </div>
                        </div>
                        <div className="badge badge-primary" style={{ marginBottom: '0.75rem' }}>{levelTitle}</div>
                        <div className="progress-bar-container">
                            <div className="progress-bar-fill" style={{ width: `${xpPercentage}%` }}></div>
                        </div>
                        <p style={{ fontSize: '0.75rem', color: '#6B7280', marginTop: '0.5rem', fontWeight: 600 }}>
                            {Math.floor(xpProgress)} / {xpNeeded} XP
                        </p>
                    </div>

                    {/* Total XP Card */}
                    <div className="card" style={{
                        background: 'linear-gradient(135deg, #D1FAE5, #A7F3D0)',
                        borderColor: '#6EE7B7'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{
                                width: '3rem',
                                height: '3rem',
                                background: '#10B981',
                                borderRadius: '0.75rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <TrendingUp size={24} style={{ color: 'white' }} />
                            </div>
                            <div>
                                <p style={{ fontSize: '0.875rem', color: '#065F46', fontWeight: 600 }}>Total XP</p>
                                <p style={{ fontSize: '1.875rem', fontWeight: 800, color: '#10B981' }}>
                                    {Math.floor(xp)}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Streak Card */}
                    <div className="card" style={{
                        background: 'linear-gradient(135deg, #FEF3C7, #FDE68A)',
                        borderColor: '#FCD34D'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{
                                width: '3rem',
                                height: '3rem',
                                background: '#F59E0B',
                                borderRadius: '0.75rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <Flame size={24} style={{ color: 'white' }} />
                            </div>
                            <div>
                                <p style={{ fontSize: '0.875rem', color: '#92400E', fontWeight: 600 }}>Streak</p>
                                <p style={{ fontSize: '1.875rem', fontWeight: 800, color: '#F59E0B' }}>5 🔥</p>
                            </div>
                        </div>
                    </div>

                    {/* Achievements Card */}
                    <div className="card" style={{
                        background: 'linear-gradient(135deg, #FCE7F3, #FBCFE8)',
                        borderColor: '#F9A8D4'
                    }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{
                                width: '3rem',
                                height: '3rem',
                                background: '#EC4899',
                                borderRadius: '0.75rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <Trophy size={24} style={{ color: 'white' }} />
                            </div>
                            <div>
                                <p style={{ fontSize: '0.875rem', color: '#831843', fontWeight: 600 }}>Badges</p>
                                <p style={{ fontSize: '1.875rem', fontWeight: 800, color: '#EC4899' }}>0/12</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
                    {/* Main Content */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                        {/* Savings Goals */}
                        <div className="card">
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                                <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', fontSize: '1.5rem' }}>
                                    <Target size={28} style={{ color: '#4F46E5' }} />
                                    Savings Goals
                                </h2>
                                <button className="btn btn-primary" style={{ fontSize: '0.875rem' }}>
                                    + Add Goal
                                </button>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                                <GoalCard title="New Bicycle 🚲" current={80} target={150} symbol={getCurrencySymbol()} color="#4F46E5" />
                                <GoalCard title="Lego Set 🧱" current={25} target={60} symbol={getCurrencySymbol()} color="#10B981" />
                            </div>
                        </div>

                        {/* Learning Games */}
                        <div>
                            <h2 style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', fontSize: '1.5rem' }}>
                                <Gamepad2 size={28} style={{ color: '#10B981' }} />
                                Learning Games
                            </h2>

                            {/* Game Selector - 2x2 Grid */}
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'repeat(2, 1fr)',
                                gap: '1rem',
                                marginBottom: '1.5rem'
                            }}>
                                <GameButton
                                    active={selectedGame === 'needs-vs-wants'}
                                    onClick={() => setSelectedGame('needs-vs-wants')}
                                    icon={<BookOpen size={24} />}
                                    label="Needs vs Wants"
                                    color="#4F46E5"
                                />
                                <GameButton
                                    active={selectedGame === 'money-match'}
                                    onClick={() => setSelectedGame('money-match')}
                                    icon={<CoinsIcon size={24} />}
                                    label="Money Match"
                                    color="#10B981"
                                />
                                <GameButton
                                    active={selectedGame === 'savings-story'}
                                    onClick={() => setSelectedGame('savings-story')}
                                    icon={<Zap size={24} />}
                                    label="Savings Story"
                                    color="#F59E0B"
                                />
                                <GameButton
                                    active={selectedGame === 'allowance-adventure'}
                                    onClick={() => setSelectedGame('allowance-adventure')}
                                    icon={<Award size={24} />}
                                    label="Allowance"
                                    color="#EC4899"
                                />
                            </div>

                            {/* Game Display */}
                            <div className="card">
                                {selectedGame === 'needs-vs-wants' && <NeedsVsWantsGame />}
                                {selectedGame === 'money-match' && <MoneyMatchUp />}
                                {selectedGame === 'savings-story' && <SavingsStory />}
                                {selectedGame === 'allowance-adventure' && <AllowanceAdventure />}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {/* Mascot Card */}
                        <div className="card" style={{ textAlign: 'center', background: 'linear-gradient(135deg, #FEF3C7, #FDE68A)' }}>
                            <div style={{ marginBottom: '1rem' }}>
                                <CoinLeoMascot size={120} mood="happy" />
                            </div>
                            <h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                                CoinLeo's Tip 💡
                            </h3>
                            <p style={{ fontSize: '0.875rem', color: '#4B5563', lineHeight: 1.5 }}>
                                "Save a little bit every day and watch your money grow! 🌱"
                            </p>
                        </div>

                        {/* Quick Stats */}
                        <div className="card">
                            <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', fontSize: '1.125rem' }}>
                                <Trophy size={20} style={{ color: '#F59E0B' }} />
                                Your Stats
                            </h3>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                <StatRow icon={<Gamepad2 size={18} style={{ color: '#4F46E5' }} />} label="Games Played" value="12" />
                                <StatRow icon={<BookOpen size={18} style={{ color: '#10B981' }} />} label="Lessons Done" value="8" />
                                <StatRow icon={<Flame size={18} style={{ color: '#F59E0B' }} />} label="Day Streak" value="5 days" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const GoalCard = ({ title, current, target, symbol, color }) => {
    const percentage = Math.min(100, Math.round((current / target) * 100));
    return (
        <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <span style={{ fontWeight: 700, fontSize: '1.125rem' }}>{title}</span>
                <span style={{ fontSize: '0.875rem', color: '#6B7280', fontWeight: 600 }}>
                    {symbol}{current} / {symbol}{target}
                </span>
            </div>
            <div className="progress-bar-container">
                <div style={{
                    height: '100%',
                    background: `linear-gradient(90deg, ${color}, ${color}CC)`,
                    borderRadius: '9999px',
                    width: `${percentage}%`,
                    transition: 'width 0.3s ease'
                }}></div>
            </div>
            <p style={{ fontSize: '0.75rem', color: '#6B7280', marginTop: '0.5rem', fontWeight: 600 }}>
                {percentage}% complete
            </p>
        </div>
    );
};

const GameButton = ({ active, onClick, icon, label, color }) => (
    <button
        onClick={onClick}
        style={{
            padding: '1.25rem',
            borderRadius: '0.75rem',
            fontWeight: 700,
            fontSize: '1rem',
            transition: 'all 0.15s',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            background: active ? color : 'white',
            color: active ? 'white' : '#374151',
            border: active ? 'none' : '1px solid #E5E7EB',
            cursor: 'pointer',
            boxShadow: active ? '0 4px 6px -1px rgb(0 0 0 / 0.1)' : '0 1px 2px 0 rgb(0 0 0 / 0.05)'
        }}
        onMouseEnter={(e) => {
            if (!active) {
                e.currentTarget.style.borderColor = color;
                e.currentTarget.style.color = color;
            }
        }}
        onMouseLeave={(e) => {
            if (!active) {
                e.currentTarget.style.borderColor = '#E5E7EB';
                e.currentTarget.style.color = '#374151';
            }
        }}
    >
        {icon}
        <span>{label}</span>
    </button>
);

const StatRow = ({ icon, label, value }) => (
    <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingBottom: '1rem',
        borderBottom: '1px solid #E5E7EB'
    }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            {icon}
            <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#374151' }}>{label}</span>
        </div>
        <span style={{ fontSize: '0.875rem', fontWeight: 700, color: '#111827' }}>{value}</span>
    </div>
);

export default Dashboard;
