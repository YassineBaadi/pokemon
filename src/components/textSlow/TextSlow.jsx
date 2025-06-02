//A REVOIR

import { useEffect, useState } from 'react';
import './textSlow.css';

export default function TextSlow({ text, speed = 30 }) {
    const [displayedText, setDisplayedText] = useState('');

    useEffect(() => {
        let index = 0;
        const interval = setInterval(() => {
            if (index < text.length) {
                setDisplayedText((prev) => prev + text[index]);
                index++;
            } else {
                clearInterval(interval);
            }
        }, speed);

        return () => clearInterval(interval);
    }, [text, speed]);


    return (
        <div className="typewriter">
            {displayedText}
            <span className="cursor">█</span>
        </div>
    );
}
