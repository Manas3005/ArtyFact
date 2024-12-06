import "/src/style.css"
import LinearWithValueLabel from "../ThirdPartyWrittenComponents/LinearProgressWithLabel"


export function ArtQuizView (props){

    const updatedProgress = props.updatedProgress;
    
    console.log("This is the updated progres in the art quiz view", updatedProgress);

    function handleNextClickACB(){
        console.log("FIRING INCREMENT");
        props.onNextButtonClicked(); //Firing custom event to dispatch mutation of progress variable in findMyTaste presenter
    }


    return (
    <div>
        <LinearWithValueLabel updatedProgress = {updatedProgress}></LinearWithValueLabel> {/*Passing down the updated progress to the third party commponent*/}
        <div>
            <div className = "quizQuestions">Select your favorite artists</div>
            <button onClick = {handleNextClickACB}> Next</button>
        </div>

     </div>


    )
}