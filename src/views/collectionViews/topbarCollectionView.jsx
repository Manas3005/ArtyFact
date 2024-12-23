import { BackToHomeButton, MyJournalsButton, Button, SignInButton } from "../customViewComponents/backToHomeButton";
import "/src/css/collectionsStyle.css"
import "/src/css/collectionStyle.css"
import { useState, useEffect } from "react";

export function TopbarCollectionView(props) {

    console.log("This is the props in tobarCollectionView", props);

    /**
     * Vi vill göra så att när man trycker på edit collection att det kommer upp lite extra saker på skärmen. 
     * Så vi behöver conditionally render baserat på isEditing. 
     * 
     * Hur ska vi särskilja på save changes och cancel?
     * Vi inser att det är bättre om vi endast dispatchar efter vi tryckt på "save changes" för annars är den knappen meningslös.
     * 
     */

    console.log("This is the props in topbarcollectionview", props);

    const [title, setTitle] = useState(props.collection ? props.collection.collection_title : "");
    const [description, setDescription] = useState(props.collection ? props.collection.collection_description : "");


    useEffect(() => {
        // If the collection props change, update the local state
        setTitle(props.collection ? props.collection.collection_title : "");
        setDescription(props.collection ? props.collection.collection_description : "");
    }, [props.collection]);

    if (!props.collection) {
        return <div>Loading collection data...</div>;
    }

    function handleClickForBackToHomeACB(evt) {
        window.location.hash = "#/";
    }

    function handleClickForBackACB() {
        window.location.hash = "#/collections";
    }

    function handleToggleACB() {
        if (props.isEditing) {  //Om vi cancellerar då vill vi få tillbaka samma text som innan vi försökte ändra.
            setTitle(props.collection.collection_title || "");
            setDescription(props.collection.collection_description || "");
        }
        props.onToggleEdit();
    }

    function handleEditDescriptionACB(collection_description, collection_id) {
        console.log("This is the evt", collection_description);
        setDescription(collection_description);
        props.onEditDescription(collection_description, collection_id);
    }

    function handleEditTitleACB(collection_title, collection_id) {
        console.log("This is the collection title we are changing to", collection_title);
        setTitle(collection_title);
        props.onEditTitle(collection_title, collection_id);
    }

    function handleSaveChangesACB() {
        if (!title || title.trim() === "") {
            alert("Title is required for a collection!");
            return;
        }
        else {
        console.log("in handle");
        alert("Changes Changed Successfully!");
        props.onSaveChanges();
        }
    }



    return (

        <div>
            <div className="topbarCollection">

                
            <button onClick={handleClickForBackACB} className="backToHomeCollection">
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


                    <span>

                    {props.isEditing ? (
                    <>
                        <input type="text" className="collectionTitle" onChange={(e) => handleEditTitleACB(e.target.value, props.collection.collection_id)} value={title}
                        ></input>
                        <textarea
                            style={{ resize: 'none' }}
                            onChange={(e) => handleEditDescriptionACB(e.target.value, props.collection.collection_id)}
                            className="collectionName"
                            value={description}

                        ></textarea>
                        <button className="saveChanges" onClick={handleSaveChangesACB}>Save Changes</button>
                    </>
                ) : (
                    <>
                       <div className="topbarCollection">
                       <h1 className="collectionTitle">{props.collection.collection_title || ""}</h1>
                       <div className="collectionName">{props.collection.collection_description || ""}</div>
                      </div>
                    </>
                )}

                    </span>

               <span>
                <button className="editCollection" onClick={handleToggleACB}>
    {props.isEditing ? (
      "Cancel"
    ) : (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 576 512"
        className="editIcon"
        aria-label="Edit"
      >
        <path d="M402.6 83.2l90.2 90.2c3.8 3.8 3.8 10 0 13.8L274.4 405.6l-92.8 10.3c-12.4 1.4-22.9-9.1-21.5-21.5l10.3-92.8L388.8 83.2c3.8-3.8 10-3.8 13.8 0zm162-22.9l-48.8-48.8c-15.2-15.2-39.9-15.2-55.2 0l-35.4 35.4c-3.8 3.8-3.8 10 0 13.8l90.2 90.2c3.8 3.8 10 3.8 13.8 0l35.4-35.4c15.2-15.3 15.2-40 0-55.2zM384 346.2V448H64V128h229.8c3.2 0 6.2-1.3 8.5-3.5l40-40c7.6-7.6 2.2-20.5-8.5-20.5H48C21.5 64 0 85.5 0 112v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V306.2c0-10.7-12.9-16-20.5-8.5l-40 40c-2.2 2.3-3.5 5.3-3.5 8.5z" />
      </svg>
    )}
  </button>

                <SignInButton className={"signInLogo"}></SignInButton>

               </span>
              
                <button className="signInIcon">
                    <img src="/image/signinIcon.png" />
                </button>
            </div>
        </div>


    )





}