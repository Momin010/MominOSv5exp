import React from 'react';
import { styles } from '../../styles/styles';

const welcomeStyles: { [key: string]: React.CSSProperties } = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        height: '100%',
        padding: '5vw',
        boxSizing: 'border-box',
    },
    h1: {
        fontSize: 'clamp(2rem, 5vw, 3rem)',
        fontWeight: 600,
        margin: '0 0 1rem 0',
        color: 'var(--text-color)',
    },
    p: {
        fontSize: 'clamp(1rem, 2vw, 1.2rem)',
        margin: 0,
        maxWidth: '500px',
        color: 'var(--text-color-dark)',
    }
};

const WelcomeApp = () => (
    <div style={welcomeStyles.container}>
        <h1 style={welcomeStyles.h1}>Welcome to MominOS v5.0.0</h1>
        <p style={welcomeStyles.p}>This is a web-based operating system simulation built with React and powered by Gemini. Explore the apps in the dock below!</p>
    </div>
);

export default WelcomeApp;