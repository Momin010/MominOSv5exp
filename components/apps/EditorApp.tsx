import React from 'react';

const EditorApp = () => {
    return (
        <textarea
            style={{
                width: '100%',
                height: '100%',
                background: '#1e1e1e',
                color: '#d4d4d4',
                border: 'none',
                fontFamily: 'monospace',
                fontSize: '14px',
                padding: '10px',
                boxSizing: 'border-box',
                outline: 'none',
                resize: 'none',
            }}
            defaultValue={`function helloWorld() {\n  console.log("Hello, MominOS!");\n}`}
        />
    );
};

export default EditorApp;
