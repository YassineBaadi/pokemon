import { useEffect, useState, useRef } from 'react';
import './textSlow.css';

export default function TextSlow({ text, speed = 30, onFinished }) {
    const [displayedText, setDisplayedText] = useState('');
    const intervalRef = useRef(null);
    const indexRef = useRef(0);

    useEffect(() => {
        // Nettoyer l'intervalle précédent
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
        }

        // Réinitialiser l'état
        setDisplayedText('');
        indexRef.current = 0;

        // Démarrer le nouvel intervalle
        intervalRef.current = setInterval(() => {
            if (indexRef.current < text.length) {
                const nextChar = text.charAt(indexRef.current);
                setDisplayedText((prev) => prev + nextChar);
                indexRef.current++;
            } else {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
                if (onFinished) onFinished();
            }
        }, speed);

        // Cleanup
        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        };
    }, [text, speed, onFinished]);

    return (
        <div className="typewriter">
            {displayedText}
            <span className="cursor">█</span>
        </div>
    );
}