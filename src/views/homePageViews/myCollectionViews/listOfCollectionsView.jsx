import "/src/collectionsCSS/collectionsStyle.css";
import { useEffect, useState } from "react";

export function ListOfCollectionsView(props) {

    function handleNavigateACB() {
        window.location.hash='/thecollection'
    }

    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prevIndex) => (prevIndex + 1) % props.collections[0].images.length);
        }, 6000); 

        return () => clearInterval(interval); 
    }, [props.collections]);

    function renderSlideShowCB(images) {
        return [...images].map((image, i) => (
            <img
                key={i}
                src={image}
                alt={`Slide ${i}`}
                className={`collection-image ${i === activeIndex ? "active" : "hidden"}`}
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
