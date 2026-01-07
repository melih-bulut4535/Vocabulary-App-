import React from 'react';
import { Sparkles, Settings, Play } from 'lucide-react';

const Layout = ({ children, onOpenSettings, onOpenQuiz }) => {
    return (
        <div className="layout" style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
            overflow: 'hidden'
        }}>
            {/* Abstract Background Shapes */}
            <div style={{
                position: 'absolute',
                top: '-10%',
                left: '-10%',
                width: '500px',
                height: '500px',
                background: 'radial-gradient(circle, rgba(139, 92, 246, 0.3) 0%, rgba(15, 23, 42, 0) 70%)',
                filter: 'blur(80px)',
                zIndex: -1
            }} />
            <div style={{
                position: 'absolute',
                bottom: '10%',
                right: '-5%',
                width: '400px',
                height: '400px',
                background: 'radial-gradient(circle, rgba(6, 182, 212, 0.2) 0%, rgba(15, 23, 42, 0) 70%)',
                filter: 'blur(60px)',
                zIndex: -1
            }} />

            {/* Header */}
            <header style={{
                padding: '2rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '1rem',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
                backdropFilter: 'blur(10px)',
                backgroundColor: 'rgba(15, 23, 42, 0.6)'
            }}>
                <div style={{
                    background: 'linear-gradient(135deg, var(--primary), var(--accent))',
                    padding: '10px',
                    borderRadius: '12px',
                    display: 'flex',
                    boxShadow: '0 0 20px rgba(139, 92, 246, 0.4)'
                }}>
                    <Sparkles size={24} color="white" />
                </div>
                <h1 style={{
                    fontSize: '1.5rem',
                    background: 'linear-gradient(to right, #fff, #94a3b8)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    letterSpacing: '-0.5px',
                    flex: 1
                }}>
                    Lingo<span style={{ fontWeight: 400 }}>Spark</span>
                </h1>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button
                        onClick={onOpenQuiz}
                        style={{
                            background: 'rgba(139, 92, 246, 0.2)',
                            padding: '8px 16px',
                            borderRadius: '20px',
                            color: 'var(--primary)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            fontWeight: 600,
                            fontSize: '0.9rem',
                            border: '1px solid rgba(139, 92, 246, 0.3)',
                            transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'var(--primary)';
                            e.currentTarget.style.color = 'white';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'rgba(139, 92, 246, 0.2)';
                            e.currentTarget.style.color = 'var(--primary)';
                        }}
                    >
                        <Play size={16} fill="currentColor" />
                        Quiz Mode
                    </button>

                    <button
                        onClick={onOpenSettings}
                        style={{
                            background: 'rgba(255,255,255,0.1)',
                            padding: '8px',
                            borderRadius: '50%',
                            color: 'var(--text-muted)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.2s',
                            width: '40px',
                            height: '40px'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'var(--text-muted)';
                            e.currentTarget.style.color = 'white';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
                            e.currentTarget.style.color = 'var(--text-muted)';
                        }}
                    >
                        <Settings size={20} />
                    </button>
                </div>
            </header>

            {/* Main Content */}
            <main style={{
                flex: 1,
                width: '100%',
                maxWidth: '800px',
                margin: '0 auto',
                padding: '2rem',
                position: 'relative'
            }}>
                {children}
            </main>

            {/* Footer */}
            <footer style={{
                textAlign: 'center',
                padding: '2rem',
                color: 'var(--text-muted)',
                fontSize: '0.875rem'
            }}>
                <p>Powered by AI-Driven Learning</p>
            </footer>
        </div>
    );
};

export default Layout;
