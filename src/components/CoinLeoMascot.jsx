import React from 'react';
import { useCurrency } from '../context/CurrencyContext';

const CoinLeoMascot = ({ size = 150, mood = 'happy' }) => {
    const { currency } = useCurrency();

    const getColor = () => {
        switch (currency) {
            case 'EUR': return '#3B82F6'; // Blue
            case 'JPY': return '#EF4444'; // Red
            default: return '#FFD700'; // Gold
        }
    };

    const getSymbol = () => {
        switch (currency) {
            case 'EUR': return '€';
            case 'JPY': return '¥';
            default: return '$';
        }
    };

    const getFace = () => {
        switch (mood) {
            case 'happy':
                return { eyes: '^_^', mouth: 'M 30 45 Q 50 55 70 45' };
            case 'excited':
                return { eyes: '★_★', mouth: 'M 25 45 Q 50 60 75 45' };
            case 'thinking':
                return { eyes: '-_-', mouth: 'M 35 50 L 65 50' };
            case 'surprised':
                return { eyes: 'O_O', mouth: 'M 40 55 Q 50 60 60 55' };
            case 'proud':
                return { eyes: '^‿^', mouth: 'M 30 48 Q 50 58 70 48' };
            case 'confused':
                return { eyes: '@_@', mouth: 'M 35 50 Q 45 48 55 50 Q 65 52 70 50' };
            default:
                return { eyes: '^_^', mouth: 'M 30 45 Q 50 55 70 45' };
        }
    };

    const face = getFace();
    const color = getColor();

    return (
        <svg width={size} height={size} viewBox="0 0 100 100" style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))' }}>
            {/* Coin Body */}
            <circle cx="50" cy="50" r="45" fill={color} stroke="#E6C200" strokeWidth="2" />
            <circle cx="50" cy="50" r="40" fill="none" stroke="#E6C200" strokeWidth="1" opacity="0.5" />

            {/* Currency Symbol */}
            <text
                x="50"
                y="35"
                fontSize="24"
                fontWeight="bold"
                fill="#FFF"
                textAnchor="middle"
                opacity="0.7"
            >
                {getSymbol()}
            </text>

            {/* Eyes */}
            <text
                x="50"
                y="50"
                fontSize="16"
                fontWeight="bold"
                fill="#333"
                textAnchor="middle"
            >
                {face.eyes}
            </text>

            {/* Mouth */}
            <path
                d={face.mouth}
                stroke="#333"
                strokeWidth="2"
                fill="none"
                strokeLinecap="round"
            />

            {/* Shine Effect */}
            <circle cx="35" cy="30" r="8" fill="white" opacity="0.6" />
            <circle cx="32" cy="28" r="4" fill="white" opacity="0.8" />
        </svg>
    );
};

export default CoinLeoMascot;
