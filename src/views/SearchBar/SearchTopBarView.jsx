import { URLParamsForImage } from "/src/apiCall.js";

export function SearchTopBar(props) {

  console.log("THIS IS THE PROPS THAT IS SENT TO VIEW",props)
  const { artworks, artImages, onSearchInitiated } = props;
  const allData = artworks.data;

  function eventHandlerForHomeClickACB() {
    window.location.hash = "#/homepage";
  }

  function renderSearchResultsCB(result) {
    const image_id = artImages[result.id]; // Get image_id from props

    function onClickImageEventACB() {
      console.log("Image has been clicked for:", result.id);
      window.location.hash = "#/searchChoosen";
    }

    return (
      <div key={result.id}>
        {image_id ? (
          <img
            src={URLParamsForImage(image_id)}
            height="200"
            onClick={onClickImageEventACB}
            alt={result.title}
          />
        ) : (
          <span>Loading image...</span>
        )}
        <span>{result.title}</span>
      </div>
    );
  }

  return (
    <div>
      <button onClick={eventHandlerForHomeClickACB}>Home</button>
      {allData.map(renderSearchResultsCB)}
    </div>
  );
}
