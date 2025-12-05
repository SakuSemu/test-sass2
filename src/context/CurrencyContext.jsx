import React, { createContext, useState, useContext, useEffect } from 'react';

const CurrencyContext = createContext();

export const useCurrency = () => useContext(CurrencyContext);

const LEVEL_FORMULA = (xp) => Math.floor(Math.sqrt(xp / 100)) + 1;

export const CurrencyProvider = ({ children }) => {
    const [currency, setCurrency] = useState('USD');
    const [coins, setCoins] = useState(150);
    const [inventory, setInventory] = useState([]);
    const [xp, setXp] = useState(0);
    const [level, setLevel] = useState(1);
    const [badges, setBadges] = useState([]);
    const [equippedItems, setEquippedItems] = useState({
        hat: null,
        cape: null,
        pet: null,
        accessory: null
    });
    const [stats, setStats] = useState({
        coinBonus: 0,
        xpBoost: 0,
        hintAvailable: false,
        dailyBonus: 0
    });

    // Load from localStorage on mount
    useEffect(() => {
        const savedCurrency = localStorage.getItem('currency');
        const savedCoins = localStorage.getItem('coins');
        const savedInventory = localStorage.getItem('inventory');
        const savedXp = localStorage.getItem('xp');
        const savedLevel = localStorage.getItem('level');
        const savedBadges = localStorage.getItem('badges');
        const savedEquippedItems = localStorage.getItem('equippedItems');

        if (savedCurrency) setCurrency(savedCurrency);
        if (savedCoins) setCoins(parseInt(savedCoins));
        if (savedInventory) setInventory(JSON.parse(savedInventory));
        if (savedXp) setXp(parseFloat(savedXp));
        if (savedLevel) setLevel(parseInt(savedLevel));
        if (savedBadges) setBadges(JSON.parse(savedBadges));
        if (savedEquippedItems) setEquippedItems(JSON.parse(savedEquippedItems));
    }, []);

    // Save to localStorage when state changes
    useEffect(() => {
        localStorage.setItem('currency', currency);
    }, [currency]);

    useEffect(() => {
        localStorage.setItem('coins', coins.toString());
    }, [coins]);

    useEffect(() => {
        localStorage.setItem('inventory', JSON.stringify(inventory));
    }, [inventory]);

    useEffect(() => {
        localStorage.setItem('xp', xp.toString());
    }, [xp]);

    useEffect(() => {
        localStorage.setItem('level', level.toString());
    }, [level]);

    useEffect(() => {
        localStorage.setItem('badges', JSON.stringify(badges));
    }, [badges]);

    useEffect(() => {
        localStorage.setItem('equippedItems', JSON.stringify(equippedItems));
    }, [equippedItems]);

    // Calculate level when XP changes
    useEffect(() => {
        const newLevel = LEVEL_FORMULA(xp);
        if (newLevel > level) {
            setLevel(newLevel);
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

    const addXP = (amount) => {
        const bonusXP = Math.floor(amount * (1 + stats.xpBoost / 100));
        setXp(prev => prev + bonusXP);
        return bonusXP;
    };

    const unlockBadge = (badgeId) => {
        if (!badges.includes(badgeId)) {
            setBadges(prev => [...prev, badgeId]);
            window.dispatchEvent(new CustomEvent('badgeUnlocked', { detail: { badgeId } }));
            return true;
        }
        return false;
    };

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
        currency,
        setCurrency,
        coins,
        addCoins,
        spendCoins,
        inventory,
        addToInventory,
        getCurrencySymbol,
        xp,
        level,
        addXP,
        badges,
        unlockBadge,
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
