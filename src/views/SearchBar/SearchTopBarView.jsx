import { URLParamsForImage } from "/src/apiCall.js";
import "/src/css/searchResultStyle.css";

export function SearchTopBar(props) {
  console.log("THIS IS THE PROPS THAT IS SENT TO VIEW", props);
  const { artworks, artInfo, onSearchInitiated } = props;

  if(props.isLoading) {
    return (
      <div>
        loading results...
      </div>
    )
  }

  if(props.error) {
    return (
      <div>
        There was an error fetching artworks..
      </div>
    )
  }


  // Filter out artworks with null image_id
  const validData = artworks.data.filter(
    (result) => artInfo[result.id] && artInfo[result.id].image_id
  );

  function eventHandlerForHomeClickACB() {
    window.location.hash = "#/homepage";
  }

  function renderSearchResultsCB(result) {
    const foundInformation = artInfo[result.id]; // Get image_id from props
    console.log("This is the found info ", foundInformation);

    function onClickImageEventACB() {
      console.log("Image has been clicked for:", foundInformation.artist);

      const allArtInformationToUpdate = {
        art_name: result.title,
        image_id: foundInformation.image_id,
        medium_display: foundInformation.medium_display,
        artist: foundInformation.artist,
        place_of_origin: foundInformation.place_of_origin,
        dimensions: foundInformation.dimensions,
        description: foundInformation.description,
        style_title: foundInformation.style_title,
        date_display: foundInformation.date_display,
      };

      props.setIndividualArt(allArtInformationToUpdate);

      window.location.hash = "#/searchChoosen";
    }

    return (
      <div key={result.id}>
        <img
          className="resultImage"
          src={URLParamsForImage(foundInformation.image_id)}
          height="300"
          width="300"
          onClick={onClickImageEventACB}
        />
        <span className="artTitle">{result.title}</span>
        <span className="artist">{foundInformation.artist}</span>
      </div>
    );
  }

  return (
    <div>
      <div>
        <img src="https://i.imgur.com/viSeXcY.png" className="logoArty" />

        <button onClick={eventHandlerForHomeClickACB} className="homeButton">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="white"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M11.354 1.146a.5.5 0 0 1 0 .708L5.207 8l6.147 6.146a.5.5 0 0 1-.708.708l-6.5-6.5a.5.5 0 0 1 0-.708l6.5-6.5a.5.5 0 0 1 .708 0z"
            />
          </svg>
        </button>
      </div>

      <hr className="divider" />

      <div className="resultsContainer">{validData.map(renderSearchResultsCB)}</div>
    </div>
  );
}
