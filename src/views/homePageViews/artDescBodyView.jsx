import "/src/style.css"

function ArtDescBodyView (props) {
    console.log("-----THIS IS PROPS", props)
    console.log("PROPS ONE", props.artData)
    console.log(props.image)

    return (

        <div className="horizontalFlexParent"> 

            <img className="ArtDescImage" src= {props.image} />
            <div className="ArtDescTextPanel"> 

                <p className="ArtDescName">{props.artData.title}</p>
                <p className="ArtDescText">{props.artData.description}</p>
            </div>
        </div>
    )
}

export {ArtDescBodyView}