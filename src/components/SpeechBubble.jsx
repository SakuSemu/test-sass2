import React, { useState, useEffect } from 'react';

const SpeechBubble = ({ text, mood = 'happy', onComplete }) => {
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setVisible(false);
            if (onComplete) onComplete();
        }, 5000); // Auto-hide after 5 seconds
        return () => clearTimeout(timer);
    }, [onComplete]);

    if (!visible) return null;

    return (
        <div className="absolute -top-24 left-1/2 transform -translate-x-1/2 w-64 z-20 animate-bounce-slow">
            <div className="bg-white p-4 rounded-2xl shadow-xl border-2 border-purple-100 relative">
                <p className="text-gray-800 text-sm font-medium text-center">
                    {text}
                </p>
                {/* Triangle pointer */}
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-4 h-4 bg-white border-b-2 border-r-2 border-purple-100 rotate-45"></div>
            </div>
        </div>
    );
};

export default SpeechBubble;
