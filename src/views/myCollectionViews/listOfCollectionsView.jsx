import "/src/css/collectionsStyle.css";
import { useEffect, useState } from "react";

export function ListOfCollectionsView(props) {

    console.log("This is the props in listOfCollectionsView", props);

    //Nu är frågan om vi vill använda component state eller inte, eller ifall vi vill hämta själva collection:en från firebase?
    function handleNavigateACB(evt, collection) {
        console.log("-------------EVERYTHING RELATED TO PRESSING ON A COLLECTION STARTS NOW--------------");
        console.log("This is the evt", evt);
        console.log("This is the collection in event", collection);
        //Här sätter vi en viss collection in i en ny array i store. Men det kanske vi inte vill göra.
        //Utan vid rendering av den view:n vill vi hämta från firebase det aktuella datan.
        //Men då är frågan, hur ska vi göra det? Ska vi göra det genom att 
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

        //[...props.collections].map((collection) => console.log(collection));
        //props.setCollection(newArray);
        /**
         * Här behöver vi lägga till logik för att skicka data till application state.
         * vi behöver definiera en ny reducer som tar in ett objekt, där objektet är den specifika collection:en.
         * 
         */
        window.location.hash='/thecollection';
    }



    function renderSlideShowCB(artWorks, collection) {
        console.log("We have been given the artworks now. This is the collection in renderSlideShowCB", collection, "and these are the artworks", artWorks);
        //console.log("This are the artWorks in renderSlideShowCB", artWorks);
        return [...artWorks].map((artWork, i) => (
            <img
                key={i}
                src={artWork.image_URL}
                alt={`Slide ${i}`}
                className={`collection-image ${i === props.activeIndex ? "active" : "hidden"}`}
                onClick={(evt) => handleNavigateACB(evt, collection)}
            />
        ));
    }

    function renderCollectionCB(collection) {
        console.log("this is a collection in rednerCollectionCB", collection, "we are about to render its title and then call the renderSlideShowCB to render artworks");
        return (
            <div className="collection-item" key={collection.collection_title}>
                <div className="image-title">{collection.collection_title}</div>
                <div className="slideshow-container">{renderSlideShowCB(collection.artWorks, collection)}</div>
            </div>
        );
    }

    return <div className="myCollectionBox">{[...props.collections].map(renderCollectionCB)}</div>;
}
