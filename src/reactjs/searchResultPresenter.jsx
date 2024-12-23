import { useSelector } from "react-redux";
import { getArtWorksSearch, getArtWorkByID } from "/src/apiCall.js";
import { SearchTopBar } from "/src/views/SearchBar/SearchTopBarView.jsx";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setCurrentArt } from "/src/store/searchResultSlice.js";

function SearchResult(props) {
  const [artData, setArtData] = useState(null); // For main artworks data
  const [artInfo, setArtInformation] = useState({}); // For art Information mapping
  const [loading, setLoading] = useState(true); // Track loading state
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

  const dispatch = useDispatch();

  function setCurrentArtACB(artInformation) {
    dispatch(setCurrentArt(artInformation));
  }

  useEffect(() => {
    (async () => {
      if (!searchParamSend || Object.keys(searchParamSend).length === 0) {
        console.log("Waiting for valid search parameters...");
        return;
      }

      try {
        setLoading(true); // Set loading to true while fetching
        const data = await getArtWorksSearch(searchParamSend);
        setArtData(data);

        if (data && data.data) {
          const results = await Promise.all(
            data.data.map(async (artwork) => {
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
  
          setArtInformation(information);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    })();
  }, [searchParamSend]);

  
  if (loading) 
    return (
      <div className="loading-container">
        <img 
          className="imageLoading" 
          src="https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExa2xveG51ZmJoOWxxZGIyNTRsenN2cTl4ajgxeXNjajl3NmI3OWZyMCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l3nWhI38IWDofyDrW/giphy.gif" 
          alt="Loading..." 
        />
      </div>
    );


  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <SearchTopBar
        artworks={artData}
        artInfo={artInfo}
        setIndividualArt={setCurrentArtACB}
      />
    </div>
  );
}

export { SearchResult };
