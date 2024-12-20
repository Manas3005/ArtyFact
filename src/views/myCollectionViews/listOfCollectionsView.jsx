import "/src/css/collectionsStyle.css";
import { useEffect, useState } from "react";

export function ListOfCollectionsView(props) {

    console.log("This is the props", props);

    function handleNavigateACB(evt, collection) {
        console.log("This is the evt", evt);
        console.log("This is the collection in event", collection);
        props.setCollection(collection);
        //Det vi behöver är att veta just vilken det är, och för att veta det behöver vi veta vilken collection vi har tryckt på.
        /**
         * Hur kan vi veta vilken collection vi har tryckt på?
         * Vi kan göra det genom att
         * 1) Associera varje collection med ett id?
         * 2) Skicka hela objektet när vi trycker på den.
         * Vad förväntar vi oss att få in i evt? Det är frågan.
         * Vi har nu faktiskt fått in själva collection. Det vi kan göra nu är att fylla den i application state.
         * Och då låter vi den collectionPresenter useSelecta den och skicka den som prop ner till collectoinView.
         */

        /*const newArray = [...props.collections].filter((collection) => {
            return collection.title == evt.target.value;
        });*/

        [...props.collections].map((collection) => console.log(collection));
        //props.setCollection(newArray);
        /**
         * Här behöver vi lägga till logik för att skicka data till application state.
         * vi behöver definiera en ny reducer som tar in ett objekt, där objektet är den specifika collection:en.
         * 
         */
        window.location.hash='/thecollection';
    }



    function renderSlideShowCB(artWorks, collection) {
        console.log("This is the collectio in renderSlideShowCB", collection);
        console.log("This are the artWorks in renderSlideShowCB", artWorks);
        return [...artWorks].map((artWork, i) => (
            <img
                key={i}
                src={artWork.image}
                alt={`Slide ${i}`}
                className={`collection-image ${i === props.activeIndex ? "active" : "hidden"}`}
                onClick={(evt) => handleNavigateACB(evt, collection)}
                
            />
        ));
    }

    function renderCollectionCB(collection) {
        return (
            <div className="collection-item" key={collection.title}>
                <div className="image-title">{collection.title}</div>
                <div className="slideshow-container">{renderSlideShowCB(collection.artWorks, collection)}</div>
            </div>
        );
    }

    return <div className="myCollectionBox">{[...props.collections].map(renderCollectionCB)}</div>;
}
