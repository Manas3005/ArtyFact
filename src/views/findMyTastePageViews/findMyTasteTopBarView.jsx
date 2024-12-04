import "/src/style.css"

function FindMyTasteTopBarView (props){

    function setDescGreyACB (){ //This gets the describe button and sets its background color to grey, and artQuizButton to white
        document.getElementById("describeButton").style.backgroundColor = "#e6e6e6"
        document.getElementById("artQuizButton").style.backgroundColor = "white"

    }

    function setQuizGreyACB (){ //This gets the artQuiz button and sets its background color to grey, and describe to white
        document.getElementById("artQuizButton").style.backgroundColor = "#e6e6e6"
        document.getElementById("describeButton").style.backgroundColor = "white"

    }
    /*Overall the functions above are meant to improve usability to better indicate to the user which tab they are currently on*/
    
    return <div>
                <a href = "#/homepage">
                <img className = "backToHomeButton" src = "image/backToHome.png"></img></a>
                <div className = "artyFactHeader">ArtyFact</div>
                <button id = "describeButton" className = "dreamArtDescButton" onClick = {setDescGreyACB}>Describe</button>
                <button id = "artQuizButton" className = "dreamArtQuizButton" onClick = {setQuizGreyACB}>Take the Art Quiz</button>
           </div>
}

export {FindMyTasteTopBarView}