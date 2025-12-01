import React, { useState } from 'react';
import { Target, TrendingUp, Award, CheckCircle } from 'lucide-react';

const Dashboard = () => {
    const [coins, setCoins] = useState(150);

    const handleCompleteChallenge = () => {
        setCoins(prev => prev + 50);
        alert("Great job! You earned 50 coins!");
    };

    return (
        <div className="container" style={{ paddingTop: '2rem' }}>
            <header style={{ marginBottom: '2rem' }}>
                <h2>Welcome back, Explorer! 🚀</h2>
                <p style={{ color: 'var(--text-muted)' }}>You're doing great on your financial journey.</p>
            </header>

            <div className="grid-cols-2" style={{ gridTemplateColumns: '2fr 1fr', alignItems: 'start' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                    {/* Savings Goals */}
                    <section className="glass-panel" style={{ padding: '2rem' }}>
                        <div className="flex-center" style={{ justifyContent: 'space-between', marginBottom: '1.5rem' }}>
                            <h3><Target size={24} style={{ display: 'inline', marginRight: '0.5rem', color: 'var(--color-secondary)' }} /> Savings Goals</h3>
                            <button className="btn btn-secondary" style={{ padding: '0.5rem 1rem', fontSize: '0.9rem' }}>+ New Goal</button>
                        </div>

                        <GoalCard title="New Bicycle" current={80} target={150} color="var(--color-primary)" />
                        <GoalCard title="Lego Set" current={25} target={60} color="#4FD1C5" />
                    </section>

                    {/* Daily Challenge */}
                    <section className="glass-panel" style={{ padding: '2rem', background: 'linear-gradient(135deg, rgba(255,255,255,0.9), rgba(255,215,0,0.1))' }}>
                        <h3><Award size={24} style={{ display: 'inline', marginRight: '0.5rem', color: 'var(--color-primary-dark)' }} /> Daily Challenge</h3>
                        <p style={{ margin: '1rem 0' }}>Identify the "Need" vs. "Want" in today's shopping list!</p>
                        <div style={{ background: 'white', padding: '1rem', borderRadius: 'var(--radius-sm)', marginBottom: '1rem' }}>
                            <p><strong>Item:</strong> New Video Game</p>
                        </div>
                        <div className="flex-center" style={{ gap: '1rem', justifyContent: 'flex-start' }}>
                            <button className="btn btn-secondary" onClick={handleCompleteChallenge}>It's a Want</button>
                            <button className="btn" style={{ border: '1px solid var(--text-muted)' }}>It's a Need</button>
                        </div>
                    </section>
                </div>

                {/* Sidebar Stats */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div className="glass-panel" style={{ padding: '1.5rem', textAlign: 'center' }}>
                        <img
                            src="https://api.dicebear.com/7.x/avataaars/svg?seed=CoinLeo&backgroundColor=FFD700"
                            alt="CoinLeo"
                            style={{ width: '100px', height: '100px', margin: '0 auto 1rem' }}
                        />
                        <h4>CoinLeo says:</h4>
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

const GoalCard = ({ title, current, target, color }) => {
    const percentage = Math.min(100, Math.round((current / target) * 100));
    return (
        <div style={{ marginBottom: '1.5rem' }}>
            <div className="flex-center" style={{ justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <strong>{title}</strong>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>${current} / ${target}</span>
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
