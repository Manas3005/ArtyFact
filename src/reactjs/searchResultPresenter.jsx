import { useSelector } from "react-redux"
import {getArtWorks} from "/src/apiCall.js"
import {SearchTopBar} from "/src/views/SearchBar/SearchTopBarView.jsx"
import { useEffect, useState } from "react";

function SearchResult(props) {
    const search = useSelector((state) => state.searchResults.results);
    const [artData, setArtData] = useState(null); // State to hold fetched data
    const [error, setError] = useState(null); // State to hold errors
    const [hello, setHello] = useState(true); // State to trigger re-render

    function fetchSearchACB(){
    getArtWorks().then((data) => {setArtData(data); setHello(false);}).catch((err) => setError(err.message));
    }

    useEffect(fetchSearchACB, [] ); 

    // Handle loading and error states
    if (error) return <div>Error: {error}</div>;
    if (hello || !artData) return <div>Loading...</div>;

    // Render SearchTopBar when hello is false
    return (
        <div>
            <SearchTopBar results={search} artworks={artData} />
        </div>
    );
}

export {SearchResult}
