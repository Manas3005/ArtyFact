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
    /*Basically the functions above are meant to improve usability to better indicate to the user which tab they are currently on (through the grey color)*/
    

    function handleDescribeClickACB(){ 
        setDescGreyACB()
        props.onDescribeButtonClicked() //Firing custom event
    }

    function handleArtQuizClickACB(){
        setQuizGreyACB()
        props.onArtQuizButtonClicked() //Firing custom event
    }

    return (<div className = "topBarFMT">
                
                <a href = "#/homepage">
                    <img className = "backToHomeButton" src = "image/backToHome.png"></img>
                </a>
                
                <div className = "artyFactHeader">ArtyFact</div>
                
                <button id = "describeButton" className = "dreamArtDescButton" onClick = {handleDescribeClickACB}> Describe </button>
                <button id = "artQuizButton" className = "dreamArtQuizButton" onClick = {handleArtQuizClickACB}> Take the Art Quiz </button>
           
           </div>)
}

export {FindMyTasteTopBarView}