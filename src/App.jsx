import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import VocabInput from './components/VocabInput';
import Flashcard from './components/Flashcard';
import SettingsModal from './components/SettingsModal';
import QuizModal from './components/QuizModal';
import './styles/index.css';

function App() {
  const [words, setWords] = useState(() => {
    try {
      const saved = localStorage.getItem('vocabArgs');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error("Failed to load words", e);
      return [];
    }
  });

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem('vocabArgs', JSON.stringify(words));
  }, [words]);

  const addWord = (newWord) => {
    setWords(prev => [newWord, ...prev]);
  };

  return (
    <Layout
      onOpenSettings={() => setIsSettingsOpen(true)}
      onOpenQuiz={() => setIsQuizOpen(true)}
    >
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />

      <QuizModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        words={words}
      />

      <section style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h2 style={{
          fontSize: '2.5rem',
          marginBottom: '1rem',
          background: 'linear-gradient(to bottom, #fff, #cbd5e1)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          Expand Your Vocabulary
        </h2>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', maxWidth: '500px', margin: '0 auto' }}>
          Enter a word below. Our AI assistant will translate it and create a flashcard for you.
        </p>
      </section>

      <VocabInput onAddWord={addWord} />

      <section>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h3 style={{ fontSize: '1.5rem', fontWeight: 600 }}>Your Collection</h3>
          <span style={{
            background: 'rgba(255,255,255,0.05)',
            padding: '6px 16px',
            borderRadius: '20px',
            fontSize: '0.9rem',
            color: 'var(--text-main)',
            border: '1px solid rgba(255,255,255,0.05)'
          }}>
            {words.length} cards
          </span>
        </div>

        {words.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '4rem 2rem',
            border: '2px dashed rgba(255,255,255,0.05)',
            borderRadius: 'var(--radius-lg)',
            color: 'var(--text-muted)',
            background: 'rgba(255,255,255,0.01)'
          }}>
            <p style={{ marginBottom: '1rem', fontSize: '1.2rem' }}>✨ No words yet</p>
            <p style={{ fontSize: '0.9rem' }}>Type a word above to get started!</p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1.5rem'
          }}>
            {words.map(word => (
              <Flashcard key={word.id} word={word} />
            ))}
          </div>
        )}
      </section>
    </Layout>
  );
}

export default App;
