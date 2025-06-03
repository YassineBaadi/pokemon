import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/img/logo.png';
import pokeballOpen from '../../assets/sound/pokeballOpen.mp3'
import startBtn from '../../assets/img/pokeballStart.png';
import startBtn2 from '../../assets/img/pokeballStart2.png'
import './start.css';

export default function Start() {
    const [hasStarted, setHasStarted] = useState(false);
    const [showFlash, setShowFlash] = useState(false);
    const navigate = useNavigate();
    const [disabled, setDisabled] = useState(false);

    const startGame = () => {
        const bg = new Audio(pokeballOpen);
        bg.volume = 0.1;
        bg.currentTime = 0.2;
        bg.play();
        
        setHasStarted(true);
        setDisabled(true);
        
      
        
            setShowFlash(true);
        
        
        setTimeout(() => {
            bg.pause();
            bg.currentTime = 0;
            navigate('/intro');
        }, 4000);
    };

    return (
        <>
            <div className="start-screen">
                {!disabled ? (
                    <img
                        src={startBtn}
                        alt="Start"
                        className="start-btn"
                        onClick={startGame}
                    />
                ) : (
                    <img
                        src={startBtn2}
                        alt="Start"
                        className="start-btn"
                    />
                )}
                
               
                {showFlash && (
                    <div className="white-flash"></div>
                )}
            </div>

            <div className='imgLogo'>
                <img src={logo} alt="" />
            </div>
        </>
    );
}