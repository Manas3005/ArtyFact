import { URLParamsForImage } from "/src/apiCall.js";
import "/src/css/searchChoosenStyle.css";


export function SearchChoose(props) {
  console.log("WE ARE IN THE CHOOSEN VIEW", props);


  const htmlString = props.art.description;

  // Create a temporary DOM element to parse the HTML
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = htmlString;
  
  // Extract the text content
  const readableText = tempDiv.textContent || tempDiv.innerText;
  

  return (
    <div>
      <img  src="https://i.imgur.com/viSeXcY.png" className="logoArty"/>  

      <div className="chooseImage">
        <img src={URLParamsForImage(props.art.image_id)} className="image" />
      </div>

      <div className="artDetails">

        <div className="artTitle">{props.art.art_name}</div>

        <div className="buttonGroup">
          <button className="addCollection">Add to collection</button>
          <button className="addJournal">Add to journal</button>
        </div>

        <div className="info">
  <div>
    <span className="title">Artist:</span>
    <span className="value">{props.art.artist || "(Data not found)"}</span>
  </div>
  <div>
    <span className="title">Description:</span>
    <span className="value">{readableText || "(Data not found)"}</span>
  </div>

  <div>
    <span className="title">Date:</span>
    <span className="value">{props.art.date_display || "(Data not found)"}</span>
  </div>


  <div>
    <span className="title">Origin:</span>
    <span className="value">{props.art.place_of_origin || "(Data not found)"}</span>
  </div>
  <div>
    <span className="title">Medium:</span>
    <span className="value">{props.art.medium_display || "(Data not found)"}</span>
  </div>
  <div>
    <span className="title">Style:</span>
    <span className="value">{props.art.style_title || "(Data not found)"}</span>
  </div>
  <div>
    <span className="title">Dimensions:</span>
    <span className="value">{props.art.dimensions || "(Data not found)"}</span>
  </div>
</div>


      </div>
    </div>
  );
}
