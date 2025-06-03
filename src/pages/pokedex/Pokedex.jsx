import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './pokedex.css';
import transition from '../../assets/img/Transition.gif'
import musique from '../../assets/sound/battleMusic.mp3'
import selectPoke from '../../assets/sound/selectPokemon.mp3'
import soundDex from  '../../assets/sound/soundPokedex.mp3'
import pikaRun from '../../assets/img/pikachuRun.gif'

export default function Pokedex() {
    const [pokemon, setPokemon] = useState([]);
    const [filteredPokemon, setFilteredPokemon] = useState([]);
    const [recherche, setRecherche] = useState('');
    const [selectedPokemon, setSelectedPokemon] = useState(null);
    const [loading, setLoading] = useState(true);
    const [showVideo, setShowVideo] = useState(false);
    const navigate = useNavigate();


    // Get l'API
    useEffect(() => {
        axios.get("https://pokebuildapi.fr/api/v1/pokemon")
            .then((response) => {
                setPokemon(response.data);
                setFilteredPokemon(response.data);
                setLoading(false);
                
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, []);


    //Filtrer la liste avec la barre de recherche 
    useEffect(() => {
        if (recherche.trim() === '') {
            setFilteredPokemon(pokemon);
        } else {
            const filtered = pokemon.filter(p => 
                p.name.toLowerCase().includes(recherche.toLowerCase()) ||
                p.id.toString().includes(recherche)
            );
            setFilteredPokemon(filtered);
        }
    }, [recherche, pokemon]);
    

    //Afficher la transition (clic de la confirmation)
    useEffect(() => {
    if (showVideo) {
        const timeout = setTimeout(() => {
            setShowVideo(false);
            navigate('/combat', { state: { selectedPokemon } });

        }, 2700);

        return () => clearTimeout(timeout); 
    }
}, [showVideo, navigate]);

    //Fonction pour attribuer le pokemon selectionné à selectedPokemon
    const handlePokemonSelect = (selectedPokemon) => {
        setSelectedPokemon(selectedPokemon);
        
        const musicS = new Audio(selectPoke)
        musicS.play()
        musicS.volume = 0.1
    
    };

    //Fonction qui lance la musique à la confirmation
    const handleConfirm = () => {
    const audio = new Audio(musique);
    audio.play();
    audio.volume = 0.2; 
    setTimeout(() => {
        audio.pause()
        audio.currentTime=0
    }, 4000);
    setShowVideo(true);
};

    //Couleur en fonction du type du pokemonSelected
    const getTypeColor = (type) => {
        const colors = {
            'Normal': '#A8A878',
            'Feu': '#F08030',
            'Eau': '#6890F0',
            'Électrik': '#F8D030',
            'Plante': '#78C850',
            'Glace': '#98D8D8',
            'Combat': '#C03028',
            'Poison': '#A040A0',
            'Sol': '#E0C068',
            'Vol': '#A890F0',
            'Psy': '#F85888',
            'Insecte': '#A8B820',
            'Roche': '#B8A038',
            'Spectre': '#705898',
            'Dragon': '#7038F8',
            'Ténèbres': '#705848',
            'Acier': '#B8B8D0',
            'Fée': '#EE99AC'
        };
        return colors[type];
    };

    if (loading) {
        const sonDex = new Audio (soundDex)
        sonDex.play()
        sonDex.currentTime=0.15
        return (
            <div className="pokedex-container">
                <img className='pikarun' src={pikaRun} alt="" />
                <div className="loading"> Chargement du Pokédex...</div>
            </div>
        );
    }
    
    return (
        <div className="pokedex-container">
            <div className="pokedex">
                {/* Partie gauche */}
                <div className="pokedex-left">
                    <div className="top-section">
                        <div className="big-light"></div>
                        <div className="small-lights">
                            <div className="light red"></div>
                            <div className="light yellow"></div>
                            <div className="light green"></div>
                        </div>
                    </div>

                    <div className="screen-section">
                        <div className="main-screen">
                            {selectedPokemon ? (
                                <div className="pokemon-display">
                                    <img 
                                        src={selectedPokemon.image} 
                                        alt={selectedPokemon.name}
                                        className="pokemon-image"
                                    />
                                    <h3>#{selectedPokemon.id.toString().padStart(3, '0')}</h3>
                                    <h2>{selectedPokemon.name}</h2>

                                    <button className="confirm-button" onClick={handleConfirm}>
                                        Confirmer ce Pokémon
                                    </button>
                                </div>
                            ) : (
                                <div className="no-pokemon">
                                    Sélectionnez un Pokémon
                                </div>
                            )}
                        </div>

                        <div className="screen-controls">
                            <div className="red-button"></div>
                            <div className="speaker-grille"></div>
                        </div>
                    </div>

                    <div className="bottom-controls">
                        <div className="black-button"></div>
                        <div className="long-buttons">
                            <div className="long-button red"></div>
                            <div className="long-button blue"></div>
                        </div>
                        <div className="cross-pad">
                            <div className="cross-vertical"></div>
                            <div className="cross-horizontal"></div>
                        </div>
                        <div className="small-dots">
                            <div className="dot"></div>
                            <div className="dot"></div>
                        </div>
                        <div className="green-screen"></div>
                    </div>
                </div>

                
                <div className="pokedex-right">
                    <div className="info-screen">
                        {selectedPokemon && (
                            <div className="pokemon-info">
                                <div className="pokemon-types">
                                    {selectedPokemon.apiTypes.map((type, index) => (
                                        <span 
                                            key={index} 
                                            className="type-badge"
                                            style={{ backgroundColor: getTypeColor(type.name) }}
                                        >
                                            {type.name}
                                        </span>
                                    ))}
                                </div>
                                <div className="pokemon-stats">
                                 
                                    {selectedPokemon.stats && (
                                        <div className="stats">
                                            <p><strong>PV:</strong> {selectedPokemon.stats.HP}</p>
                                            <p><strong>Attaque:</strong> {selectedPokemon.stats.attack}</p>
                                            <p><strong>Défense:</strong> {selectedPokemon.stats.defense}</p>
                                            <p><strong>Vitesse:</strong> {selectedPokemon.stats.speed}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="search-section">
                        <input
                            type="text"
                            placeholder="Rechercher un Pokémon..."
                            value={recherche}
                            onChange={(e) => setRecherche(e.target.value)}
                            className="search-input"
                        />
                    </div>

                    <div className="pokemon-grid">
                        {filteredPokemon.map((p) => (
                            <div
                                key={p.id}
                                className={`pokemon-card ${selectedPokemon?.id === p.id ? 'selected' : ''}`}
                                onClick={() => handlePokemonSelect(p)}
                            >
                                <img src={p.image} alt={p.name} />
                                <span>#{p.id}</span>
                                <span>{p.name}</span>
                            </div>
                        ))}
                    </div>

                    <div className="right-controls">
                        <div className="control-buttons">
                            <div className="small-button"></div>
                            <div className="small-button"></div>
                        </div>
                        <div className="yellow-circle"></div>
                        <div className="bottom-screens">
                            <div className="bottom-screen"></div>
                            <div className="bottom-screen"></div>
                        </div>
                    </div>
                </div>
            </div>

            
                    {showVideo && (
                <div className="fullscreen-transition">
                    <img src={transition} alt="Transition" className="gif-transition" />
                </div>

                    )}

        </div>
    );
}
