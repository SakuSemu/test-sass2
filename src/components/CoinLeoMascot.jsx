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
                return {
                    leftEye: { cx: 35, cy: 45, r: 3 },
                    rightEye: { cx: 65, cy: 45, r: 3 },
                    mouth: 'M 30 60 Q 50 70 70 60'
                };
            case 'excited':
                return {
                    leftEye: { cx: 35, cy: 45, r: 4 },
                    rightEye: { cx: 65, cy: 45, r: 4 },
                    mouth: 'M 25 60 Q 50 75 75 60'
                };
            case 'thinking':
                return {
                    leftEye: { cx: 35, cy: 45, r: 2 },
                    rightEye: { cx: 65, cy: 45, r: 2 },
                    mouth: 'M 35 65 L 65 65'
                };
            case 'surprised':
                return {
                    leftEye: { cx: 35, cy: 45, r: 5 },
                    rightEye: { cx: 65, cy: 45, r: 5 },
                    mouth: 'M 45 65 Q 50 70 55 65'
                };
            case 'proud':
                return {
                    leftEye: { cx: 35, cy: 45, r: 3 },
                    rightEye: { cx: 65, cy: 45, r: 3 },
                    mouth: 'M 30 62 Q 50 72 70 62'
                };
            default:
                return {
                    leftEye: { cx: 35, cy: 45, r: 3 },
                    rightEye: { cx: 65, cy: 45, r: 3 },
                    mouth: 'M 30 60 Q 50 70 70 60'
                };
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
                y="30"
                fontSize="20"
                fontWeight="bold"
                fill="#FFF"
                textAnchor="middle"
                opacity="0.7"
            >
                {getSymbol()}
            </text>

            {/* Eyes - circles instead of text */}
            <circle {...face.leftEye} fill="#333" />
            <circle {...face.rightEye} fill="#333" />

            {/* Eye shine */}
            <circle cx={face.leftEye.cx - 1} cy={face.leftEye.cy - 1} r="1" fill="white" opacity="0.8" />
            <circle cx={face.rightEye.cx - 1} cy={face.rightEye.cy - 1} r="1" fill="white" opacity="0.8" />

            {/* Mouth - SVG path */}
            <path
                d={face.mouth}
                stroke="#333"
                strokeWidth="2.5"
                fill="none"
                strokeLinecap="round"
            />

            {/* Shine Effect */}
            <circle cx="35" cy="25" r="8" fill="white" opacity="0.6" />
            <circle cx="32" cy="23" r="4" fill="white" opacity="0.8" />
        </svg>
    );
};

export default CoinLeoMascot;
