import "/src/collectionsCSS/collectionsStyle.css"

export function ListOfCollectionsView(props) {

    console.log("This is the props images", props.images)

    function renderListCB(image) {
        return (
            <div key={image.title} className="collection-item"  >
                <div className="image-title" key={image.title}> {image.title} </div>
                <img className="collection-image"src={image.image} alt={image.title} ></img>
            </div>
        )
    }


    return (
        <div className="myCollectionBox">
            {[...props.images].map(renderListCB)}
        </div>
    )

}

