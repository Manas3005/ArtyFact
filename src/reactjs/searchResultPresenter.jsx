import { useSelector } from "react-redux"
import {getArtWorks} from "/src/apiCall.js"
import {SearchTopBar} from "/src/views/SearchBar/SearchTopBarView.jsx"
import { useEffect, useState } from "react";

function SearchResult(props) {
    const search = useSelector((state) => state.searchResults.results);
    const [artData, setArtData] = useState(null);  
    const [error, setError] = useState(null);       
    const [rendeReady, setRender] = useState(true); 

    function fetchSearchACB(){
    getArtWorks().then((data) => {setArtData(data); setRender(false);}).catch((err) => setError(err.message));
   
    }

    useEffect(fetchSearchACB, [] ); 

   
    if (error) return <div>Error: {error}</div>;
    if (rendeReady || !artData) return <div>Loading...</div>;

    console.log("THIS IS THE DATA THAT IS FETCHED ----",artData)
    return (
        <div>
            <SearchTopBar results={search} artworks={artData} />
        </div>
    );
}

export {SearchResult}
