import "/src/css/findMyTasteStyle.css";

function FindMyTasteTopBarView (props){

    
    return (<div className = "topBarFMT">
                
                <a href = "#/homepage">
                    <button className = "backToHome">Back To Home</button>
                </a>
                
                <img src = "image/artQuizTitle.png" className = "artQuizLogo"></img>
                
                
           </div>)
}

export {FindMyTasteTopBarView}  