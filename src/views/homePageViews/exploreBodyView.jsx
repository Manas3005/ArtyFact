import "/src/style.css"

function ExploreBodyView (props) {

    function handleFindMyTasteClickACB () {
        return window.location.hash = "#/findMyTaste"
    }

    return (

        <div className="horizontalFlexParent">

            <div className="explorePanel">
                <img
                src= "image/exploreNewArtPanel.png" 
                className = "exploreNewArtPanel"
                />
                <div className="confusedText">Not sure what you like yet?</div>
                <button className = "findMyTaste" onClick = {handleFindMyTasteClickACB}>Find My Taste!</button>
            </div>

                <img className="exploreImage" src="image/Palazzo-Spada-Rome.png">
                </img>

        </div>
        
    )
}

export {ExploreBodyView}
