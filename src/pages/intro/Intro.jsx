import Chen from '../../assets/img/professeur-chen.png'
import BottomContent from '../../components/bottomContent/BottomContent'
import './intro.css'

export default function Intro(){


    return(

        <>
            <div className="containerIntro">
                <div className='imgChen'>
                    <img src={Chen} alt="" />
                </div>

                <div className="containerTxt">
                    <div className='txt'>

                    </div>

                </div>
            </div>

            <BottomContent />
        
        </>
    )
}