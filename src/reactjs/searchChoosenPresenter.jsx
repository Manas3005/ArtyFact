
import { SearchChoose } from "/src/views/SearchBar/searchChoosenView.jsx";
import { useDispatch, useSelector } from "react-redux"
import { useState } from "react";
import { addArtWorkToCollection } from "/src/utilities";
import { setCollectionsArray } from "../store/collectionsSlice";
import { parseCollectionDropDown } from "../utilities";
import { setSelectedArtworkID } from "../store/journalsSlice";




function SearchChoosenPresent() {

    const [idData, setIdData] = useState(null);
    const dispatch = useDispatch();
    const [selectedCollectionID, setSelectedCollectionID] = useState(null);

    const currentArt = useSelector((state) => state.searchResults.currentArt);
    const allCollections = useSelector((state) => state.myCollections.collectionsArray);
     
    console.log("CURRENT ART THAT WILL BE DISPLAYED", currentArt)
    /**
     * Det saknas för närvarande artwork_id bland currentArt.
     */
  

    const idParam = useSelector((state) => state.searchResults.idParam);

        const parsedCollectionsForDropDown = parseCollectionDropDown(allCollections);

    if (idParam.id !== "") {
        getArtWorkByID(idParam).then((data) => {
            setIdData(data);
            const currentArt = generateObjectForCurrentArt(idData);
        });
    }

    function addToJournalACB() {
        dispatch(setSelectedArtworkID(currentArt.image_id));
    }

    function generateObjectForCurrentArt(idData) {
        return {
            art_name: idData.title,
            image_id: idData.image_id,
            medium_display: idData.medium_display,
            artist: idData.artist,
            place_of_origin: idData.place_of_origin,
            dimensions: idData.dimensions,
            description: idData.description,
            style_title: idData.style_title,
            date_display: idData.date_display,
        }
    }

    function parseDescription(description){

        const htmlString = description;

        // Create a temporary DOM element to parse the HTML
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = htmlString;
        
        // Extract the text content
        return tempDiv.textContent || tempDiv.innerText;
        
          
    }

    function handleAddArtWorkToCollectionACB(collection_id, artWork) {
        console.log("This is the artwork we are going to add to the collection", artWork);
        //Now we assume that we have knowledge of the collection_id, so we call upon the utility function.
        //Vi behöver skicka in hela collections array, men hur kan vi hämta den? useSelector
        console.log("These are all the collections", allCollections);
        const newAllCollections = addArtWorkToCollection(allCollections, artWork, collection_id);
        dispatch(setCollectionsArray(newAllCollections));
        console.log("This is the collection_id we are changing", collection_id);
        console.log("New all collections", newAllCollections);
    }

  


    //console.log(data)

    return (
        <div>
            <SearchChoose 
            art={currentArt}
            onAddToJournalClick={addToJournalACB}
            onParseDescription={parseDescription}
            onAddArtWorkToCollection={handleAddArtWorkToCollectionACB}
            parsedCollectionsForDropDown={parsedCollectionsForDropDown}
            onCollectionIDChange={setSelectedCollectionID}
            selectedCollectionID={selectedCollectionID}
            />
        </div>

    )


}

export { SearchChoosenPresent } 