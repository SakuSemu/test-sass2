import React, { useEffect, useState } from 'react';
import { X, Trophy } from 'lucide-react';

const LevelUpModal = ({ level, onClose }) => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        setShow(true);
        const timer = setTimeout(() => {
            setShow(false);
            setTimeout(onClose, 300);
        }, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className={`fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 transition-opacity duration-300 ${show ? 'opacity-100' : 'opacity-0'}`}>
            <div className={`glass-panel p-12 rounded-3xl text-center max-w-md transform transition-all duration-500 ${show ? 'scale-100' : 'scale-75'}`}>
                <div className="text-8xl mb-6 animate-bounce-slow">🎉</div>
                <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                    Level Up!
                </h2>
                <div className="text-6xl font-bold text-purple-600 mb-4">
                    Level {level}
                </div>
                <p className="text-xl text-gray-700">
                    You're getting better at managing money!
                </p>

                {/* Confetti effect */}
                <div className="absolute inset-0 pointer-events-none">
                    {[...Array(20)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute text-2xl animate-pulse"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 2}s`
                            }}
                        >
                            ✨
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const BadgeUnlockedModal = ({ badge, onClose }) => {
    const [show, setShow] = useState(false);

    useEffect(() => {
        setShow(true);
        const timer = setTimeout(() => {
            setShow(false);
            setTimeout(onClose, 300);
        }, 3000);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className={`fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 transition-opacity duration-300 ${show ? 'opacity-100' : 'opacity-0'}`}>
            <div className={`glass-panel p-10 rounded-3xl text-center max-w-md transform transition-all duration-500 ${show ? 'scale-100 rotate-0' : 'scale-75 rotate-12'}`}>
                <div className="text-7xl mb-4">{badge.emoji}</div>
                <div className="flex items-center justify-center gap-2 mb-3">
                    <Trophy className="text-yellow-500" size={28} />
                    <h3 className="text-3xl font-bold">Badge Unlocked!</h3>
                </div>
                <h4 className="text-2xl font-bold text-purple-600 mb-2">{badge.name}</h4>
                <p className="text-gray-600 mb-4">{badge.description}</p>
                <div className="bg-yellow-100 px-4 py-2 rounded-full inline-block">
                    <span className="font-bold text-yellow-800">+{badge.xpReward} XP</span>
                </div>
            </div>
        </div>
    );
};

export { LevelUpModal, BadgeUnlockedModal };
