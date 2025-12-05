import React, { createContext, useState, useContext, useEffect } from 'react';

const ParentContext = createContext();

export const useParent = () => useContext(ParentContext);

export const ParentProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const DEFAULT_PASSWORD = 'parent123';

    const [settings, setSettings] = useState({
        weeklyAllowance: 10,
        spendingLimit: 100,
        safeMode: false
    });

    const [childStats, setChildStats] = useState({
        totalXP: 0,
        coinsEarned: 0,
        gamesPlayed: 0,
        daysActive: 1
    });

    const [activityLog, setActivityLog] = useState([
        { action: 'Started learning journey', timestamp: new Date().toISOString() }
    ]);

    // Load from localStorage
    useEffect(() => {
        const savedAuth = localStorage.getItem('parentAuth');
        const savedSettings = localStorage.getItem('parentSettings');
        const savedStats = localStorage.getItem('childStats');
        const savedLog = localStorage.getItem('activityLog');

        if (savedAuth) setIsAuthenticated(JSON.parse(savedAuth));
        if (savedSettings) setSettings(JSON.parse(savedSettings));
        if (savedStats) setChildStats(JSON.parse(savedStats));
        if (savedLog) setActivityLog(JSON.parse(savedLog));
    }, []);

    // Save to localStorage
    useEffect(() => {
        localStorage.setItem('parentAuth', JSON.stringify(isAuthenticated));
    }, [isAuthenticated]);

    useEffect(() => {
        localStorage.setItem('parentSettings', JSON.stringify(settings));
    }, [settings]);

    useEffect(() => {
        localStorage.setItem('childStats', JSON.stringify(childStats));
    }, [childStats]);

    useEffect(() => {
        localStorage.setItem('activityLog', JSON.stringify(activityLog));
    }, [activityLog]);

    const login = (password) => {
        if (password === DEFAULT_PASSWORD) {
            setIsAuthenticated(true);
            addActivity('Parent logged in');
            return true;
        }
        return false;
    };

    const logout = () => {
        setIsAuthenticated(false);
        addActivity('Parent logged out');
    };

    const updateSettings = (newSettings) => {
        setSettings(prev => ({ ...prev, ...newSettings }));
        addActivity(`Settings updated: ${Object.keys(newSettings).join(', ')}`);
    };

    const addActivity = (action) => {
        setActivityLog(prev => [
            { action, timestamp: new Date().toISOString() },
            ...prev.slice(0, 19) // Keep last 20
        ]);
    };

    const value = {
        isAuthenticated,
        login,
        logout,
        settings,
        updateSettings,
        childStats,
        activityLog,
        addActivity
    };

    return (
        <ParentContext.Provider value={value}>
            {children}
        </ParentContext.Provider>
    );
};
