import React from 'react';
import { useCurrency } from '../context/CurrencyContext';

const CoinLeoMascot = ({ mood = 'happy', size = 150 }) => {
    const { currency, getCurrencySymbol } = useCurrency();
    const symbol = getCurrencySymbol();

    // Simple SVG generation based on currency
    const getMascotColor = () => {
        switch (currency) {
            case 'EUR': return '#3B82F6'; // Blue for Euro
            case 'JPY': return '#EF4444'; // Red for Yen
            default: return '#FFD700'; // Gold for Dollar
        }
    };

    const color = getMascotColor();

    return (
        <div style={{ width: size, height: size, position: 'relative', display: 'inline-block' }}>
            <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                {/* Body/Coin */}
                <circle cx="100" cy="100" r="90" fill={color} stroke="#B45309" strokeWidth="5" />
                <circle cx="100" cy="100" r="75" fill="none" stroke="#FFF" strokeWidth="3" opacity="0.5" />

                {/* Currency Symbol on Chest/Belly */}
                <text x="100" y="160" textAnchor="middle" fill="#FFF" fontSize="40" fontWeight="bold" opacity="0.8">{symbol}</text>

                {/* Eyes */}
                <circle cx="70" cy="80" r="10" fill="#FFF" />
                <circle cx="70" cy="80" r="5" fill="#000" />
                <circle cx="130" cy="80" r="10" fill="#FFF" />
                <circle cx="130" cy="80" r="5" fill="#000" />

                {/* Mouth based on mood */}
                {mood === 'happy' && (
                    <path d="M 60 110 Q 100 140 140 110" stroke="#000" strokeWidth="5" fill="none" strokeLinecap="round" />
                )}
                {mood === 'thinking' && (
                    <line x1="70" y1="120" x2="130" y2="120" stroke="#000" strokeWidth="5" strokeLinecap="round" />
                )}
                {mood === 'excited' && (
                    <path d="M 60 110 Q 100 150 140 110 Z" fill="#000" />
                )}

                {/* Mane/Hair details */}
                <path d="M 50 30 Q 100 10 150 30" stroke={color} strokeWidth="10" fill="none" />
            </svg>
        </div>
    );
};

export default CoinLeoMascot;
