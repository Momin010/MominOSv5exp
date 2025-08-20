import React from 'react';
import { styles } from '../styles/styles';

interface AppConfig {
    id: string;
    title: string;
    icon: string;
}

interface DockProps {
    apps: AppConfig[];
    onAppClick: (id: string) => void;
    runningApps: string[];
}

const Dock: React.FC<DockProps> = ({ apps, onAppClick, runningApps }) => {
    return (
        <div style={styles.dock}>
            {apps.map(app => (
                <div 
                    key={app.id} 
                    className="dock-item" 
                    style={styles.dockItem} 
                    onClick={() => onAppClick(app.id)}
                    title={app.title}
                >
                    <div className="dock-icon" style={styles.dockIcon} dangerouslySetInnerHTML={{ __html: app.icon }} />
                     {runningApps.includes(app.id) && <div style={styles.runningIndicator}></div>}
                </div>
            ))}
        </div>
    );
};

export default Dock;