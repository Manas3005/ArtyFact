import "/src/style.css"

function ArtDescBodyView (props) {
    console.log("-----THIS IS PROPS", props)
    console.log(props.image)

    return (

        <div className="horizontalFlexParent"> 

            <img className="ArtDescImage" src= {props.image} />
            <div className="ArtDescTextPanel"> 

                <p className="ArtDescName">{props.artData.title}</p>
                <p className="ArtDescText">{props.description}</p>
                <p className="ArtContext" >  {props.artData.date_display}    </p>
                <p className="ArtContext"> {props.artData.artist_display}  </p>
                <p className="ArtContext"> {props.artData.classification_title}</p>
            </div>
        </div>
    )
}

export {ArtDescBodyView}