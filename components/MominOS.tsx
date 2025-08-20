import React, { useState, useCallback } from 'react';
import { styles } from '../styles/styles';
import Window from './Window';
import Dock from './Dock';
import SystemTray from './SystemTray';
import { APPS, appComponents } from './apps';

type WindowState = {
    id: string;
    title: string;
    icon: string;
    position: { x: number; y: number };
    size: { width: number; height: number };
    zIndex: number;
    isMinimized: boolean;
};

const MominOS: React.FC = () => {
    const [windows, setWindows] = useState<WindowState[]>([
        {
            id: 'welcome',
            title: 'Welcome',
            icon: '',
            position: { x: 150, y: 100 },
            size: { width: 700, height: 400 },
            zIndex: 2,
            isMinimized: false
        }
    ]);
    const [nextZIndex, setNextZIndex] = useState(3);

    const openApp = useCallback((appId: string) => {
        const appConfig = APPS.find(app => app.id === appId);
        if (!appConfig) return;

        const existingWindowIndex = windows.findIndex(w => w.id === appId);
        if (existingWindowIndex !== -1) {
             if (windows[existingWindowIndex].isMinimized) {
                setWindows(currentWindows =>
                    currentWindows.map(w =>
                        w.id === appId ? { ...w, isMinimized: false, zIndex: nextZIndex } : w
                    )
                );
                setNextZIndex(nextZIndex + 1);
            } else {
                focusWindow(appId);
            }
            return;
        }

        const newWindow: WindowState = {
            id: appConfig.id,
            title: appConfig.title,
            icon: appConfig.icon,
            position: { x: Math.random() * 400 + 200, y: Math.random() * 200 + 80 },
            size: { width: 700, height: 500 },
            zIndex: nextZIndex,
            isMinimized: false,
        };

        setWindows(currentWindows => [...currentWindows, newWindow]);
        setNextZIndex(prev => prev + 1);
    }, [nextZIndex, windows]);

    const closeWindow = (id: string) => {
        setWindows(currentWindows => currentWindows.filter(w => w.id !== id));
    };

    const minimizeWindow = (id: string) => {
        setWindows(currentWindows =>
            currentWindows.map(w => (w.id === id ? { ...w, isMinimized: true } : w))
        );
    };

    const focusWindow = (id: string) => {
        setWindows(currentWindows =>
            currentWindows.map(w =>
                w.id === id ? { ...w, zIndex: nextZIndex } : w
            )
        );
        setNextZIndex(prev => prev + 1);
    };

    const updateWindowPosition = (id: string, newPosition: { x: number; y: number }) => {
        setWindows(currentWindows =>
            currentWindows.map(w =>
                w.id === id ? { ...w, position: newPosition } : w
            )
        );
    };

    const updateWindowSize = (id: string, newSize: { width: number; height: number }) => {
         setWindows(currentWindows =>
            currentWindows.map(w =>
                w.id === id ? { ...w, size: newSize } : w
            )
        );
    };

    const runningApps = windows.filter(w => !w.isMinimized).map(w => w.id);

    return (
        <div style={styles.desktop}>
            <div style={styles.topBar}>
                <div style={styles.topBarMenu}>App</div>
                <SystemTray />
            </div>
            {windows.map(win => {
                const AppComponent = appComponents[win.id as keyof typeof appComponents];
                if (win.isMinimized) return null;
                return (
                    <Window
                        key={win.id}
                        id={win.id}
                        title={win.title}
                        icon={win.icon}
                        initialPosition={win.position}
                        initialSize={win.size}
                        zIndex={win.zIndex}
                        onClose={closeWindow}
                        onMinimize={minimizeWindow}
                        onFocus={focusWindow}
                        onPositionChange={updateWindowPosition}
                        onSizeChange={updateWindowSize}
                    >
                        {AppComponent ? <AppComponent /> : <div>App not found</div>}
                    </Window>
                );
            })}
            <Dock apps={APPS} onAppClick={openApp} runningApps={runningApps} />
        </div>
    );
};

export default MominOS;