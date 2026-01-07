import React, { useState, useEffect } from 'react';
import { X, Save, Key, Trash2, Activity, AlertCircle, CheckCircle } from 'lucide-react';

const SettingsModal = ({ isOpen, onClose }) => {
    const [apiKey, setApiKey] = useState('');
    const [savedKey, setSavedKey] = useState('');
    const [testResult, setTestResult] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const stored = localStorage.getItem('geminiApiKey');
        if (stored) {
            setSavedKey(stored);
            setApiKey(stored);
        }
    }, [isOpen]);

    const handleSave = () => {
        if (apiKey.trim()) {
            localStorage.setItem('geminiApiKey', apiKey.trim());
            setSavedKey(apiKey.trim());
            onClose();
        }
    };

    const clearKey = () => {
        localStorage.removeItem('geminiApiKey');
        setApiKey('');
        setSavedKey('');
        setTestResult(null);
    };

    const testConnection = async () => {
        if (!apiKey) return;
        setLoading(true);
        setTestResult(null);

        try {
            // Raw fetch to list models
            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
            const data = await response.json();

            if (response.ok) {
                setTestResult({ success: true, data });
            } else {
                setTestResult({ success: false, error: data.error || { message: "Unknown Error" } });
            }
        } catch (e) {
            setTestResult({ success: false, error: { message: e.message } });
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(15, 23, 42, 0.8)',
            backdropFilter: 'blur(5px)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000
        }}>
            <div className="settings-modal" style={{
                background: 'var(--bg-card)',
                padding: '2rem',
                borderRadius: 'var(--radius-lg)',
                border: '1px solid rgba(255,255,255,0.1)',
                width: '90%',
                maxWidth: '600px',
                maxHeight: '80vh',
                overflowY: 'auto',
                position: 'relative',
                boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)'
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

                <h2 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <Key size={24} color="var(--primary)" />
                    API Settings
                </h2>

                <div style={{ marginBottom: '1.5rem' }}>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)' }}>
                        Google Gemini API Key
                    </label>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <input
                            type="password"
                            value={apiKey}
                            onChange={(e) => setApiKey(e.target.value)}
                            placeholder="AIzaSy..."
                            style={{
                                flex: 1,
                                padding: '1rem',
                                background: 'var(--bg-input)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: 'var(--radius-md)',
                                color: 'white',
                                fontSize: '1rem'
                            }}
                        />
                        <button
                            onClick={testConnection}
                            disabled={loading || !apiKey}
                            style={{
                                padding: '0 1rem',
                                background: 'var(--bg-input)',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: 'var(--radius-md)',
                                color: 'var(--secondary)',
                                cursor: loading ? 'wait' : 'pointer'
                            }}
                        >
                            {loading ? <Activity className="animate-spin" /> : <Activity />}
                        </button>
                    </div>

                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                        Stored locally. Get key from <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer" style={{ color: 'var(--primary)' }}>Google AI Studio</a>.
                    </p>
                </div>

                {/* Diagnostic Output */}
                {testResult && (
                    <div style={{
                        marginBottom: '1.5rem',
                        padding: '1rem',
                        borderRadius: 'var(--radius-md)',
                        background: testResult.success ? 'rgba(34, 197, 94, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                        border: `1px solid ${testResult.success ? '#22c55e' : '#ef4444'}`,
                        fontSize: '0.85rem'
                    }}>
                        <h4 style={{
                            color: testResult.success ? '#22c55e' : '#ef4444',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            marginBottom: '0.5rem'
                        }}>
                            {testResult.success ? <CheckCircle size={16} /> : <AlertCircle size={16} />}
                            {testResult.success ? "Connection Successful" : "Connection Failed"}
                        </h4>

                        {testResult.success ? (
                            <div>
                                <p style={{ marginBottom: '0.5rem' }}>Available Models:</p>
                                <div style={{ maxHeight: '100px', overflowY: 'auto', background: 'rgba(0,0,0,0.2)', padding: '0.5rem', borderRadius: '4px' }}>
                                    {testResult.data.models ? testResult.data.models.map(m => (
                                        <div key={m.name}>{m.name.split('/').pop()}</div>
                                    )) : 'No models list return'}
                                </div>
                            </div>
                        ) : (
                            <pre style={{ whiteSpace: 'pre-wrap', color: '#ef4444' }}>
                                {JSON.stringify(testResult.error, null, 2)}
                            </pre>
                        )}
                    </div>
                )}

                <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                    {savedKey && (
                        <button
                            onClick={clearKey}
                            style={{
                                background: 'rgba(239, 68, 68, 0.1)',
                                color: '#ef4444',
                                padding: '0.75rem 1.5rem',
                                borderRadius: 'var(--radius-md)',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                marginRight: 'auto'
                            }}
                        >
                            <Trash2 size={18} />
                            Clear
                        </button>
                    )}

                    <button
                        onClick={onClose}
                        style={{
                            background: 'transparent',
                            color: 'var(--text-main)',
                            padding: '0.75rem 1.5rem',
                            borderRadius: 'var(--radius-md)',
                            border: '1px solid rgba(255,255,255,0.1)'
                        }}
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleSave}
                        style={{
                            background: 'var(--primary)',
                            color: 'white',
                            padding: '0.75rem 1.5rem',
                            borderRadius: 'var(--radius-md)',
                            fontWeight: 600,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}
                    >
                        <Save size={18} />
                        Save Key
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SettingsModal;
