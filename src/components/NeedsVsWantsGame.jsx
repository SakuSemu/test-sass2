import React, { useState } from 'react';
import { useCurrency } from '../context/CurrencyContext';
import { Check, X, HelpCircle } from 'lucide-react';

const NeedsVsWantsGame = () => {
    const { addCoins } = useCurrency();
    const [currentRound, setCurrentRound] = useState(0);
    const [score, setScore] = useState(0);
    const [feedback, setFeedback] = useState(null); // 'correct' | 'incorrect'
    const [gameOver, setGameOver] = useState(false);

    const questions = [
        { item: 'Water', type: 'need', reason: 'You need water to survive!' },
        { item: 'New Video Game', type: 'want', reason: 'Games are fun, but not essential for survival.' },
        { item: 'Winter Coat', type: 'need', reason: 'Keeps you warm and safe in the cold.' },
        { item: 'Candy', type: 'want', reason: 'Tasty, but you can live without it.' },
        { item: 'School Books', type: 'need', reason: 'Essential for learning and your future.' },
        { item: 'Fancy Sneakers', type: 'want', reason: 'Regular shoes are a need, but fancy ones are a want.' },
    ];

    const handleAnswer = (answer) => {
        const currentQuestion = questions[currentRound];
        const isCorrect = answer === currentQuestion.type;

        if (isCorrect) {
            setFeedback({ type: 'correct', message: `Correct! ${currentQuestion.reason}` });
            setScore(prev => prev + 10);
            addCoins(10);
        } else {
            setFeedback({ type: 'incorrect', message: `Oops! ${currentQuestion.reason}` });
        }

        setTimeout(() => {
            setFeedback(null);
            if (currentRound < questions.length - 1) {
                setCurrentRound(prev => prev + 1);
            } else {
                setGameOver(true);
            }
        }, 2000);
    };

    const resetGame = () => {
        setCurrentRound(0);
        setScore(0);
        setGameOver(false);
        setFeedback(null);
    };

    if (gameOver) {
        return (
            <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center' }}>
                <h3>Game Over! 🎉</h3>
                <p>You scored {score} points and earned {score} coins!</p>
                <button className="btn btn-primary" onClick={resetGame} style={{ marginTop: '1rem' }}>Play Again</button>
            </div>
        );
    }

    const currentQuestion = questions[currentRound];

    return (
        <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
            <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'space-between', color: 'var(--text-muted)' }}>
                <span>Round {currentRound + 1}/{questions.length}</span>
                <span>Score: {score}</span>
            </div>

            <h3 style={{ fontSize: '1.5rem', marginBottom: '2rem' }}>Is "{currentQuestion.item}" a Need or a Want?</h3>

            <div className="flex-center" style={{ gap: '1rem', marginBottom: '1rem' }}>
                <button
                    className="btn"
                    onClick={() => handleAnswer('need')}
                    style={{ background: '#48BB78', color: 'white', minWidth: '120px' }}
                    disabled={!!feedback}
                >
                    Need
                </button>
                <button
                    className="btn"
                    onClick={() => handleAnswer('want')}
                    style={{ background: '#F56565', color: 'white', minWidth: '120px' }}
                    disabled={!!feedback}
                >
                    Want
                </button>
            </div>

            {feedback && (
                <div style={{
                    marginTop: '1rem',
                    padding: '1rem',
                    borderRadius: 'var(--radius-sm)',
                    background: feedback.type === 'correct' ? 'rgba(72, 187, 120, 0.2)' : 'rgba(245, 101, 101, 0.2)',
                    color: feedback.type === 'correct' ? '#2F855A' : '#C53030',
                    fontWeight: 'bold',
                    animation: 'fadeIn 0.3s ease'
                }}>
                    {feedback.type === 'correct' ? <Check size={20} style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} /> : <X size={20} style={{ verticalAlign: 'middle', marginRight: '0.5rem' }} />}
                    {feedback.message}
                </div>
            )}
        </div>
    );
};

export default NeedsVsWantsGame;
