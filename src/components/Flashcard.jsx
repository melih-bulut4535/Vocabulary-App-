import React from 'react';
import { Calendar } from 'lucide-react';

const Flashcard = ({ word }) => {
    return (
        <div className="flashcard" style={{
            background: 'var(--bg-card)',
            padding: '1.5rem',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid rgba(255,255,255,0.05)',
            transition: 'all 0.3s ease',
            cursor: 'pointer',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            height: '100%'
        }}
            onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.boxShadow = 'var(--shadow-lg)';
                e.currentTarget.style.borderColor = 'var(--primary)';
            }}
            onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
            }}
        >
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '1rem'
            }}>
                <span style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-main)' }}>
                    {word.term}
                </span>
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    color: 'var(--text-muted)',
                    fontSize: '0.75rem'
                }}>
                    <Calendar size={12} />
                    <span>{new Date(word.createdAt).toLocaleDateString()}</span>
                </div>
            </div>

            <div style={{
                height: '1px',
                width: '100%',
                background: 'linear-gradient(to right, rgba(255,255,255,0.1), transparent)',
                marginBottom: '1rem'
            }} />

            <div style={{ flex: 1 }}>
                <p style={{
                    color: 'var(--accent)',
                    fontWeight: 600,
                    fontSize: '1.1rem',
                    marginBottom: '0.5rem'
                }}>
                    {word.translation}
                </p>
                <p style={{
                    fontSize: '0.95rem',
                    color: 'var(--text-muted)',
                    fontStyle: 'italic',
                    lineHeight: '1.4'
                }}>
                    "{word.example}"
                </p>
            </div>

            <div style={{
                marginTop: '1rem',
                display: 'flex',
                gap: '0.5rem'
            }}>
                <span style={{
                    fontSize: '0.7rem',
                    background: 'rgba(255,255,255,0.05)',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    color: 'var(--secondary)'
                }}>
                    {word.language.toUpperCase()} &rarr; {word.language === 'en' ? 'TR' : 'EN'}
                </span>
            </div>
        </div>
    );
};

export default Flashcard;
