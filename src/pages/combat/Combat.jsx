import { useLocation, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import pikachu from '../../assets/img/pikachu.gif';
import './combat.css';
import victory from '../../assets/sound/victorySound.mp3';
import attack from '../../assets/sound/chargeSound.mp3';
import pikapika from '../../assets/sound/pikachuSpawn.mp3';
import ko from '../../assets/sound/pikachuSpawn.mp3';
import bgSound from '../../assets/sound/battleMusic.mp3';
import fireGif from '../../assets/img/fire.gif';
import fireSound from '../../assets/sound/fireSound.mp3'
import waterGif from '../../assets/img/surf.gif';
import waterSound from '../../assets/sound/waterSound.mp3';
import electricGif from '../../assets/img/eclair.gif';
import electricSound from '../../assets/sound/electricSound.mp3';


const battleMusic = new Audio(bgSound);
const victoryMusic = new Audio(victory);
const attackSound = new Audio(attack);
const koSound = new Audio(ko);
const pikachuSpawn = new Audio(pikapika);
const fireMusic = new Audio(fireSound);
const waterAudio = new Audio(waterSound);
const electricAudio = new Audio(electricSound);


export default function Combat() {
    const location = useLocation();
    const navigate = useNavigate();
    const { selectedPokemon, audio } = location.state || {};
    const [isChargeDisabled, setIsChargeDisabled] = useState(false);

    const [enemyHP, setEnemyHP] = useState(100);
    const [playerHP, setPlayerHP] = useState(100);
    const [isAttacking, setIsAttacking] = useState(false);
    const [isEnemyAttacking, setIsEnemyAttacking] = useState(false);
    const [showAttackMenu, setShowAttackMenu] = useState(false);
    const [battleMessage, setBattleMessage] = useState('');
    const [fightOver, setFightOver] = useState(false);
    const [enemyKO, setEnemyKO] = useState(false);
    const [battleStart, setBattleStart] = useState(false);
    const [showFireEffect, setShowFireEffect] = useState(false);
    const [showWaterEffect, setShowWaterEffect] = useState(false);
    const [showElectricEffect, setShowElectricEffect] = useState(false);
    const [isAttackDisabled, setIsAttackDisabled] = useState(false);


    useEffect(() => {
        battleMusic.loop = true;
        battleMusic.volume = 0.5;
        battleMusic.currentTime = 3;
        battleMusic.play();

        return () => {
            battleMusic.pause();
            battleMusic.currentTime = 0;
        };
    }, []);

    const startAttackCooldown = () => {
        setIsAttackDisabled(true);
        setTimeout(() => setIsAttackDisabled(false), 3000);
    };

    useEffect(() => {
        setBattleStart(true);
        pikachuSpawn.currentTime = 1;
        pikachuSpawn.play();
        battleMusic.loop = true;
        battleMusic.play();
        battleMusic.volume = 0.2
    }, []);

    const handleChargeAttack = () => {
        if (isChargeDisabled) return; 

        startAttackCooldown();
       

        attackSound.currentTime = 2;
        attackSound.play();
        attackSound.volume = 0.2
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
                victoryMusic.volume = 0.1
                setEnemyKO(true);
                setFightOver(true);
                return;
            }

            setBattleMessage("Pikachu utilise Vive-Attaque !");
            setIsEnemyAttacking(true);
            setPlayerHP(prev => Math.max(prev - 15, 0));

            setTimeout(() => {
                setIsEnemyAttacking(false);
                if (playerHP - 15 <= 0) {
                    setBattleMessage(`${selectedPokemon.name} est K.O. !`);
                    battleMusic.pause();
                    battleMusic.currentTime = 0;
                    audio.pause();
                    audio.currentTime = 0;
                    setFightOver(true);
                } else {
                    setBattleMessage('');
                }
            }, 2000);
        }, 1000);
    };

    const handleWaterAttack = () => {
    setShowWaterEffect(true);
    startAttackCooldown();
    waterAudio.currentTime = 0;
    waterAudio.play();
    setBattleMessage(`${selectedPokemon.name} utilise Surf !`);
    setEnemyHP(prev => Math.max(prev - 30, 0));

    setTimeout(() => {
        setShowWaterEffect(false);
        
    }, 2000);
     setTimeout(() => {
        if (enemyHP - 35 <= 0) {
            setBattleMessage("L'ennemi est K.O. !");
            koSound.play();
            battleMusic.pause();
            battleMusic.currentTime = 0;
            victoryMusic.play();
            setEnemyKO(true);
            setFightOver(true);
            return;
        }
        setBattleMessage("Pikachu utilise Vive-Attaque !");
        setIsEnemyAttacking(true);
        setPlayerHP(prev => Math.max(prev - 15, 0));

        setTimeout(() => {
            setIsEnemyAttacking(false);
            if (playerHP - 15 <= 0) {
                setBattleMessage(`${selectedPokemon.name} est K.O. !`);
                battleMusic.pause();
                battleMusic.currentTime = 0;
                audio.pause();
                audio.currentTime = 0;
                setFightOver(true);
            } else {
                setBattleMessage('');
            }
        }, 2000);
    }, 2000);
};

const handleElectricAttack = () => {
    startAttackCooldown();
    setShowElectricEffect(true);

    electricAudio.currentTime = 0;
    electricAudio.play();
    electricAudio.volume = 0.1

    setTimeout(() => {
        electricAudio.pause();
        electricAudio.currentTime = 0;
        setShowElectricEffect(false);
        setIsChargeDisabled(false);
    }, 2000);
    
    setBattleMessage(`${selectedPokemon.name} utilise Eclair !`);
    setEnemyHP(prev => Math.max(prev - 35, 0));

    setTimeout(() => {
        if (enemyHP - 35 <= 0) {
            setBattleMessage("L'ennemi est K.O. !");
            koSound.play();
            battleMusic.pause();
            battleMusic.currentTime = 0;
            victoryMusic.play();
            setEnemyKO(true);
            setFightOver(true);
            return;
        }
        setBattleMessage("Pikachu utilise Vive-Attaque !");
        setIsEnemyAttacking(true);
        setPlayerHP(prev => Math.max(prev - 15, 0));

        setTimeout(() => {
            setIsEnemyAttacking(false);
            if (playerHP - 15 <= 0) {
                setBattleMessage(`${selectedPokemon.name} est K.O. !`);
                battleMusic.pause();
                battleMusic.currentTime = 0;
                audio.pause();
                audio.currentTime = 0;
                setFightOver(true);
            } else {
                setBattleMessage('');
            }
        }, 2000);
    }, 2000);
};

    const handleFireAttack = () => {
    

    startAttackCooldown();
    setShowFireEffect(true);

    fireMusic.currentTime = 0;
    fireMusic.play();

    setTimeout(() => {
        fireMusic.pause();
        fireMusic.currentTime = 0;
        setShowFireEffect(false);
        setIsChargeDisabled(false);
    }, 2000);
    
    setBattleMessage(`${selectedPokemon.name} utilise Lance-Flamme !`);
    setEnemyHP(prev => Math.max(prev - 35, 0));

    setTimeout(() => {
        if (enemyHP - 35 <= 0) {
            setBattleMessage("L'ennemi est K.O. !");
            koSound.play();
            battleMusic.pause();
            battleMusic.currentTime = 0;
            victoryMusic.play();
            setEnemyKO(true);
            setFightOver(true);
            return;
        }
        setBattleMessage("Pikachu utilise Vive-Attaque !");
        setIsEnemyAttacking(true);
        setPlayerHP(prev => Math.max(prev - 15, 0));

        setTimeout(() => {
            setIsEnemyAttacking(false);
            if (playerHP - 15 <= 0) {
                setBattleMessage(`${selectedPokemon.name} est K.O. !`);
                battleMusic.pause();
                battleMusic.currentTime = 0;
                audio.pause();
                audio.currentTime = 0;
                setFightOver(true);
            } else {
                setBattleMessage('');
            }
        }, 2000);
    }, 2000);
};


    const isFireType = selectedPokemon?.apiTypes?.some(type => type.name === 'Feu');
    const isWaterType = selectedPokemon?.apiTypes?.some(t => t.name === 'Eau');
    const isElectricType = selectedPokemon?.apiTypes?.some(t => t.name === 'Électrik');


    return (
        <div className="containerCombat">
            <div className="combat-wrapper">
                <div className="enemy-info">
                    <div className="info-box">
                        <span className="name">PIKACHU</span>
                        <span className="level">Lv2</span>
                        <div className="hp-bar">
                            <div className="hp-fill" style={{ width: `${enemyHP}%` }}></div>
                        </div>
                    </div>
                </div>

                <div className={`enemy-pokemon ${battleStart ? 'enter-right' : ''}`}>
                    <img
                        src={pikachu}
                        alt=""
                        className={`sprite enemy ${isAttacking ? 'shake' : ''} ${enemyKO ? 'enemy-ko' : ''} ${isEnemyAttacking ? 'charge-attack-ennemy' : ''}`}
                        style={{ width: 250 }}
                    />
                    
                </div>

                <div className="player-pokemon">
                    {selectedPokemon && (
                        <div className={`player-pokemon ${battleStart ? 'enter-left' : ''}`}>
                            <img
                                src={selectedPokemon.image}
                                alt={selectedPokemon.name}
                                className={`sprite player ${isEnemyAttacking ? 'shake' : ''} ${isAttacking ? 'charge-attack' : ''}`}
                            />
                            
                        </div>
                    )}
                </div>
                    {showFireEffect && (
                        <img src={fireGif} alt="Feu" className="fire-effect" />
                    )}
                    {showWaterEffect && <img src={waterGif} alt="eau" className="water-effect" />}
                    {showElectricEffect && <img src={electricGif} alt="éclair" className="electric-effect" />}


                <div className="player-info">
                    <div className="info-box">
                        <span className="name">{selectedPokemon?.name?.toUpperCase() || "???"}</span>
                        <span className="level">Lv5</span>
                        <div className="hp-bar">
                            <div className="hp-fill" style={{ width: `${playerHP}%` }}></div>
                        </div>
                    </div>
                </div>

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
                            <button onClick={handleChargeAttack} disabled={isAttackDisabled}>CHARGE</button>
                            {isWaterType && <button onClick={handleWaterAttack} disabled={isAttackDisabled}>SURF</button>}
                            {isElectricType && <button onClick={handleElectricAttack} disabled={isAttackDisabled}>ÉCLAIR</button>}
                            {isFireType && <button onClick={handleFireAttack} disabled={isAttackDisabled}>LANCE FLAMME</button>}
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
