import React, { useState, useRef, useEffect } from 'react';
import { styles } from '../styles/styles';

interface WindowProps {
    id: string;
    title: string;
    icon: string;
    children: React.ReactNode;
    initialPosition: { x: number; y: number };
    initialSize: { width: number; height: number };
    zIndex: number;
    onClose: (id: string) => void;
    onMinimize: (id: string) => void;
    onFocus: (id: string) => void;
    onPositionChange: (id: string, pos: { x: number; y: number }) => void;
    onSizeChange: (id: string, size: { width: number; height: number }) => void;
}

const Window: React.FC<WindowProps> = ({ id, title, icon, children, initialPosition, initialSize, zIndex, onClose, onMinimize, onFocus, onPositionChange, onSizeChange }) => {
    const [position, setPosition] = useState(initialPosition);
    const [size, setSize] = useState(initialSize);
    const [isDragging, setIsDragging] = useState(false);
    const [isResizing, setIsResizing] = useState(false);
    const [isMaximized, setIsMaximized] = useState(false);
    
    const dragOffset = useRef({ x: 0, y: 0 });
    const preMaximizedState = useRef({ position, size });
    const windowRef = useRef<HTMLDivElement>(null);

    const handleMaximize = () => {
        if (!isMaximized) {
            preMaximizedState.current = { position, size };
        }
        setIsMaximized(!isMaximized);
    };

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        if ((e.target as HTMLElement).closest('.window-control-button') || isMaximized) {
            return;
        }
        onFocus(id);
        setIsDragging(true);
        const windowRect = windowRef.current?.getBoundingClientRect();
        dragOffset.current = {
            x: e.clientX - (windowRect?.left || 0),
            y: e.clientY - (windowRect?.top || 0),
        };
        e.preventDefault();
    };

    const handleResizeMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        if (isMaximized) return;
        onFocus(id);
        setIsResizing(true);
        e.preventDefault();
        e.stopPropagation();
    };
    
    const handleMouseMove = (e: MouseEvent) => {
        if (isDragging) {
            const newPos = {
                x: e.clientX - dragOffset.current.x,
                y: e.clientY - dragOffset.current.y,
            };
            setPosition(newPos);
        }
        if (isResizing) {
            const newSize = {
                width: e.clientX - position.x,
                height: e.clientY - position.y
            };
            if(newSize.width > 300 && newSize.height > 150) {
               setSize(newSize);
            }
        }
    };

    const handleMouseUp = () => {
        if(isDragging) {
            setIsDragging(false);
            onPositionChange(id, position);
        }
        if(isResizing) {
            setIsResizing(false);
            onSizeChange(id, size);
        }
    };

    useEffect(() => {
        if (isDragging || isResizing) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        } else {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, isResizing, position, size]);

    const maximizedStyles: React.CSSProperties = isMaximized ? {
        top: '30px',
        left: '0px',
        width: '100vw',
        height: 'calc(100vh - 120px)', // Desktop height - tray height - dock height
        borderRadius: 0,
    } : {
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${size.width}px`,
        height: `${size.height}px`,
    };

    const windowDynamicStyles: React.CSSProperties = {
        ...styles.window,
        ...maximizedStyles,
        zIndex,
    };

    return (
        <div ref={windowRef} style={windowDynamicStyles} onMouseDown={() => onFocus(id)}>
            <div style={styles.titleBar} onMouseDown={handleMouseDown} onDoubleClick={handleMaximize}>
                 <div style={styles.titleBarInfo}>
                    <div style={styles.icon} dangerouslySetInnerHTML={{ __html: icon }} />
                    <span>{title}</span>
                </div>
                <div style={styles.windowControls}>
                    <button style={{...styles.windowControlButton, ...styles.minimizeButton}} className="window-control-button" onClick={() => onMinimize(id)}></button>
                    <button style={{...styles.windowControlButton, ...styles.maximizeButton}} className="window-control-button" onClick={handleMaximize}></button>
                    <button style={{...styles.windowControlButton, ...styles.closeButton}} className="window-control-button" onClick={() => onClose(id)}></button>
                </div>
            </div>
            <div style={styles.windowContent}>
                {children}
            </div>
            {!isMaximized && <div style={styles.resizeHandle} onMouseDown={handleResizeMouseDown}></div>}
        </div>
    );
};

export default Window;