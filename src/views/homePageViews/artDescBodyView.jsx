import "/src/css/style.css"

function ArtDescBodyView (props) {
    console.log("-----THIS IS PROPS", props)
    console.log(props.image)

    function limitTextLength (inputtedText){
        const maxLength = 635;

        if (inputtedText.length < maxLength){
            return inputtedText
        }
    
        const smallerText = (inputtedText.substring(0, maxLength)) + "..."
        return smallerText
    }

    return (
            
        <div className="horizontalFlexParent"> 

            <img className="ArtDescImage" src= {props.image} />
            <div className="ArtDescTextPanel"> 

                <p className="ArtDescName">{props.artData.title}</p>
                <p className="ArtDescText">{limitTextLength(props.description) }</p>
                <p className="ArtContext" >  {props.artData.date_display}    </p>
                <p className="ArtContext"> {props.artData.artist_display}  </p>
                <p className="ArtContext"> {props.artData.classification_title}</p>
            </div>
        </div>
    )
}

export {ArtDescBodyView}