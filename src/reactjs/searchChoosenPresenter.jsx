
import { SearchChoose } from "/src/views/SearchBar/searchChoosenView.jsx";
import { useDispatch, useSelector } from "react-redux"
import { useState } from "react";
import { addArtWorkToCollection } from "/src/utilities";
import { setCollectionsArray } from "../store/collectionsSlice";
import { parseCollectionDropDown } from "../utilities";



function SearchChoosenPresent() {

    const [idData, setIdData] = useState(null);
    const dispatch = useDispatch();

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

    function handleAddArtWorkToCollectionACB(collection_id, artWork_id) {
        console.log("This is the artWork_id we are going to add to the collection", artWork_id);
        //Now we assume that we have knowledge of the collection_id, so we call upon the utility function.
        //Vi behöver skicka in hela collections array, men hur kan vi hämta den? useSelector
        console.log("These are all the collections", allCollections);
        const newAllCollections = addArtWorkToCollection(allCollections, artWork_id, collection_id);
        dispatch(setCollectionsArray(newAllCollections));
        console.log("New all collections", newAllCollections);
    }





    //console.log(data)

    return (
        <div>
            <SearchChoose 
            art={currentArt}
            onAddArtWorkToCollection={handleAddArtWorkToCollectionACB}
            parsedCollectionsForDropDown={parsedCollectionsForDropDown}
            />
        </div>

    )


}

export { SearchChoosenPresent } 