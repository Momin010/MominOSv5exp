import React, { useState, useRef, useEffect } from 'react';
import { ai } from '../../lib/gemini';
import { GenerateContentResponse } from '@google/genai';

interface Message {
    sender: 'user' | 'ai';
    text: string;
}

const SierraAIApp = () => {
    const [messages, setMessages] = useState<Message[]>([
        { sender: 'ai', text: "Hello! I'm Sierra, your AI assistant. How can I help you today?" }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }

    useEffect(scrollToBottom, [messages]);

    const handleSend = async () => {
        if (!input.trim() || isLoading) return;

        const userMessage: Message = { sender: 'user', text: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const response: GenerateContentResponse = await ai.models.generateContent({
                model: 'gemini-2.5-flash',
                contents: [{
                    parts: [{ text: input }]
                }],
            });

            const aiMessage: Message = { sender: 'ai', text: response.text };
            setMessages(prev => [...prev, aiMessage]);
        } catch (error) {
            console.error("Error calling Gemini API:", error);
            const errorMessage: Message = { sender: 'ai', text: "Sorry, I encountered an error. Please try again." };
            setMessages(prev => [...prev, errorMessage]);
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#2a2a2e' }}>
            <div style={{ flex: 1, overflowY: 'auto', padding: '10px' }}>
                {messages.map((msg, index) => (
                    <div key={index} style={{
                        marginBottom: '10px',
                        display: 'flex',
                        justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start'
                    }}>
                        <div style={{
                            background: msg.sender === 'user' ? 'var(--accent-color)' : '#444',
                            color: 'white',
                            padding: '8px 12px',
                            borderRadius: '16px',
                            maxWidth: '70%',
                        }}>
                            {msg.text}
                        </div>
                    </div>
                ))}
                {isLoading && <div style={{textAlign: 'center', color: '#888'}}>Sierra is thinking...</div>}
                <div ref={messagesEndRef} />
            </div>
            <div style={{ display: 'flex', padding: '10px', borderTop: '1px solid #444' }}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Ask Sierra..."
                    style={{ flex: 1, background: '#333', color: 'white', border: '1px solid #555', borderRadius: '20px', padding: '10px 15px', outline: 'none' }}
                    disabled={isLoading}
                />
                <button onClick={handleSend} disabled={isLoading} style={{ marginLeft: '10px', background: 'var(--accent-color)', border: 'none', color: 'white', borderRadius: '20px', padding: '10px 20px', cursor: 'pointer' }}>
                    Send
                </button>
            </div>
        </div>
    );
};

export default SierraAIApp;
