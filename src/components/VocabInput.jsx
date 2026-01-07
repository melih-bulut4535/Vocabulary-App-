import React, { useState } from 'react';
import { Search, Loader2, Plus, ArrowRight } from 'lucide-react';
import { detectAndTranslate } from '../services/aiService';
import { v4 as uuidv4 } from 'uuid';

const VocabInput = ({ onAddWord }) => {
    const [term, setTerm] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [result, setResult] = useState(null);

    const handleSearch = async (e) => {
        e.preventDefault();
        if (!term.trim()) return;

        setIsLoading(true);
        setResult(null);

        try {
            const data = await detectAndTranslate(term);
            setResult({ ...data, term: term });
        } catch (error) {
            console.error("AI Error:", error);
            alert(error.message); // Simple alert for immediate feedback
        } finally {
            setIsLoading(false);
        }
    };

    const handleSave = () => {
        if (!result) return;

        // Create the final card object
        const newCard = {
            id: uuidv4(),
            term: result.term, // User input (preserving case if desired, or standardized)
            translation: result.translation,
            language: result.language,
            example: result.example,
            createdAt: new Date().toISOString(),
            group: new Date().toLocaleDateString()
        };

        onAddWord(newCard);
        setTerm('');
        setResult(null);
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem',
            marginBottom: '3rem'
        }}>
            {/* Input Area */}
            <form onSubmit={handleSearch} style={{ position: 'relative' }}>
                <div style={{
                    position: 'absolute',
                    left: '1.25rem',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: 'var(--text-muted)'
                }}>
                    {isLoading ? <Loader2 className="animate-spin" /> : <Search />}
                </div>

                <input
                    type="text"
                    value={term}
                    onChange={(e) => setTerm(e.target.value)}
                    placeholder="Type a word (e.g., 'Apple' or 'Elma')..."
                    disabled={isLoading}
                    style={{
                        width: '100%',
                        padding: '1.5rem 1.5rem 1.5rem 3.5rem',
                        fontSize: '1.1rem',
                        backgroundColor: 'var(--bg-card)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: 'var(--radius-lg)',
                        color: 'white',
                        outline: 'none',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                        transition: 'all 0.3s ease'
                    }}
                    onFocus={(e) => e.target.style.borderColor = 'var(--primary)'}
                    onBlur={(e) => e.target.style.borderColor = 'rgba(255,255,255,0.1)'}
                />
                <button
                    type="submit"
                    disabled={!term || isLoading}
                    style={{
                        position: 'absolute',
                        right: '10px',
                        top: '10px',
                        bottom: '10px',
                        padding: '0 1.5rem',
                        background: 'var(--primary)',
                        color: 'white',
                        borderRadius: 'var(--radius-md)',
                        fontWeight: 600,
                        opacity: (!term || isLoading) ? 0.5 : 1,
                        transition: 'all 0.2s'
                    }}
                >
                    Analyze
                </button>
            </form>

            {/* Result Preview Card */}
            {result && (
                <div className="animate-fade-in" style={{
                    background: 'rgba(30, 41, 59, 0.7)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(139, 92, 246, 0.2)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '1.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                    boxShadow: '0 10px 30px -5px rgba(0, 0, 0, 0.3)'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>{result.term}</h3>
                            <p style={{ color: 'var(--secondary)', fontSize: '0.9rem', fontWeight: 500 }}>
                                {result.language === 'en' ? 'English' : 'Turkish'} detected
                            </p>
                        </div>
                        <div style={{
                            background: 'rgba(255,255,255,0.05)',
                            padding: '0.5rem',
                            borderRadius: '50px'
                        }}>
                            <ArrowRight color="var(--text-muted)" />
                        </div>
                        <div style={{ textAlign: 'right' }}>
                            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.25rem', color: 'var(--accent)' }}>
                                {result.translation}
                            </h3>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Translation</p>
                        </div>
                    </div>

                    <div style={{
                        background: 'rgba(0,0,0,0.2)',
                        padding: '1rem',
                        borderRadius: 'var(--radius-md)',
                        borderLeft: '4px solid var(--primary)'
                    }}>
                        <p style={{ fontStyle: 'italic', color: 'var(--text-main)' }}>
                            "{result.example}"
                        </p>
                    </div>

                    <button
                        onClick={handleSave}
                        style={{
                            marginTop: '0.5rem',
                            width: '100%',
                            padding: '1rem',
                            background: 'linear-gradient(to right, var(--primary), var(--primary-hover))',
                            color: 'white',
                            borderRadius: 'var(--radius-md)',
                            fontWeight: 600,
                            fontSize: '1rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '0.5rem',
                            boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)'
                        }}
                    >
                        <Plus size={20} />
                        Add to Flashcards
                    </button>
                </div>
            )}
        </div>
    );
};

export default VocabInput;
