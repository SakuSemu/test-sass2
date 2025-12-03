import React, { createContext, useState, useContext } from 'react';

const CurrencyContext = createContext();

export const useCurrency = () => useContext(CurrencyContext);

export const CurrencyProvider = ({ children }) => {
    const [currency, setCurrency] = useState('USD'); // USD, EUR, JPY
    const [coins, setCoins] = useState(150);
    const [inventory, setInventory] = useState([]);

    const getCurrencySymbol = () => {
        switch (currency) {
            case 'EUR': return '€';
            case 'JPY': return '¥';
            default: return '$';
        }
    };

    const addCoins = (amount) => {
        setCoins(prev => prev + amount);
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

    const value = {
        currency,
        setCurrency,
        coins,
        addCoins,
        spendCoins,
        inventory,
        addToInventory,
        getCurrencySymbol
    };

    return (
        <CurrencyContext.Provider value={value}>
            {children}
        </CurrencyContext.Provider>
    );
};
