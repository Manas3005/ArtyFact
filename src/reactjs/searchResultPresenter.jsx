import { useSelector } from "react-redux";
import { getArtWorksSearch, getArtWorkByID } from "/src/apiCall.js";
import { SearchTopBar } from "/src/views/SearchBar/SearchTopBarView.jsx";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

function SearchResult(props) {
  const search = useSelector((state) => state.searchResults.results);
  const [artData, setArtData] = useState(null); // For main artworks data
  const [artImages, setArtImages] = useState({}); // For image_id mapping
  const [error, setError] = useState(null);

  const searchparams = {
    title: "Two Sisters",
    limit: 40,
  };
  const searchParam1 = useSelector((state) => state.searchResults.searchParam);
  console.log("SEARCHPARAM",searchParam1)

  const dispatch = useDispatch();

  function onEnterKeyPressed(evt) {
    dispatch(setNewSearchParam(evt.target.value));
  }

  // Fetch the list of artworks
  useEffect(() => {
    async function fetchArtworks() {
      try {
        const data = await getArtWorksSearch(searchParam1);
        setArtData(data);
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
            return { id: artwork.id, image_id: data.data.image_id };
          })
        );
        const images = results.reduce((acc, curr) => {
          acc[curr.id] = curr.image_id;
          return acc;
        }, {});
        setArtImages(images);
      } catch (err) {
        setError(err.message);
      }
    }
    fetchImageIDs();
  }, [artData]);

  if (error) return <div>Error: {error}</div>;
  if (!artData || !artImages) return <div>Loading...</div>;

  console.log("Fetched Art Images:", artImages);

  return (
    <div>
      <SearchTopBar
        results={search}
        artworks={artData}
        artImages={artImages} // Pass image_id mapping as a prop
        onSearchInitiated={onEnterKeyPressed}
      />
    </div>
  );
}

export { SearchResult };
