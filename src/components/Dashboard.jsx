import React from 'react';
import { Target, TrendingUp, CheckCircle } from 'lucide-react';
import { useCurrency } from '../context/CurrencyContext';
import CoinLeoMascot from './CoinLeoMascot';
import NeedsVsWantsGame from './NeedsVsWantsGame';

const Dashboard = () => {
    const { coins, getCurrencySymbol } = useCurrency();

    return (
        <div className="container" style={{ paddingTop: '2rem' }}>
            <header style={{ marginBottom: '2rem' }}>
                <h2>Welcome back, Explorer! 🚀</h2>
                <p style={{ color: 'var(--text-muted)' }}>You have <strong>{coins} {getCurrencySymbol()}</strong>. Keep learning to earn more!</p>
            </header>

            <div className="grid-cols-2" style={{ gridTemplateColumns: '2fr 1fr', alignItems: 'start' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    {/* Savings Goals */}
                    <section className="glass-panel" style={{ padding: '2rem' }}>
                        <div className="flex-center" style={{ justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                            <h3><Target size={24} style={{ display: 'inline', marginRight: '0.5rem', color: 'var(--color-secondary)' }} /> Savings Goals</h3>
                            <button className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>+ New Goal</button>
                        </div>

                        <GoalCard title="New Bicycle" current={80} target={150} color="var(--color-primary)" symbol={getCurrencySymbol()} />
                        <GoalCard title="Lego Set" current={25} target={60} color="#4FD1C5" symbol={getCurrencySymbol()} />
                    </section>

                    {/* Daily Challenge / Game */}
                    <section>
                        <h3 style={{ marginBottom: '1rem' }}>Daily Challenge</h3>
                        <NeedsVsWantsGame />
                    </section>
                </div>

                {/* Sidebar Stats */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div className="glass-panel" style={{ padding: '1.5rem', textAlign: 'center' }}>
                        <CoinLeoMascot size={120} mood="happy" />
                        <h4 style={{ marginTop: '1rem' }}>CoinLeo says:</h4>
                        <p style={{ fontStyle: 'italic', color: 'var(--text-muted)' }}>"Remember, saving a little bit every day adds up to a lot!"</p>
                    </div>

                    <div className="glass-panel" style={{ padding: '1.5rem' }}>
                        <h4>Your Progress</h4>
                        <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <StatRow icon={<TrendingUp size={20} color="green" />} label="Level" value="5 (Novice)" />
                            <StatRow icon={<CheckCircle size={20} color="blue" />} label="Lessons" value="12/50" />
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
        <div style={{ marginBottom: '1.5rem' }}>
            <div className="flex-center" style={{ justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <strong>{title}</strong>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{symbol}{current} / {symbol}{target}</span>
            </div>
            <div style={{ width: '100%', height: '12px', background: '#E2E8F0', borderRadius: 'var(--radius-full)', overflow: 'hidden' }}>
                <div style={{ width: `${percentage}%`, height: '100%', background: color, borderRadius: 'var(--radius-full)', transition: 'width 1s ease' }}></div>
            </div>
        </div>
    );
};

const StatRow = ({ icon, label, value }) => (
    <div className="flex-center" style={{ justifyContent: 'space-between' }}>
        <div className="flex-center" style={{ gap: '0.5rem' }}>
            {icon}
            <span>{label}</span>
        </div>
        <strong>{value}</strong>
    </div>
);

export default Dashboard;
