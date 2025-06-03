import { useEffect, useState } from 'react'
import Chen from '../../assets/img/professeur-chen.png'
import BottomContent from '../../components/bottomContent/BottomContent'
import song from '../../assets/sound/pokemonStart.mp3';

import './intro.css'

export default function Intro(){
    const [showChen, setShowChen] = useState(false);
    const [showBottomContent, setShowBottomContent] = useState(false);

    useEffect(() => {
        const sonIntro = new Audio(song);
        sonIntro.play();
        sonIntro.volume = 0.1;
        sonIntro.currentTime = 0.6;

       
        setTimeout(() => {
            setShowChen(true);
        }, 500);

        
        setTimeout(() => {
            setShowBottomContent(true);
        }, 2000);

        return () => {
            sonIntro.pause();
            sonIntro.currentTime = 0;
        };
    }, []);

    return (
        <>
            <div className="containerIntro">
                <div className={`imgChen ${showChen ? 'fade-in' : ''}`}>
                    <img src={Chen} alt="Professeur Chen" />
                </div>

                <div className="containerTxt">
                    <div className='txt'>
                        
                    </div>
                </div>
            </div>

            {showBottomContent && <BottomContent />}
        </>
    );
}