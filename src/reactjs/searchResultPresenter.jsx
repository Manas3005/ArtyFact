import { useSelector } from "react-redux";
import { getArtWorksSearch, getArtWorkByID } from "/src/apiCall.js";
import { SearchTopBar } from "/src/views/SearchBar/SearchTopBarView.jsx";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {setCurrentArt} from "/src/store/searchResultSlice.js";


function SearchResult(props) {
  const [artData, setArtData] = useState(null); // For main artworks data
  const [artInfo, setArtInformation] = useState({}); // For art Information mapping
  const [error, setError] = useState(null);
  const [fullData, setFullData] = useState({});

  const searchparamsTester = { // this is for testing 
    title: "Two Sisters",
    limit: 40,
  };

  function isEmptyObject(firebaseData) {
    return firebaseData && (typeof firebaseData === "object" && Object.keys(firebaseData).length === 0);
  }
  
  const searchParamSend = useSelector((state) => state.searchResults.searchParam);
  if(isEmptyObject(searchParamSend)) {
    console.log("truthy");
  }
    console.log( "waiting...");
  console.log("THESE ARE THE SEARCH PARAMS", searchParamSend);

  const dispatch = useDispatch();

  function setCurrentArtACB(artInformation) {
    console.log("ARTINFO RENDERED",artInformation)
    dispatch(setCurrentArt(artInformation));
        //dispatch(setNewSearchParam(evt.target.value));
  }


  useEffect(() => {
    (async () => {
      if (isEmptyObject(searchParamSend)) {
        console.log("Waiting for valid search parameters...");
        return;
      }
  
      try {
        //Hämta artworks när vi laddat klart från firebase
        //debugger;
        console.log("starting to fetch now with the params", searchParamSend);
        const data = await getArtWorksSearch(searchParamSend);
        setArtData(data);
        console.log("Fetched Artworks Data:", data);
  
        //Hämtar image IDs efter artworks data is fetched
        if (data && data.data) {
          console.log("Inside if");
          const results = await Promise.all(
            data.data.map(async (artwork) => {
              console.log("about to fetch artworks by id");
              const details = await getArtWorkByID(artwork.id);
              console.log("Fetched Details for Artwork:", details);
              return {
                //Add another object that sends down the full data as prop??
                id: details.data.id,
                title: details.data.title,
                artist_display: details.data.artist_display,
                image_id: details.data.image_id,
                medium_display: details.data.medium_display,
                artist_title: details.data.artist_title,
                place_of_origin: details.data.place_of_origin,
                dimensions: details.data.dimensions,
                description: details.data.description,
                style_title: details.data.style_title,
                date_display: details.data.date_display,
              };
            })
          );
          console.log("This is ALL", results);
          setFullData(results);

  
          const information = results.reduce((acc, curr) => {
            console.log("This is the curr", curr);
            acc[curr.id] = {
              artWork_id: curr.id,
              title: curr.title,
              artist_display: curr.artist_display,
              image_id: curr.image_id,
              medium_display: curr.medium_display,
              artist: curr.artist_title,
              place_of_origin: curr.place_of_origin,
              dimensions: curr.dimensions,
              description: curr.description,
              style_title: curr.style_title,
              date_display: curr.date_display,
            };
            return acc;
          }, {});
          console.log("This is the full data", fullData);
          setArtInformation(information);
        }
      } catch (err) {
        setError(err.message);
      }
    })(); 
  }, [searchParamSend]);

  if (error) return <div>Error: {error}</div>;
  if (!artData || !artInfo) return <div>Loading...</div>;

  console.log("Fetched Art Images:", artInfo);

  return (
    <div>
      <SearchTopBar
        artworks={artData}
        artInfo={artInfo} 
        setIndividualArt={setCurrentArtACB}
        searchParams={searchParamSend}
      />
    </div>
  );
}

export { SearchResult };
