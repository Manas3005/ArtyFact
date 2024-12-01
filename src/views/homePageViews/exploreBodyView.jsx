import "/src/style.css"

function ExploreBodyView (props) {
    return (

        <div>
            <img
            src= "image/exploreNewArtPanel.png" 
            className = "exploreNewArtPanel"
            />
            <div className="confusedText">Not sure what you like yet?</div>
            <button className = "findMyTaste">Find My Taste!</button>
        </div>
        
  
    )
}

export {ExploreBodyView}
