import TextSlow from '../textSlow/textSlow'
import './bottomContent.css'

export default function BottomContent({}){


    return(

        <>
            <div className="containerBottom">
                <p className='textBottom'><TextSlow text={"Bonjour ! Bienvenue dans le monde merveilleux des Pokémon !"} /> </p>
            </div>
        </>
    )
}