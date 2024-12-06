import "/src/style.css"
import LinearWithValueLabel from "../ThirdPartyWrittenComponents/LinearProgressWithLabel"


export function ArtQuizView (props){
    return (
    <div>
        <LinearWithValueLabel></LinearWithValueLabel>
        <div>
            <div className = "quizQuestions">Select your favorite artists</div>
        </div>

     </div>

   
    )
}