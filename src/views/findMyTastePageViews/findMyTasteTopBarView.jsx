import "/src/css/findMyTasteStyle.css";

function FindMyTasteTopBarView (props){

    
    return (<div className = "topBarFMT">
                
                <a href = "#/homepage">
                    <img className = "backToHomeButton" src = "https://i.imgur.com/JcHVFK7.png"></img>
                </a>
                
                <img src = "image/artQuizTitle.png" className = "artQuizLogo"></img>
                
                
           </div>)
}

export {FindMyTasteTopBarView}  