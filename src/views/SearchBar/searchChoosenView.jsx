import { URLParamsForImage } from "/src/apiCall.js";
import "/src/css/searchChoosenStyle.css";
import "/src/css/searchResultStyle.css"

export function SearchChoose(props) {
  console.log("WE ARE IN THE CHOOSEN VIEW", props);

  function handleAddToJournalClickACB () {
    props.onAddToJournalClick()
    return window.location.hash = '#/editentry'
  }


  const htmlString = props.art.description;

  // Create a temporary DOM element to parse the HTML
  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = htmlString;
  
  // Extract the text content
  const readableText = tempDiv.textContent || tempDiv.innerText;
  

  return (
    <div>
      <img  src="https://i.imgur.com/viSeXcY.png" className="logoArty"/>  


      <button  className="homeButton"> 
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" viewBox="0 0 16 16">
               <path fill-rule="evenodd" d="M11.354 1.146a.5.5 0 0 1 0 .708L5.207 8l6.147 6.146a.5.5 0 0 1-.708.708l-6.5-6.5a.5.5 0 0 1 0-.708l6.5-6.5a.5.5 0 0 1 .708 0z"/>
               </svg>
          </button>


      <div className="chooseImage">
        <img src={URLParamsForImage(props.art.image_id)} className="image" />
      </div>
        
      <div className="artDetails">

        <div className="artTitle">{props.art.art_name}</div>

        <div className="buttonGroup">
          <button className="addCollection">Add to collection</button>
          <button className="addJournal" onClick={handleAddToJournalClickACB}>Add to journal</button>
        </div>

        <div className="info">
  <div>
    <span className="title">Artist:</span>
    <span className="value">{props.art.artist || " Artist not found "}</span>
  </div>
  <div>
    <span className="title">Description:</span>
    <span className="value">{readableText || " Description not found "}</span>
  </div>

  <div>
    <span className="title">Date:</span>
    <span className="value">{props.art.date_display || " Date not found "}</span>
  </div>


  <div>
    <span className="title">Origin:</span>
    <span className="value">{props.art.place_of_origin || "(Data not found)"}</span>
  </div>
  <div>
    <span className="title">Medium:</span>
    <span className="value">{props.art.medium_display || " Medium not found "}</span>
  </div>
  <div>
    <span className="title">Style:</span>
    <span className="value">{props.art.style_title || " Style not found "}</span>
  </div>
  <div>
    <span className="title">Dimensions:</span>
    <span className="value">{props.art.dimensions || " Dimensions not found"}</span>
  </div>
</div>


      </div>
    </div>
  );
}
