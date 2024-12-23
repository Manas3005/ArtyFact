
import { SearchChoose } from "/src/views/SearchBar/searchChoosenView.jsx";
import { useSelector } from "react-redux"
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setSelectedArtworkID } from "../store/journalsSlice";



function SearchChoosenPresent() {

    let dispatch = useDispatch();

    const [idData, setIdData] = useState(null);

    const currentArt = useSelector((state) => state.searchResults.currentArt);
    console.log("CURRENT ART THAT WILL BE DISPLAYED", currentArt)
  

    const idParam = useSelector((state) => state.searchResults.idParam);

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


    function addToJournalACB() {
       dispatch(setSelectedArtworkID(currentArt.image_id)) 
    }

    function parseDescription(description){

        const htmlString = description;

        // Create a temporary DOM element to parse the HTML
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = htmlString;
        
        // Extract the text content
        return tempDiv.textContent || tempDiv.innerText;
        
          
    }

    //console.log(data)

    return (
        <div>
            <SearchChoose 
            art={currentArt}
            onAddToJournalClick={addToJournalACB}
            onParseDescription={parseDescription}
             />
        </div>

    )


}

export { SearchChoosenPresent }