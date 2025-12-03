import React, { createContext, useState, useContext, useEffect } from 'react';

const ParentContext = createContext();

export const useParent = () => useContext(ParentContext);

export const ParentProvider = ({ children }) => {
    // Parent authentication (localStorage-based)
    const [parentAuth, setParentAuth] = useState({
        isAuthenticated: false,
        email: null
    });

    // Parent settings
    const [settings, setSettings] = useState({
        weeklyAllowance: 10,
        spendingLimit: 100,
        safeMode: false,
        bonusRewards: {
            enabled: true,
            xpMultiplier: 1.0,
            coinMultiplier: 1.0
        }
    });

    // Child statistics (tracked for parent dashboard)
    const [childStats, setChildStats] = useState({
        lessonsCompleted: 0,
        gamesPlayed: 0,
        correctAnswers: 0,
        incorrectAnswers: 0,
        totalTimeSpent: 0, // in minutes
        lastLogin: null,
        loginStreak: 0
    });

    // Load from localStorage on mount
    useEffect(() => {
        const savedAuth = localStorage.getItem('parentAuth');
        const savedSettings = localStorage.getItem('parentSettings');
        const savedStats = localStorage.getItem('childStats');

        if (savedAuth) setParentAuth(JSON.parse(savedAuth));
        if (savedSettings) setSettings(JSON.parse(savedSettings));
        if (savedStats) setChildStats(JSON.parse(savedStats));
    }, []);

    // Save to localStorage when changed
    useEffect(() => {
        localStorage.setItem('parentAuth', JSON.stringify(parentAuth));
    }, [parentAuth]);

    useEffect(() => {
        localStorage.setItem('parentSettings', JSON.stringify(settings));
    }, [settings]);

    useEffect(() => {
        localStorage.setItem('childStats', JSON.stringify(childStats));
    }, [childStats]);

    const login = (email, password) => {
        // Simple localStorage-based auth (no backend)
        const storedPassword = localStorage.getItem(`parent_${email}`);

        if (storedPassword === password) {
            setParentAuth({ isAuthenticated: true, email });
            return true;
        }
        return false;
    };

    const register = (email, password) => {
        localStorage.setItem(`parent_${email}`, password);
        setParentAuth({ isAuthenticated: true, email });
        return true;
    };

    const logout = () => {
        setParentAuth({ isAuthenticated: false, email: null });
    };

    const updateSettings = (newSettings) => {
        setSettings(prev => ({ ...prev, ...newSettings }));
    };

    const updateChildStats = (newStats) => {
        setChildStats(prev => ({ ...prev, ...newStats }));
    };

    const recordActivity = (activityType, data) => {
        const updates = {};

        switch (activityType) {
            case 'lesson_complete':
                updates.lessonsCompleted = (childStats.lessonsCompleted || 0) + 1;
                break;
            case 'game_played':
                updates.gamesPlayed = (childStats.gamesPlayed || 0) + 1;
                break;
            case 'correct_answer':
                updates.correctAnswers = (childStats.correctAnswers || 0) + 1;
                break;
            case 'incorrect_answer':
                updates.incorrectAnswers = (childStats.incorrectAnswers || 0) + 1;
                break;
            case 'login':
                updates.lastLogin = new Date().toISOString();
                // Calculate streak
                const lastLogin = childStats.lastLogin ? new Date(childStats.lastLogin) : null;
                const now = new Date();
                if (lastLogin) {
                    const daysDiff = Math.floor((now - lastLogin) / (1000 * 60 * 60 * 24));
                    updates.loginStreak = daysDiff === 1 ? (childStats.loginStreak || 0) + 1 : 1;
                } else {
                    updates.loginStreak = 1;
                }
                break;
        }

        updateChildStats(updates);
    };

    const value = {
        parentAuth,
        login,
        register,
        logout,
        settings,
        updateSettings,
        childStats,
        updateChildStats,
        recordActivity
    };

    return (
        <ParentContext.Provider value={value}>
            {children}
        </ParentContext.Provider>
    );
};
