import React, { useState } from 'react';
import { useCurrency } from '../../context/CurrencyContext';
import { BookOpen, ArrowRight, Check, Star } from 'lucide-react';

const SavingsStory = () => {
    const { addCoins, addXP } = useCurrency();
    const [gameState, setGameState] = useState('intro'); // intro, playing, result
    const [currentScene, setCurrentScene] = useState(0);
    const [choices, setChoices] = useState([]);

    const story = [
        {
            id: 0,
            text: "You really want a new video game that costs $50. You have $20 saved up. What do you do?",
            options: [
                { text: "Spend the $20 on candy instead", outcome: "bad", feedback: "Oh no! Now you have $0 and no game.", coinReward: 0, xpReward: 5 },
                { text: "Save your allowance for 3 weeks", outcome: "good", feedback: "Great choice! Patience pays off.", coinReward: 15, xpReward: 20 },
                { text: "Ask your parents to buy it now", outcome: "neutral", feedback: "They said no, but good try! You still have your $20.", coinReward: 5, xpReward: 10 }
            ]
        },
        {
            id: 1,
            text: "Your friend's birthday is coming up. You want to get them a nice gift.",
            options: [
                { text: "Make a handmade card and buy a small treat", outcome: "good", feedback: "Thoughtful and budget-friendly!", coinReward: 20, xpReward: 25 },
                { text: "Buy an expensive toy you can't afford", outcome: "bad", feedback: "You went into debt! Be careful.", coinReward: 0, xpReward: 5 },
                { text: "Forget about the birthday", outcome: "bad", feedback: "That's not very nice!", coinReward: 0, xpReward: 0 }
            ]
        },
        {
            id: 2,
            text: "You found $10 on the sidewalk! Lucky you!",
            options: [
                { text: "Put it straight into your piggy bank", outcome: "good", feedback: "Excellent saving habit!", coinReward: 25, xpReward: 30 },
                { text: "Buy ice cream for you and a friend", outcome: "good", feedback: "Generous! Sharing is caring.", coinReward: 10, xpReward: 20 },
                { text: "Spend it all on gum immediately", outcome: "neutral", feedback: "Yummy, but maybe save some next time?", coinReward: 5, xpReward: 10 }
            ]
        }
    ];

    const handleChoice = (option) => {
        const newChoices = [...choices, option];
        setChoices(newChoices);

        // Give rewards immediately for feedback
        if (option.coinReward > 0) addCoins(option.coinReward);
        if (option.xpReward > 0) addXP(option.xpReward);

        if (currentScene < story.length - 1) {
            setCurrentScene(prev => prev + 1);
        } else {
            setGameState('result');
        }
    };

    const resetGame = () => {
        setGameState('intro');
        setCurrentScene(0);
        setChoices([]);
    };

    if (gameState === 'intro') {
        return (
            <div className="glass-panel p-8 rounded-2xl text-center max-w-2xl mx-auto">
                <div className="text-6xl mb-4">📖</div>
                <h3 className="text-3xl font-bold mb-4">The Savings Story</h3>
                <p className="text-gray-600 mb-6">
                    Make choices in different situations to see how they affect your savings.
                    Learn about patience, budgeting, and smart spending!
                </p>
                <button className="btn btn-primary text-lg px-8 py-3" onClick={() => setGameState('playing')}>
                    <BookOpen size={20} /> Start Story
                </button>
            </div>
        );
    }

    if (gameState === 'result') {
        const totalCoins = choices.reduce((acc, curr) => acc + curr.coinReward, 0);
        const totalXP = choices.reduce((acc, curr) => acc + curr.xpReward, 0);
        const goodChoices = choices.filter(c => c.outcome === 'good').length;

        return (
            <div className="glass-panel p-8 rounded-2xl text-center max-w-2xl mx-auto animate-slideUp">
                <div className="text-6xl mb-4">🌟</div>
                <h3 className="text-3xl font-bold mb-4">Story Complete!</h3>
                <div className="mb-6">
                    <p className="text-xl mb-2">You made <strong>{goodChoices}</strong> smart financial choices!</p>
                </div>
                <div className="bg-yellow-100 p-4 rounded-xl mb-6">
                    <p className="text-lg font-bold text-yellow-800">
                        Total Earned: +{totalCoins} coins | +{totalXP} XP
                    </p>
                </div>
                <div className="space-y-3 mb-6 text-left">
                    <h4 className="font-bold text-gray-700">Your Journey:</h4>
                    {choices.map((choice, index) => (
                        <div key={index} className="bg-white p-3 rounded-lg border border-gray-100 shadow-sm">
                            <div className="text-sm text-gray-500 mb-1">Scene {index + 1}</div>
                            <div className="font-semibold">{choice.text}</div>
                            <div className={`text-sm ${choice.outcome === 'good' ? 'text-green-600' : choice.outcome === 'bad' ? 'text-red-500' : 'text-blue-500'}`}>
                                {choice.feedback}
                            </div>
                        </div>
                    ))}
                </div>
                <button className="btn btn-primary" onClick={resetGame}>
                    Read Again
                </button>
            </div>
        );
    }

    const scene = story[currentScene];

    return (
        <div className="max-w-2xl mx-auto">
            <div className="glass-panel p-8 rounded-2xl animate-fadeIn">
                <div className="flex items-center justify-between mb-6">
                    <span className="text-sm font-bold text-gray-400 uppercase tracking-wider">Scene {currentScene + 1} of {story.length}</span>
                    <div className="flex gap-1">
                        {[...Array(story.length)].map((_, i) => (
                            <div key={i} className={`h-2 w-8 rounded-full ${i <= currentScene ? 'bg-purple-500' : 'bg-gray-200'}`}></div>
                        ))}
                    </div>
                </div>

                <h3 className="text-2xl font-bold mb-8 leading-relaxed">{scene.text}</h3>

                <div className="space-y-4">
                    {scene.options.map((option, index) => (
                        <button
                            key={index}
                            onClick={() => handleChoice(option)}
                            className="w-full text-left p-4 rounded-xl border-2 border-transparent hover:border-purple-500 hover:bg-purple-50 transition-all group bg-white shadow-sm"
                        >
                            <div className="flex items-center justify-between">
                                <span className="font-semibold text-gray-800 group-hover:text-purple-700">{option.text}</span>
                                <ArrowRight className="text-gray-300 group-hover:text-purple-500" size={20} />
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default SavingsStory;
