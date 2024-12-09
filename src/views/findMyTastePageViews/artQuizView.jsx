import "/src/style.css"
import LinearWithValueLabel from "../ThirdPartyWrittenComponents/LinearProgressWithLabel"
import { useEffect } from "react";


export function ArtQuizView (props){

    const updatedProgress = props.updatedProgress;

    function handleNextClickACB(){
        props.onNextButtonClicked(); //Firing custom event to dispatch mutation of progress variable in findMyTaste presenter
    }

    function handlePreviousClickACB(){
        props.onPreviousButtonClicked();
    }

    function handleChoiceSelectionACB(){
        props.onArtistSelected();
    }


    return (
    
    <div>

        <LinearWithValueLabel updatedProgress = {updatedProgress}></LinearWithValueLabel> {/*Passing down the updated progress to the third party component*/}
        
        <div className = "quizQuestions">
            {updatedProgress === 0 ? (<div >Select your favorite artists {/*Parameter used: "artist_title" */}
                                        <div className="favoriteArtistsContainer">
                                            <button className="favoriteArtist" >Picasso</button>
                                            <button className="favoriteArtist">Van Gogh</button>
                                            <button className="favoriteArtist">Da Vinci</button>
                                            <button className="favoriteArtist">Monet</button>
                                            <button className="favoriteArtist">Dali</button>
                                            <button className="favoriteArtist">Rembrandt</button>
                                            <button className="favoriteArtist">Matisse</button>
                                        </div>
                                     </div>) 
            :updatedProgress=== 10 ? (<div >Select your favorite color that you would like your art to be dominated with</div>)
            :(<div >Done</div>) }

            <button onClick = {handlePreviousClickACB} className = "quizPreviousQuestion"> Previous</button>
            <button onClick = {handleNextClickACB} className = "quizNextQuestion"> Next</button> 

        </div>

     
    </div>


    )
}