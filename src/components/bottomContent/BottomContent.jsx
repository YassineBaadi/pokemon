import { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import TextSlow from '../textSlow/textSlow';
import pokedex from '../../assets/img/pokedex.png';
import './bottomContent.css';

const messages = [
    "Bonjour ! Bienvenue dans le monde merveilleux des Pokémon !",
    "Je me présente : je m'appelle Chen.",
    "On m'appelle le Professeur Pokémon.",
    "Ce monde est peuplé de créatures appelées Pokémon.",
    "Pour certains, les Pokémon sont des animaux de compagnie, pour d'autres, ils sont un moyen de combattre.",
    "Pour ma part...",
    "L'étude des Pokémon est ma profession.",
    "J'ai dailleurs crée un Pokédex.",
    "Utilise le pour parcourir l'ensemble des pokémons disponible.",
    "Choisis-en un pour ton premier combat !"
];

export default function BottomContent() {
    const [index, setIndex] = useState(0);
    const [canAdvance, setCanAdvance] = useState(false);
    const [showButton, setShowButton] = useState(false);
    const navigate = useNavigate();

    // Utiliser useCallback pour stabiliser la référence de la fonction
    const handleFinished = useCallback(() => {
        setCanAdvance(true);
        // Si c'est le dernier message, afficher le bouton
        if (index === messages.length - 1) {
            setShowButton(true);
        }
    }, [index]); // Ajouter index comme dépendance

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.code === 'Space' && canAdvance && index < messages.length - 1) {
                setIndex(prev => prev + 1);
                setCanAdvance(false);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [canAdvance, index]);

    const handleButtonClick = () => {
        // Naviguer vers la page Pokédex
        navigate('/pokedex');
    };

    return (
        <div className="containerBottom">
            <p className='textBottom'>
                <TextSlow 
                    key={index}
                    text={messages[index]} 
                    speed={30} 
                    onFinished={handleFinished} 
                />
            </p>
            {showButton && (
                <div className="button-container">
                    <img
                        src={pokedex}
                        className="adventure-button" 
                        onClick={handleButtonClick}
                        alt="Pokédex"
                    />
                </div>
            )}
        </div>
    );
}