import "/src/css/findMyTasteStyle.css";

function FindMyTasteTopBarView (props){

    
    return (<div className = "topBarFMT">
                
                <a href = "#/homepage">
                    <button className = "backToHome">Back To Home</button>

                    <img className = "backToHomeButton" src = "/image/backToHome.png"></img>
                </a>
                
                <img src = "image/artQuizTitle.png" className = "artQuizLogo"></img>
                
                
           </div>)
}

export {FindMyTasteTopBarView}  