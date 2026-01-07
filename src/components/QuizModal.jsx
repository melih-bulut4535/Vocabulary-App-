import React, { useState, useEffect } from 'react';
import { X, Check, X as XIcon, Trophy, HelpCircle, Play } from 'lucide-react';
import confetti from 'canvas-confetti';

const QuizModal = ({ isOpen, onClose, words }) => {
    const [gameState, setGameState] = useState('intro'); // intro, playing, result
    const [questions, setQuestions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isFlipped, setIsFlipped] = useState(false);
    const [score, setScore] = useState(0);

    // Initialize Quiz
    useEffect(() => {
        if (isOpen) {
            setGameState('intro');
            setScore(0);
            setCurrentIndex(0);
            setIsFlipped(false);
        }
    }, [isOpen]);

    const startQuiz = () => {
        if (words.length < 3) return; // Need at least 3 words

        // Shuffle and pick 5 (or fewer if total < 5)
        const shuffled = [...words].sort(() => 0.5 - Math.random());
        const selected = shuffled.slice(0, 5);
        setQuestions(selected);
        setGameState('playing');
    };

    const handleFlip = () => {
        setIsFlipped(true);
    };

    const handleAnswer = (correct) => {
        if (correct) setScore(prev => prev + 1);

        if (currentIndex < questions.length - 1) {
            // Next question
            setTimeout(() => {
                setIsFlipped(false);
                setCurrentIndex(prev => prev + 1);
            }, 300);
        } else {
            // Finish
            setGameState('result');
            if (correct && score + 1 === questions.length) {
                triggerConfetti();
            }
        }
    };

    const triggerConfetti = () => {
        const duration = 3000;
        const end = Date.now() + duration;

        (function frame() {
            confetti({
                particleCount: 2,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: ['#8b5cf6', '#06b6d4', '#f472b6']
            });
            confetti({
                particleCount: 2,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: ['#8b5cf6', '#06b6d4', '#f472b6']
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        }());
    };

    if (!isOpen) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(15, 23, 42, 0.9)',
            backdropFilter: 'blur(8px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
        }}>
            <div className="quiz-container" style={{
                background: 'var(--bg-card)',
                padding: '2rem',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid rgba(139, 92, 246, 0.3)',
                width: '90%',
                maxWidth: '500px',
                position: 'relative',
                boxShadow: '0 0 50px rgba(139, 92, 246, 0.2)',
                minHeight: '400px',
                display: 'flex',
                flexDirection: 'column'
            }}>
                <button
                    onClick={onClose}
                    style={{
                        position: 'absolute',
                        top: '1rem',
                        right: '1rem',
                        background: 'transparent',
                        color: 'var(--text-muted)'
                    }}
                >
                    <X size={24} />
                </button>

                {gameState === 'intro' && (
                    <div style={{ textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '1.5rem' }}>
                        <div style={{
                            background: 'linear-gradient(135deg, var(--primary), var(--accent))',
                            padding: '20px',
                            borderRadius: '50%',
                            marginBottom: '10px'
                        }}>
                            <Trophy size={48} color="white" />
                        </div>
                        <h2 style={{ fontSize: '2rem', fontWeight: 700 }}>Quiz Time!</h2>
                        <p style={{ color: 'var(--text-muted)' }}>
                            Test yourself on {Math.min(words.length, 5)} random words from your collection.
                        </p>

                        {words.length < 3 ? (
                            <div style={{
                                padding: '1rem',
                                background: 'rgba(239, 68, 68, 0.1)',
                                color: '#f87171',
                                borderRadius: 'var(--radius-md)'
                            }}>
                                You need at least 3 words to start. Add more!
                            </div>
                        ) : (
                            <button
                                onClick={startQuiz}
                                style={{
                                    background: 'var(--primary)',
                                    color: 'white',
                                    padding: '1rem 3rem',
                                    borderRadius: 'var(--radius-lg)',
                                    fontSize: '1.2rem',
                                    fontWeight: 600,
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    marginTop: '1rem'
                                }}
                            >
                                <Play size={24} fill="white" />
                                Start Now
                            </button>
                        )}
                    </div>
                )}

                {gameState === 'playing' && (
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                        {/* Progress */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                            <span>Question {currentIndex + 1} / {questions.length}</span>
                            <span>Score: {score}</span>
                        </div>

                        {/* Card Area */}
                        <div style={{
                            flex: 1,
                            perspective: '1000px',
                            marginBottom: '2rem'
                        }}>
                            <div style={{
                                position: 'relative',
                                width: '100%',
                                height: '100%',
                                textAlign: 'center',
                                transition: 'transform 0.6s',
                                transformStyle: 'preserve-3d',
                                transform: isFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
                                background: 'var(--bg-input)',
                                borderRadius: 'var(--radius-lg)',
                                border: '1px solid rgba(255,255,255,0.05)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding: '2rem'
                            }} onClick={!isFlipped ? handleFlip : undefined}>

                                {/* Main Side (Front) */}
                                <div style={{
                                    position: 'absolute',
                                    backfaceVisibility: 'hidden',
                                }}>
                                    <p style={{ color: 'var(--text-muted)', marginBottom: '1rem' }}>What does this mean?</p>
                                    <h3 style={{ fontSize: '2.5rem', fontWeight: 700 }}>{questions[currentIndex].term}</h3>
                                    <p style={{ marginTop: '2rem', fontSize: '0.9rem', opacity: 0.7 }}>(Tap to reveal)</p>
                                </div>

                                {/* Back Side */}
                                <div style={{
                                    position: 'absolute',
                                    backfaceVisibility: 'hidden',
                                    transform: 'rotateY(180deg)'
                                }}>
                                    <h3 style={{ fontSize: '2rem', color: 'var(--accent)', fontWeight: 700, marginBottom: '1rem' }}>
                                        {questions[currentIndex].translation}
                                    </h3>
                                    <p style={{ fontStyle: 'italic', color: 'var(--text-muted)' }}>
                                        "{questions[currentIndex].example}"
                                    </p>
                                </div>

                            </div>
                        </div>

                        {/* Controls */}
                        {!isFlipped ? (
                            <button
                                onClick={handleFlip}
                                style={{
                                    width: '100%',
                                    padding: '1rem',
                                    background: 'var(--bg-input)',
                                    border: '1px solid rgba(255,255,255,0.1)',
                                    borderRadius: 'var(--radius-md)',
                                    color: 'white'
                                }}
                            >
                                Show Answer
                            </button>
                        ) : (
                            <div style={{ display: 'flex', gap: '1rem' }}>
                                <button
                                    onClick={() => handleAnswer(false)}
                                    style={{
                                        flex: 1,
                                        padding: '1rem',
                                        background: 'rgba(239, 68, 68, 0.2)',
                                        border: '1px solid rgba(239, 68, 68, 0.5)',
                                        color: '#fca5a5',
                                        borderRadius: 'var(--radius-md)',
                                        fontWeight: 600
                                    }}
                                >
                                    I missed it
                                </button>
                                <button
                                    onClick={() => handleAnswer(true)}
                                    style={{
                                        flex: 1,
                                        padding: '1rem',
                                        background: 'rgba(34, 197, 94, 0.2)',
                                        border: '1px solid rgba(34, 197, 94, 0.5)',
                                        color: '#86efac',
                                        borderRadius: 'var(--radius-md)',
                                        fontWeight: 600
                                    }}
                                >
                                    I knew it!
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {gameState === 'result' && (
                    <div style={{ textAlign: 'center', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '1rem' }}>
                        <h2 style={{ fontSize: '2.5rem' }}>
                            {score === questions.length ? 'Perfect!' : 'Well Done!'}
                        </h2>
                        <div style={{
                            fontSize: '4rem',
                            fontWeight: 800,
                            background: 'linear-gradient(to right, var(--primary), var(--accent))',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                        }}>
                            {score} / {questions.length}
                        </div>
                        <p style={{ color: 'var(--text-muted)' }}>correct answers</p>

                        <button
                            onClick={onClose}
                            style={{
                                marginTop: '2rem',
                                background: 'var(--bg-input)',
                                padding: '1rem 2rem',
                                borderRadius: 'var(--radius-md)',
                                color: 'white',
                                border: '1px solid rgba(255,255,255,0.1)'
                            }}
                        >
                            Close Quiz
                        </button>
                    </div>
                )}

            </div>
        </div>
    );
};

export default QuizModal;
