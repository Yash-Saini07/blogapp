'use client';

import { useEffect, useState } from 'react';

export default function ScrollProgress() {
    const [width, setWidth] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const docHeight = document.body.scrollHeight - window.innerHeight;
            const scrolled = (window.scrollY / docHeight) * 100;
            setWidth(scrolled);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="fixed top-0 left-0 w-full h-1 z-50 bg-transparent">
            <div
                className="h-full bg-amber-500 transition-all duration-100 ease-out"
                style={{ width: `${width}%` }}
            />
        </div>
    );
}