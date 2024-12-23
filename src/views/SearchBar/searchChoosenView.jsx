import { URLParamsForImage } from "/src/apiCall.js";
import "/src/css/searchChoosenStyle.css";
import "/src/css/searchResultStyle.css"
import "/src/css/journalsStyle.css"

export function SearchChoose(props) {
  console.log("WE ARE IN THE CHOOSEN VIEW", props);

  if (!props.art) {
    return (
      <div>
        <p>No artwork found!</p>
      </div>
    )
  }

  function closeModalACB() {
    const selectCollectionModal = document.getElementById("selectCollectionModal")
    selectCollectionModal.style.display = "none";
  }


  function handleAddToCollectionACB() {
    if (props.parsedCollectionsForDropDown) {
      const selectCollectionModal = document.getElementById("selectCollectionModal")
      selectCollectionModal.style.display = "flex";
    } else {
      alert("No collections exist yet!");
    }
  }

  function handleCollectionChangeACB(event) {
    console.log("This is the event target value", event.target.value);
    const selectedCollectionID = event.target.value;
    props.onCollectionIDChange(selectedCollectionID);
  }


  function handleAddArtworkToCollectionACB() {
    if (props.selectedCollectionID) {
      console.log("this is the....", props.selectedCollectionID);
      props.onAddArtWorkToCollection(props.selectedCollectionID, props.art);
      const selectCollectionModal = document.getElementById("selectCollectionModal")
      selectCollectionModal.style.display = "none";
      alert("Artwork saved successfully to collection!");
    } else {
      alert("Please select a collection first.");
    }
  }


  const htmlString = props.art.description;

  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = htmlString;

  const readableText = tempDiv.textContent || tempDiv.innerText;


  return (
    <div>
      <img src="https://i.imgur.com/viSeXcY.png" className="logoArty" onClick={() => window.location.hash = "/"} />


      <button className="homeButton">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="white" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M11.354 1.146a.5.5 0 0 1 0 .708L5.207 8l6.147 6.146a.5.5 0 0 1-.708.708l-6.5-6.5a.5.5 0 0 1 0-.708l6.5-6.5a.5.5 0 0 1 .708 0z" />
        </svg>
      </button>


      <div className="chooseImage">
        <img src={URLParamsForImage(props.art.image_id)} className="image" />
      </div>

      <div className="artDetails">

        <div className="artTitle">{props.art.art_name}</div>

        <div className="buttonGroup">
          <button className="addCollection" onClick={() => handleAddToCollectionACB()}>Add To Collection</button>
          <button className="addJournal">Add To Journal</button>
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

      <div id="selectCollectionModal" className="modal1" >
        <div className="modal-content1">
          <h2 className="commonText">Select the Collection you would like to add this Artwork to:</h2>

          <select size="1" onChange={handleCollectionChangeACB} defaultValue="">
            <option value="" disabled>
              Choose a collection
            </option>
            {props.parsedCollectionsForDropDown.map((collection) => (
              <option key={collection.collection_id} value={collection.collection_id}>
                {collection.collection_title}
              </option>
            ))}
          </select>




          <div className="modalButtonDiv1">
            <button className="goButton commonText commonButtonBase" onClick={handleAddArtworkToCollectionACB}>Save</button>
            <button className="cancel commonText commonButtonBase" onClick={closeModalACB}>Cancel</button>
          </div>

        </div>
      </div>
    </div>
  );
}
