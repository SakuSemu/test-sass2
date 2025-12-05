import React, { useState } from 'react';
import { Lock, Unlock, Users, DollarSign, Shield, Activity, TrendingUp, Calendar } from 'lucide-react';
import { useParent } from '../context/ParentContext';

const ParentDashboard = () => {
    const {
        isAuthenticated,
        login,
        logout,
        childStats,
        settings,
        updateSettings,
        activityLog
    } = useParent();

    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        if (login(password)) {
            setError('');
            setPassword('');
        } else {
            setError('Incorrect password. Default is "parent123"');
        }
    };

    if (!isAuthenticated) {
        return (
            <div style={{
                minHeight: '100vh',
                background: 'linear-gradient(135deg, #EEF2FF, #E0E7FF)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <div className="card" style={{ maxWidth: '28rem', width: '100%', padding: '3rem' }}>
                    <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                        <div style={{
                            width: '4rem',
                            height: '4rem',
                            background: '#4F46E5',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            margin: '0 auto 1rem'
                        }}>
                            <Lock size={32} style={{ color: 'white' }} />
                        </div>
                        <h1 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '0.5rem' }}>
                            Parent Dashboard
                        </h1>
                        <p style={{ color: '#6B7280' }}>
                            Enter password to access parental controls
                        </p>
                    </div>

                    <form onSubmit={handleLogin}>
                        <div style={{ marginBottom: '1.5rem' }}>
                            <label style={{
                                display: 'block',
                                fontSize: '0.875rem',
                                fontWeight: 600,
                                marginBottom: '0.5rem',
                                color: '#374151'
                            }}>
                                Password
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter password"
                                style={{
                                    width: '100%',
                                    padding: '0.75rem',
                                    borderRadius: '0.5rem',
                                    border: '1px solid #D1D5DB',
                                    fontSize: '1rem'
                                }}
                            />
                            {error && (
                                <p style={{ color: '#EF4444', fontSize: '0.875rem', marginTop: '0.5rem' }}>
                                    {error}
                                </p>
                            )}
                        </div>

                        <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                            <Unlock size={20} />
                            Login
                        </button>

                        <p style={{
                            fontSize: '0.75rem',
                            color: '#9CA3AF',
                            textAlign: 'center',
                            marginTop: '1rem'
                        }}>
                            Default password: <code style={{ background: '#F3F4F6', padding: '0.25rem 0.5rem', borderRadius: '0.25rem' }}>parent123</code>
                        </p>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div style={{ minHeight: '100vh', background: '#F9FAFB' }}>
            <div className="container" style={{ paddingTop: '3rem', paddingBottom: '3rem' }}>
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
                    <div>
                        <h1 style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <Users size={40} style={{ color: '#4F46E5' }} />
                            Parent Dashboard
                        </h1>
                        <p style={{ fontSize: '1.125rem', color: '#6B7280' }}>
                            Monitor and manage your child's learning progress
                        </p>
                    </div>
                    <button onClick={logout} className="btn btn-secondary">
                        <Lock size={20} />
                        Logout
                    </button>
                </div>

                {/* Stats Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '3rem' }}>
                    <StatCard
                        icon={<TrendingUp size={28} style={{ color: 'white' }} />}
                        label="Total XP Earned"
                        value={childStats.totalXP}
                        color="#4F46E5"
                    />
                    <StatCard
                        icon={<DollarSign size={28} style={{ color: 'white' }} />}
                        label="Coins Earned"
                        value={childStats.coinsEarned}
                        color="#10B981"
                    />
                    <StatCard
                        icon={<Activity size={28} style={{ color: 'white' }} />}
                        label="Games Played"
                        value={childStats.gamesPlayed}
                        color="#F59E0B"
                    />
                    <StatCard
                        icon={<Calendar size={28} style={{ color: 'white' }} />}
                        label="Days Active"
                        value={childStats.daysActive}
                        color="#EC4899"
                    />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem' }}>
                    {/* Controls */}
                    <div>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <Shield size={24} style={{ color: '#4F46E5' }} />
                            Parental Controls
                        </h2>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                            {/* Weekly Allowance */}
                            <div className="card">
                                <h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '1rem' }}>
                                    Weekly Allowance
                                </h3>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <input
                                        type="number"
                                        value={settings.weeklyAllowance}
                                        onChange={(e) => updateSettings({ weeklyAllowance: parseInt(e.target.value) })}
                                        style={{
                                            flex: 1,
                                            padding: '0.75rem',
                                            borderRadius: '0.5rem',
                                            border: '1px solid #D1D5DB',
                                            fontSize: '1rem'
                                        }}
                                    />
                                    <span style={{ fontWeight: 600, color: '#6B7280' }}>coins/week</span>
                                </div>
                            </div>

                            {/* Spending Limit */}
                            <div className="card">
                                <h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '1rem' }}>
                                    Daily Spending Limit
                                </h3>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                    <input
                                        type="number"
                                        value={settings.spendingLimit}
                                        onChange={(e) => updateSettings({ spendingLimit: parseInt(e.target.value) })}
                                        style={{
                                            flex: 1,
                                            padding: '0.75rem',
                                            borderRadius: '0.5rem',
                                            border: '1px solid #D1D5DB',
                                            fontSize: '1rem'
                                        }}
                                    />
                                    <span style={{ fontWeight: 600, color: '#6B7280' }}>coins/day</span>
                                </div>
                            </div>

                            {/* Safe Mode */}
                            <div className="card">
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <div>
                                        <h3 style={{ fontSize: '1.125rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                                            Safe Mode
                                        </h3>
                                        <p style={{ fontSize: '0.875rem', color: '#6B7280' }}>
                                            Restrict access to external links and ads
                                        </p>
                                    </div>
                                    <button
                                        onClick={() => updateSettings({ safeMode: !settings.safeMode })}
                                        style={{
                                            padding: '0.5rem 1rem',
                                            borderRadius: '9999px',
                                            border: 'none',
                                            fontWeight: 700,
                                            cursor: 'pointer',
                                            background: settings.safeMode ? '#10B981' : '#D1D5DB',
                                            color: 'white',
                                            transition: 'all 0.2s'
                                        }}
                                    >
                                        {settings.safeMode ? 'ON' : 'OFF'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Activity Log */}
                    <div>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                            <Activity size={24} style={{ color: '#10B981' }} />
                            Recent Activity
                        </h2>

                        <div className="card">
                            {activityLog.length > 0 ? (
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    {activityLog.slice(0, 8).map((log, index) => (
                                        <div
                                            key={index}
                                            style={{
                                                paddingBottom: '1rem',
                                                borderBottom: index < 7 ? '1px solid #E5E7EB' : 'none'
                                            }}
                                        >
                                            <p style={{ fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.25rem' }}>
                                                {log.action}
                                            </p>
                                            <p style={{ fontSize: '0.75rem', color: '#6B7280' }}>
                                                {new Date(log.timestamp).toLocaleString()}
                                            </p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p style={{ textAlign: 'center', color: '#6B7280', padding: '2rem' }}>
                                    No activity yet
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const StatCard = ({ icon, label, value, color }) => (
    <div className="card" style={{
        background: `linear-gradient(135deg, ${color}, ${color}DD)`,
        color: 'white',
        borderColor: color
    }}>
        <div style={{
            width: '3.5rem',
            height: '3.5rem',
            background: 'rgba(255, 255, 255, 0.2)',
            borderRadius: '0.75rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1rem'
        }}>
            {icon}
        </div>
        <p style={{ fontSize: '0.875rem', opacity: 0.9, marginBottom: '0.25rem', fontWeight: 600 }}>
            {label}
        </p>
        <p style={{ fontSize: '2rem', fontWeight: 800 }}>
            {value}
        </p>
    </div>
);

export default ParentDashboard;
