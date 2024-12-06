import "/src/style.css"
import LinearWithValueLabel from "../ThirdPartyWrittenComponents/LinearProgressWithLabel"


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
            <div className = "quizQuestions">Select your favorite artists </div>
            <button onClick = {handlePreviousClickACB} className = "quizPreviousQuestion"> Previous</button>
            <button onClick = {handleNextClickACB} className = "quizNextQuestion"> Next</button>

        </div>

     
    </div>


    )
}