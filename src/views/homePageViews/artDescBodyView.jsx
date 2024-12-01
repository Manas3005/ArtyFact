import "/src/style.css"

function ArtDescBodyView (props) {
    return (

        <div className="horizontalFlexParent"> 

            <img className="ArtDescImage" src= "image/artdeschomepage.png" />
            <div className="ArtDescTextPanel"> 

                <span className="ArtDescName">Land of Bradbury</span>
                <p className="ArtDescText">The painting captures a stark and evocative scene in black and white, amplifying its sense of desolation and quiet beauty. 
                    A long, narrow road stretches into the distance, leading the viewer's eye toward a barren expanse of land. 
                    The terrain appears cracked and dry, emphasizing the harshness of the environment. 
                    On the horizon, a cluster of buildings sits in solitude, their angular forms silhouetted against the pale, featureless sky.</p>
            </div>
        </div>
    )
}

export {ArtDescBodyView}