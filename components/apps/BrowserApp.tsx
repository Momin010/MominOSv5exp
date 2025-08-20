import React, { useState, useRef } from 'react';

const BrowserApp = () => {
    const [url, setUrl] = useState('https://www.google.com/webhp?igu=1');
    const iframeRef = useRef<HTMLIFrameElement>(null);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        let finalUrl = url;
        if (!finalUrl.startsWith('http')) {
            finalUrl = `https://duckduckgo.com/?q=${encodeURIComponent(finalUrl)}`;
        }
        if (iframeRef.current) {
            iframeRef.current.src = finalUrl;
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', background: '#333' }}>
            <form onSubmit={handleSearch} style={{ display: 'flex', padding: '5px', background: '#444' }}>
                <input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    style={{ flex: 1, background: '#222', color: 'white', border: '1px solid #555', borderRadius: '4px', padding: '5px' }}
                />
                <button type="submit" style={{ marginLeft: '5px', background: 'var(--accent-color)', border: 'none', color: 'white', borderRadius: '4px', padding: '5px 10px' }}>Go</button>
            </form>
            <iframe
                ref={iframeRef}
                src={url}
                style={{ flex: 1, border: 'none', width: '100%', height: 'calc(100% - 40px)' }}
                sandbox="allow-forms allow-scripts allow-same-origin allow-popups"
                title="Browser"
            ></iframe>
        </div>
    );
};

export default BrowserApp;
