import { useSelector } from "react-redux"
import {getArtWorksSearch} from "/src/apiCall.js"
import {SearchTopBar} from "/src/views/SearchBar/SearchTopBarView.jsx"
import { useEffect, useState } from "react";

function SearchResult(props) {
    const search = useSelector((state) => state.searchResults.results);
    const [artData, setArtData] = useState(null);  
    const [error, setError] = useState(null);       

    const searchparams = {
        title: "Two Sisters",  
        image_id : "",
    };


    

    function fetchSearchACB(){
        getArtWorksSearch(searchparams).then((data) => {setArtData(data);}).catch((err) => setError(err.message));
   
    }

    useEffect(fetchSearchACB, [] ); 

   
    if (error) return <div>Error: {error}</div>;
    if (!artData) return <div>Loading...</div>;

    console.log("THIS IS THE DATA THAT IS FETCHED ----",artData)
    return (
        <div>
            <SearchTopBar results={search} artworks={artData} />
        </div>
    );
}

export {SearchResult}
