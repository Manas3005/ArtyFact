import "/src/css/collectionsStyle.css";
import { useEffect, useState } from "react";

export function ListOfCollectionsView(props) {

    console.log("This is the props", props);

    function handleNavigateACB() {
        window.location.hash='/thecollection';
    }



    function renderSlideShowCB(images) {
        return [...images].map((image, i) => (
            <img
                key={i}
                src={image}
                alt={`Slide ${i}`}
                className={`collection-image ${i === props.activeIndex ? "active" : "hidden"}`}
                onClick={handleNavigateACB}
                
            />
        ));
    }

    function renderCollectionCB(collection) {
        return (
            <div className="collection-item" key={collection.title}>
                <div className="image-title">{collection.title}</div>
                <div className="slideshow-container">{renderSlideShowCB(collection.images)}</div>
            </div>
        );
    }

    return <div className="myCollectionBox">{[...props.collections].map(renderCollectionCB)}</div>;
}
