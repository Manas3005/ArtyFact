import "/src/css/collectionsStyle.css";
import { useEffect, useState } from "react";

export function ListOfCollectionsView(props) {
    console.log("This is the props in ListOfCollectionsView", props);

    if (!props.collections || props.collections.length === 0) {
        console.log("No data");
        return (
            <div>
                You have no collections! You can create a new one above!
            </div>
        );
    }

    function handleNavigateACB(evt, collection) {
        console.log("-------------EVERYTHING RELATED TO PRESSING ON A COLLECTION STARTS NOW--------------");
        console.log("This is the evt", evt);
        console.log("This is the collection in event", collection);
        props.setCollection(collection);
        window.location.hash = '/thecollection';
    }

    function renderSlideShowCB(artWorks, collection) {
        console.log("We have been given the artworks now. This is the collection in renderSlideShowCB", collection, "and these are the artworks", artWorks);

        return artWorks.length > 0 ? (
            [...artWorks].map((artWork, i) => (
                <img
                    key={i}
                    src={artWork.image_URL || ""}
                    alt={`Slide ${i}`}
                    className={`collection-image ${i === props.activeIndex ? "active" : "hidden"}`}
                    onClick={(evt) => handleNavigateACB(evt, collection)}
                />
            ))
        ) : (
            <div className="no-artworks-message">
                <button onClick={(evt) => handleNavigateACB(evt, collection)}>There are no artworks in this collection.
                    Add new ones by using search or taking the quiz!
                </button>
                
                </div>
        );
    }

    function renderCollectionCB(collection) {
        console.log("This is a collection in renderCollectionCB", collection, "we are about to render its title and then call the renderSlideShowCB to render artworks");

        return (
            <div className="collection-item" key={collection.collection_title || ""}>
                <div className="image-title">{collection.collection_title || ""}</div>
                <div className="slideshow-container">
                    {renderSlideShowCB(collection.artWorks || [], collection)}
                </div>
            </div>
        );
    }

    return <div className="myCollectionBox">{[...props.collections].map(renderCollectionCB)}</div>;
}
