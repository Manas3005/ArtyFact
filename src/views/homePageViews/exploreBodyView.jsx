import "/src/css/style.css"
import { useSelector } from "react-redux"

function ExploreBodyView () {

    const quizProgress = useSelector((state) => state.findMyTaste.progress)

    function handleFindMyTasteClickACB () {
        return window.location.hash = "#/findMyTaste"
    }

    function renderQuizProgressACB(){
        if(quizProgress>0 && quizProgress<100){
            return (<div className = "quizProgress"> (Finish Art Quiz: {quizProgress}% )</div>
        )}
    }

    return (

        <div className="horizontalFlexParent">

            <div className="explorePanel">
                <img
                src= "/image/exploreNewArtPanel.png" 
                className = "exploreNewArtPanel"
                />
                <div className="confusedText">Want to explore works that resonate with your aesthetic?</div>
                <button className = "findMyTaste" onClick = {handleFindMyTasteClickACB}>Take the Art Quiz!</button>
                {renderQuizProgressACB()}
            </div>

                <img className="exploreImage" src="/image/Palazzo-Spada-Rome.png"
                />

        </div>
        
    )
}

export {ExploreBodyView}
