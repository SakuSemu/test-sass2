import React, { useState } from 'react';
import { useParent } from '../context/ParentContext';
import { Lock, User, Settings, Activity, Shield } from 'lucide-react';

const ParentDashboard = () => {
    const { parentAuth, login, logout, settings, updateSettings, childStats } = useParent();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [activeTab, setActiveTab] = useState('overview'); // overview, controls, activity

    const handleLogin = (e) => {
        e.preventDefault();
        // For demo purposes, any email/password works or we can use the context logic
        // But let's use the context logic for consistency
        if (email && password) {
            // Auto-register if not exists for demo simplicity
            if (!localStorage.getItem(`parent_${email}`)) {
                localStorage.setItem(`parent_${email}`, password);
            }
            if (login(email, password)) {
                // Success
            } else {
                alert("Invalid credentials");
            }
        }
    };

    if (!parentAuth.isAuthenticated) {
        return (
            <div className="container pt-16 pb-24 flex justify-center">
                <div className="glass-panel p-8 rounded-2xl max-w-md w-full">
                    <div className="text-center mb-8">
                        <div className="bg-purple-100 p-4 rounded-full inline-flex mb-4">
                            <Shield size={40} className="text-purple-600" />
                        </div>
                        <h2 className="text-3xl font-bold mb-2">Parent Dashboard</h2>
                        <p className="text-gray-600">Access controls and view your child's progress.</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-4">
                        <div>
                            <label className="block text-sm font-bold mb-2">Email Address</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full p-3 rounded-xl border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none"
                                placeholder="parent@example.com"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold mb-2">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full p-3 rounded-xl border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 outline-none"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-full py-3 text-lg">
                            Access Dashboard
                        </button>
                        <p className="text-xs text-center text-gray-500 mt-4">
                            For demo: Use any email/password. It will create an account automatically.
                        </p>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="container pt-8 pb-16">
            <header className="mb-8 flex justify-between items-center">
                <div>
                    <h2 className="text-3xl font-bold mb-2">Parent Dashboard</h2>
                    <p className="text-gray-600">Welcome back, {parentAuth.email}</p>
                </div>
                <button onClick={logout} className="btn btn-secondary text-sm">
                    Log Out
                </button>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                {/* Sidebar Navigation */}
                <div className="lg:col-span-1 space-y-2">
                    <button
                        onClick={() => setActiveTab('overview')}
                        className={`w-full text-left p-4 rounded-xl flex items-center gap-3 transition-all ${activeTab === 'overview' ? 'bg-purple-600 text-white shadow-lg' : 'glass-panel hover:bg-white'}`}
                    >
                        <User size={20} /> Overview
                    </button>
                    <button
                        onClick={() => setActiveTab('controls')}
                        className={`w-full text-left p-4 rounded-xl flex items-center gap-3 transition-all ${activeTab === 'controls' ? 'bg-purple-600 text-white shadow-lg' : 'glass-panel hover:bg-white'}`}
                    >
                        <Settings size={20} /> Controls & Limits
                    </button>
                    <button
                        onClick={() => setActiveTab('activity')}
                        className={`w-full text-left p-4 rounded-xl flex items-center gap-3 transition-all ${activeTab === 'activity' ? 'bg-purple-600 text-white shadow-lg' : 'glass-panel hover:bg-white'}`}
                    >
                        <Activity size={20} /> Activity Log
                    </button>
                </div>

                {/* Main Content Area */}
                <div className="lg:col-span-3">
                    {activeTab === 'overview' && (
                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <StatCard title="Lessons Completed" value={childStats.lessonsCompleted || 0} icon={<User className="text-blue-500" />} />
                                <StatCard title="Games Played" value={childStats.gamesPlayed || 0} icon={<Activity className="text-green-500" />} />
                                <StatCard title="Login Streak" value={`${childStats.loginStreak || 0} Days`} icon={<Star className="text-yellow-500" />} />
                            </div>

                            <div className="glass-panel p-6 rounded-2xl">
                                <h3 className="text-xl font-bold mb-4">Learning Progress</h3>
                                <div className="space-y-4">
                                    <div>
                                        <div className="flex justify-between mb-1">
                                            <span className="text-sm font-semibold">Financial Literacy Basics</span>
                                            <span className="text-sm text-gray-600">45%</span>
                                        </div>
                                        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                            <div className="h-full bg-blue-500 w-[45%]"></div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between mb-1">
                                            <span className="text-sm font-semibold">Saving & Budgeting</span>
                                            <span className="text-sm text-gray-600">30%</span>
                                        </div>
                                        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                            <div className="h-full bg-green-500 w-[30%]"></div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between mb-1">
                                            <span className="text-sm font-semibold">Smart Spending</span>
                                            <span className="text-sm text-gray-600">60%</span>
                                        </div>
                                        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                                            <div className="h-full bg-purple-500 w-[60%]"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'controls' && (
                        <div className="glass-panel p-8 rounded-2xl">
                            <h3 className="text-xl font-bold mb-6">Parental Controls</h3>

                            <div className="space-y-6">
                                <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-100">
                                    <div>
                                        <h4 className="font-bold">Weekly Allowance</h4>
                                        <p className="text-sm text-gray-600">Amount automatically added each week</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="font-bold text-lg">$</span>
                                        <input
                                            type="number"
                                            value={settings.weeklyAllowance}
                                            onChange={(e) => updateSettings({ weeklyAllowance: parseInt(e.target.value) || 0 })}
                                            className="w-20 p-2 border rounded-lg text-center font-bold"
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-100">
                                    <div>
                                        <h4 className="font-bold">Spending Limit</h4>
                                        <p className="text-sm text-gray-600">Maximum spending per item</p>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="font-bold text-lg">$</span>
                                        <input
                                            type="number"
                                            value={settings.spendingLimit}
                                            onChange={(e) => updateSettings({ spendingLimit: parseInt(e.target.value) || 0 })}
                                            className="w-20 p-2 border rounded-lg text-center font-bold"
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-100">
                                    <div>
                                        <h4 className="font-bold">Safe Mode</h4>
                                        <p className="text-sm text-gray-600">Restrict shop items to educational only</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={settings.safeMode}
                                            onChange={(e) => updateSettings({ safeMode: e.target.checked })}
                                            className="sr-only peer"
                                        />
                                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                                    </label>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === 'activity' && (
                        <div className="glass-panel p-6 rounded-2xl">
                            <h3 className="text-xl font-bold mb-6">Recent Activity</h3>
                            <div className="space-y-4">
                                {/* Mock activity data for demo */}
                                <ActivityItem
                                    action="Completed Lesson"
                                    detail="Needs vs Wants"
                                    time="2 hours ago"
                                    type="success"
                                />
                                <ActivityItem
                                    action="Earned Badge"
                                    detail="First Steps"
                                    time="1 day ago"
                                    type="achievement"
                                />
                                <ActivityItem
                                    action="Purchased Item"
                                    detail="Cool Hat ($50)"
                                    time="2 days ago"
                                    type="spending"
                                />
                                <ActivityItem
                                    action="Game Played"
                                    detail="Money Match-Up (Score: 80)"
                                    time="2 days ago"
                                    type="neutral"
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const StatCard = ({ title, value, icon }) => (
    <div className="glass-panel p-6 rounded-xl flex items-center gap-4">
        <div className="p-3 bg-white rounded-full shadow-sm">
            {icon}
        </div>
        <div>
            <div className="text-sm text-gray-600">{title}</div>
            <div className="text-2xl font-bold">{value}</div>
        </div>
    </div>
);

const ActivityItem = ({ action, detail, time, type }) => {
    const getBorderColor = () => {
        switch (type) {
            case 'success': return 'border-green-500';
            case 'achievement': return 'border-yellow-500';
            case 'spending': return 'border-red-500';
            default: return 'border-blue-500';
        }
    };

    return (
        <div className={`p-4 bg-white rounded-xl border-l-4 ${getBorderColor()} shadow-sm flex justify-between items-center`}>
            <div>
                <div className="font-bold">{action}</div>
                <div className="text-sm text-gray-600">{detail}</div>
            </div>
            <div className="text-xs text-gray-400">{time}</div>
        </div>
    );
};

export default ParentDashboard;
