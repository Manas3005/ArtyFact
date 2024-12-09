import "/src/css/style.css"

function ExploreBodyView (props) {
    return (

        <div className="horizontalFlexParent">

            <div className="explorePanel">
                <img
                src= "image/exploreNewArtPanel.png" 
                className = "exploreNewArtPanel"
                />
                <div className="confusedText">Not sure what you like yet?</div>
                <button className = "findMyTaste">Find My Taste!</button>
            </div>

                <img className="exploreImage" src="image/Palazzo-Spada-Rome.png">
                </img>

        </div>
        
    )
}

export {ExploreBodyView}
