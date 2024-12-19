import { URLParamsForImage } from "/src/apiCall.js";

export function SearchTopBar(props) {

  console.log("THIS IS THE PROPS THAT IS SENT TO VIEW",props)
  const { artworks, artInfo, onSearchInitiated } = props;
  const allData = artworks.data;

  function eventHandlerForHomeClickACB() {
    window.location.hash = "#/homepage";
  }

  function renderSearchResultsCB(result) {
    const foundInformation = artInfo[result.id]; // Get image_id from props
    


    function onClickImageEventACB() {
      console.log("Image has been clicked for:", foundInformation.artist);
      
      const allArtInformationToUpdate={
                art_name:result.title, 
                image_id: foundInformation.image_id ,
                medium_display: foundInformation.medium_display,
                artist: foundInformation.artist ,
                place_of_origin : foundInformation.place_of_origin,
                dimensions:foundInformation.dimensions ,
                description: foundInformation.description,
                style_title: foundInformation.style_title,
      };

      props.setIndividualArt(allArtInformationToUpdate)


      window.location.hash = "#/searchChoosen";
    }

    return (
      <div key={result.id}>
        {foundInformation ? (
          <img
            src={URLParamsForImage(foundInformation.image_id)}
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
