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


    return (
    
    <div>

        <LinearWithValueLabel updatedProgress = {updatedProgress}></LinearWithValueLabel> {/*Passing down the updated progress to the third party component*/}
        
        <div>
            {updatedProgress === 0 ? (<div className = "quizQuestions">Select your favorite artists </div>) : 
             updatedProgress=== 10 ? (<div className = "quizQuestions">New Question</div>): 
             (<div className = "quizQuestions">Done</div>) }

            <button onClick = {handlePreviousClickACB} className = "quizPreviousQuestion"> Previous</button>
            <button onClick = {handleNextClickACB} className = "quizNextQuestion"> Next</button>

        </div>

     
    </div>


    )
}