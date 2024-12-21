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

  const searchparamsTester = { // this is for testing 
    title: "Two Sisters",
    limit: 40,
  };

  const searchParam = useSelector((state) => state.searchResults.searchParam);
  console.log("SEARCHPARAM",searchParam)

  const dispatch = useDispatch();

  function setCurrentArtACB(artInformation) {
    console.log("ARTINFO RENDERED",artInformation)
    dispatch(setCurrentArt(artInformation));
        //dispatch(setNewSearchParam(evt.target.value));
  }

  // Fetch the list of artworks
  useEffect(() => {
    async function fetchArtworks() {
      try {
        const data = await getArtWorksSearch(searchParam);
        setArtData(data);
        console.log("CHECK IT OUT",data)
      } catch (err) {
        setError(err.message);
      }
    }
    fetchArtworks();
  }, []);

  // Fetch image_id for each artwork
  useEffect(() => {
    async function fetchImageIDs() {

      if (!artData || !artData.data) return;

      try {
        const results = await Promise.all(
          artData.data.map(async (artwork) => {
            const data = await getArtWorkByID(artwork.id);
            console.log("What did we fetch", data);

            return { id: artwork.id, 
                image_id: data.data.image_id ,
                medium_display: data.data.medium_display,
                artist_title: data.data.artist_title ,
                place_of_origin : data.data.place_of_origin,
                dimensions:data.data.dimensions ,
                description: data.data.description,
                style_title: data.data.style_title,
                date_display: data.data.date_display
            };

          })
        );

        const information = results.reduce((acc, curr) => {
          acc[curr.id] = {
            image_id:        curr.image_id,
            medium_display:  curr.medium_display,
            artist:          curr.artist_title,
            place_of_origin: curr.place_of_origin,
            dimensions:      curr.dimensions,
            description:     curr.description,
            style_title:     curr.style_title,
            date_display:    curr.date_display

        };

          return acc;
        }, {});

        setArtInformation(information);

      } catch (err) {
        setError(err.message);
      }

    }
    fetchImageIDs();
  }, [artData]);

  if (error) return <div>Error: {error}</div>;
  if (!artData || !artInfo) return <div>Loading...</div>;

  console.log("Fetched Art Images:", artInfo);

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
