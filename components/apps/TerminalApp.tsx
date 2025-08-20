import React, { useState, useEffect, useRef } from 'react';

const TerminalApp = () => {
    const [history, setHistory] = useState(['MominOS Terminal v1.0. Type "help" for commands.']);
    const inputRef = useRef<HTMLInputElement>(null);

    const commands: { [key: string]: (args: string[]) => string | void } = {
        help: () => 'Available commands: help, clear, date, echo [text]',
        clear: () => setHistory([]),
        date: () => new Date().toLocaleString(),
        echo: (args) => args.join(' '),
    };

    const handleCommand = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            const target = e.target as HTMLInputElement;
            const commandText = target.value;
            const [cmd, ...args] = commandText.split(' ');
            let output;
            if (commands[cmd]) {
                const result = commands[cmd](args);
                output = result !== undefined ? String(result) : '';
            } else {
                output = `command not found: ${cmd}`;
            }
            const newHistory = [...history, `> ${commandText}`];
            if (output) newHistory.push(output);

            if (cmd === 'clear') {
                setHistory(['MominOS Terminal v1.0. Type "help" for commands.']);
            } else {
                setHistory(newHistory);
            }
            target.value = '';
        }
    };

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    return (
        <div style={{ background: 'rgba(0,0,0,0.8)', color: '#0f0', fontFamily: 'monospace', height: '100%', overflowY: 'auto', padding: '10px' }} onClick={() => inputRef.current?.focus()}>
            {history.map((line, i) => <div key={i}>{line}</div>)}
            <div style={{ display: 'flex' }}>
                <span>&gt;</span>
                <input ref={inputRef} type="text" onKeyDown={handleCommand} style={{ background: 'transparent', border: 'none', color: '#0f0', fontFamily: 'monospace', width: '100%', outline: 'none' }} />
            </div>
        </div>
    );
};

export default TerminalApp;
