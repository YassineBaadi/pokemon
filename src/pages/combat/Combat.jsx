import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import pikachu from '../../assets/img/pikachu.gif';
import './combat.css';

export default function Combat() {
    const location = useLocation();
    const navigate = useNavigate();
    const { selectedPokemon } = location.state || {};

    const [enemyHP, setEnemyHP] = useState(100);
    const [playerHP, setPlayerHP] = useState(100);
    const [isAttacking, setIsAttacking] = useState(false);
    const [isEnemyAttacking, setIsEnemyAttacking] = useState(false);
    const [showAttackMenu, setShowAttackMenu] = useState(false);
    const [battleMessage, setBattleMessage] = useState('');
    const [fightOver, setFightOver] = useState(false);
    const [enemyKO, setEnemyKO] = useState(false);
    const [battleStart, setBattleStart] =useState(false)

    const battleMusic = new Audio('/battle.mp3');
    const victoryMusic = new Audio('/victory.mp3');
    const attackSound = new Audio('/attack.mp3');
    const koSound = new Audio('/ko.mp3');

    useEffect(() => {
        battleMusic.loop = true;
        battleMusic.play();

        return () => {
            battleMusic.pause();
            battleMusic.currentTime = 0;
        };
    }, []);

    useEffect(() => {
    setBattleStart(true);
    battleMusic.loop = true;
    battleMusic.play();
    }, []);

    const handleChargeAttack = () => {
        attackSound.play();
        setBattleMessage(`${selectedPokemon.name} utilise Charge !`);
        setIsAttacking(true);
        setEnemyHP(prev => Math.max(prev - 20, 0));

        setTimeout(() => {
            setIsAttacking(false);

            if (enemyHP - 20 <= 0) {
                setBattleMessage("L'ennemi est K.O. !");
                koSound.play();
                battleMusic.pause();
                battleMusic.currentTime = 0;
                victoryMusic.play();
                setEnemyKO(true);
                setFightOver(true);
                return;
            }

            setBattleMessage("Pikachu utilise Mimi-Queue !");
            setIsEnemyAttacking(true);
            setPlayerHP(prev => Math.max(prev - 15, 0));

            setTimeout(() => {
                setIsEnemyAttacking(false);
                if (playerHP - 15 <= 0) {
                    setBattleMessage(`${selectedPokemon.name} est K.O. !`);
                    setFightOver(true);
                } else {
                    setBattleMessage('');
                }
            }, 1000);
        }, 1000);
    };

    return (
        <div className="containerCombat">
            <div className="combat-wrapper">

                {/* Barre d'infos de l'ennemi */}
                <div className="enemy-info">
                    <div className="info-box">
                        <span className="name">PIKACHU</span>
                        <span className="level">Lv2</span>
                        <div className="hp-bar">
                            <div className="hp-fill" style={{ width: `${enemyHP}%` }}></div>
                        </div>
                    </div>
                </div>

                {/* Pokémon adversaire */}
                <div className={`enemy-pokemon ${battleStart ? 'enter-right' : ''}`}>
                    <img
                        src={pikachu}
                        alt=""
                        className={`sprite enemy ${isAttacking ? 'shake' : ''} ${enemyKO ? 'enemy-ko' : ''}`}
                        style={{ width: 250 }}
                    />
                </div>

                {/* Pokémon joueur */}
                <div className="player-pokemon">
                    {selectedPokemon && (
                        <div className={`player-pokemon ${battleStart ? 'enter-left' : ''}`}>
                {selectedPokemon && (
                    <img
                        src={selectedPokemon.image}
                        alt={selectedPokemon.name}
                        className={`sprite player ${isEnemyAttacking ? 'shake' : ''} ${isAttacking ? 'charge-attack' : ''}`}
                    />
                )}
                </div>


                    )}
                </div>

                {/* Barre d'infos du joueur */}
                <div className="player-info">
                    <div className="info-box">
                        <span className="name">{selectedPokemon?.name?.toUpperCase() || "???"}</span>
                        <span className="level">Lv5</span>
                        <div className="hp-bar">
                            <div className="hp-fill" style={{ width: `${playerHP}%` }}></div>
                        </div>
                    </div>
                </div>

                {/* Zone de commande */}
                <div className="combat-menu">
                    {battleMessage && (
                        <div className="battle-message">{battleMessage}</div>
                    )}

                    {!fightOver && !showAttackMenu && (
                        <>
                            <div className="question">Que doit faire {selectedPokemon?.name || 'ce Pokémon'} ?</div>
                            <div className="menu-buttons">
                                <button onClick={() => setShowAttackMenu(true)}>FIGHT</button>
                                <button disabled>BAG</button>
                                <button disabled>POKÉMON</button>
                                <button onClick={() => navigate('/pokedex')}>RUN</button>
                            </div>
                        </>
                    )}

                    {showAttackMenu && !fightOver && (
                        <div className="menu-buttons">
                            <button onClick={handleChargeAttack}>CHARGE</button>
                            <button onClick={() => setShowAttackMenu(false)}>RETOUR</button>
                        </div>
                    )}

                    {fightOver && (
                        <div className="menu-buttons">
                            <button onClick={() => navigate('/pokedex')}>Retour au Pokédex</button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
