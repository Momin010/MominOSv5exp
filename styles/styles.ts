import React from 'react';

type StyleDictionary = { [key: string]: React.CSSProperties };

export const styles: StyleDictionary = {
    // --- Main OS ---
    desktop: {
        width: '100vw',
        height: '100vh',
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: 'var(--background-color)',
    },

    // --- Top Bar ---
    topBar: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '30px',
        backgroundColor: 'var(--ui-bg)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 15px',
        boxSizing: 'border-box',
        zIndex: 10000,
        borderBottom: '1px solid var(--border-color)',
    },
    topBarMenu: {
        fontWeight: 500,
    },

    // --- Window ---
    window: {
        position: 'absolute',
        backgroundColor: 'var(--ui-bg)',
        border: '1px solid var(--border-color)',
        borderRadius: '10px',
        boxShadow: '0 8px 32px 0 var(--shadow-color)',
        display: 'flex',
        flexDirection: 'column',
        minWidth: '300px',
        minHeight: '150px',
        animation: 'scaleIn 0.2s ease-out forwards',
        transition: 'width 0.2s ease-out, height 0.2s ease-out, top 0.2s ease-out, left 0.2s ease-out, border-radius 0.2s ease-out',
    },
    titleBar: {
        height: '36px',
        backgroundColor: 'var(--ui-bg-light)',
        borderTopLeftRadius: 'inherit',
        borderTopRightRadius: 'inherit',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 12px',
        cursor: 'move',
        flexShrink: 0,
        borderBottom: '1px solid var(--border-color)',
    },
    titleBarInfo: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        fontWeight: '500',
    },
    icon: {
        width: '20px',
        height: '20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    windowControls: {
        display: 'flex',
        gap: '8px',
    },
    windowControlButton: {
        width: '14px',
        height: '14px',
        borderRadius: '50%',
        border: 'none',
        cursor: 'pointer',
        padding: 0,
    },
    closeButton: { backgroundColor: 'var(--accent-color-red)' },
    minimizeButton: { backgroundColor: 'var(--accent-color-yellow)' },
    maximizeButton: { backgroundColor: 'var(--accent-color-green)' },
    windowContent: {
        flex: 1,
        overflow: 'auto',
        borderBottomLeftRadius: 'inherit',
        borderBottomRightRadius: 'inherit',
        position: 'relative'
    },
     resizeHandle: {
        position: 'absolute',
        width: '16px',
        height: '16px',
        right: 0,
        bottom: 0,
        cursor: 'nwse-resize',
        zIndex: 10
    },

    // --- Dock ---
    dock: {
        position: 'absolute',
        bottom: '15px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        gap: '5px',
        padding: '8px',
        backgroundColor: 'var(--ui-bg)',
        border: '1px solid var(--border-color)',
        borderRadius: '12px',
        boxShadow: '0 4px 20px var(--shadow-color)',
        zIndex: 10000,
    },
    dockItem: {
        position: 'relative',
        cursor: 'pointer',
        padding: '4px',
    },
    dockIcon: {
        width: '48px',
        height: '48px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
    },
    runningIndicator: {
        position: 'absolute',
        bottom: '0px',
        left: '50%',
        transform: 'translateX(-50%)',
        width: '5px',
        height: '5px',
        backgroundColor: 'white',
        borderRadius: '50%',
    },

    // --- System Tray ---
    systemTray: {
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        gap: '15px',
    },
    trayIcon: {
        height: '100%',
        display: 'flex',
        alignItems: 'center',
    },
    time: {
        fontWeight: 500,
    },
    
    // --- Apps ---
    appContainer: {
        padding: '20px',
        boxSizing: 'border-box',
        height: '100%',
        overflowY: 'auto',
    },
};