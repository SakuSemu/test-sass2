import React, { createContext, useState, useContext, useEffect } from 'react';

const CurrencyContext = createContext();

export const useCurrency = () => useContext(CurrencyContext);

const LEVEL_FORMULA = (xp) => Math.floor(Math.sqrt(xp / 100)) + 1;

export const CurrencyProvider = ({ children }) => {
    // Existing state
    const [currency, setCurrency] = useState('USD'); // USD, EUR, JPY
    const [coins, setCoins] = useState(150);
    const [inventory, setInventory] = useState([]);

    // V3: New progression state
    const [xp, setXp] = useState(0);
    const [level, setLevel] = useState(1);
    const [badges, setBadges] = useState([]);

    // V3: Avatar & equipment state
    const [equippedItems, setEquippedItems] = useState({
        hat: null,
        cape: null,
        pet: null,
        accessory: null
    });

    // V3: Stats from equipped items
    const [stats, setStats] = useState({
        coinBonus: 0,
        xpBoost: 0,
        hintAvailable: false,
        dailyBonus: 0
    });

    // Calculate level when XP changes
    useEffect(() => {
        const newLevel = LEVEL_FORMULA(xp);
        if (newLevel > level) {
            setLevel(newLevel);
            // Trigger level-up event (can be listened to by components)
            window.dispatchEvent(new CustomEvent('levelUp', { detail: { level: newLevel } }));
        }
    }, [xp, level]);

    // Recalculate stats when equipment changes
    useEffect(() => {
        const newStats = {
            coinBonus: 0,
            xpBoost: 0,
            hintAvailable: false,
            dailyBonus: 0
        };

        Object.values(equippedItems).forEach(item => {
            if (item && item.buff) {
                switch (item.buff.type) {
                    case 'coinBonus':
                        newStats.coinBonus += item.buff.value;
                        break;
                    case 'xpBoost':
                        newStats.xpBoost += item.buff.value;
                        break;
                    case 'hint':
                        newStats.hintAvailable = true;
                        break;
                    case 'dailyBonus':
                        newStats.dailyBonus += item.buff.value;
                        break;
                }
            }
        });

        setStats(newStats);
    }, [equippedItems]);

    const getCurrencySymbol = () => {
        switch (currency) {
            case 'EUR': return '€';
            case 'JPY': return '¥';
            default: return '$';
        }
    };

    const addCoins = (amount) => {
        const bonusAmount = Math.floor(amount * (1 + stats.coinBonus / 100));
        setCoins(prev => prev + bonusAmount);
        return bonusAmount;
    };

    const spendCoins = (amount) => {
        if (coins >= amount) {
            setCoins(prev => prev - amount);
            return true;
        }
        return false;
    };

    const addToInventory = (item) => {
        setInventory(prev => [...prev, item]);
    };

    // V3: New XP system
    const addXP = (amount) => {
        const bonusXP = Math.floor(amount * (1 + stats.xpBoost / 100));
        setXp(prev => prev + bonusXP);
        return bonusXP;
    };

    // V3: Badge system
    const unlockBadge = (badgeId) => {
        if (!badges.includes(badgeId)) {
            setBadges(prev => [...prev, badgeId]);
            window.dispatchEvent(new CustomEvent('badgeUnlocked', { detail: { badgeId } }));
            return true;
        }
        return false;
    };

    // V3: Equipment system
    const equipItem = (item) => {
        if (item && item.type) {
            setEquippedItems(prev => ({
                ...prev,
                [item.type]: item
            }));
            return true;
        }
        return false;
    };

    const unequipItem = (slot) => {
        setEquippedItems(prev => ({
            ...prev,
            [slot]: null
        }));
    };

    const value = {
        // Existing
        currency,
        setCurrency,
        coins,
        addCoins,
        spendCoins,
        inventory,
        addToInventory,
        getCurrencySymbol,

        // V3: Progression
        xp,
        level,
        addXP,
        badges,
        unlockBadge,

        // V3: Equipment
        equippedItems,
        equipItem,
        unequipItem,
        stats
    };

    return (
        <CurrencyContext.Provider value={value}>
            {children}
        </CurrencyContext.Provider>
    );
};
