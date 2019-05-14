import React from 'react';
import './SmartLayout.scss';

export default function SmartLayout({header, main, style}) {
    return (
        <div className="smart-layout">
            <div className="backdrop" style={style}></div>
            <div className="front">
                <header className='container'>
                    { header }
                </header>
                <main>
                    { main }
                </main>
            </div>
        </div>
    );
}