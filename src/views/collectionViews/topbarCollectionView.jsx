import {BackToHomeButton, MyJournalsButton, Button, SignInButton } from "../customViewComponents/backToHomeButton";
import "/src/css/collectionsStyle.css"
import "/src/css/collectionStyle.css"
import { useState, useEffect } from "react";

export function TopbarCollectionView(props) {

    /**
     * Vi vill göra så att när man trycker på edit collection att det kommer upp lite extra saker på skärmen. 
     * Så vi behöver conditionally render baserat på isEditing. 
     * 
     * Hur ska vi särskilja på save changes och cancel?
     * Vi inser att det är bättre om vi endast dispatchar efter vi tryckt på "save changes" för annars är den knappen meningslös.
     * 
     */

  
    console.log("This is the props in topbarcollectionview", props);

    const [title, setTitle] = useState(props.collection.collection_title || "");
    const [description, setDescription] = useState(props.collection.collection_description || "");

    useEffect(() => {
        setTitle(props.collection.collection_title || "");
        setDescription(props.collection.collection_description || "");
    }, [props.collection]);
    
    function handleClickForBackToHomeACB(evt) {
        window.location.hash = "#/";
    }

    function handleclickForMyJournalACB() {
        window.location.hash ="#/myJournal";
    }
    
    if (!props.collection) {
        return <div>Loading collection data...</div>;
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
        console.log("in handle");
        props.onSaveChanges();
    }
    


    return (

        <div>
            <div className="topbarCollection">
                <button className={"backToHomeCollection"} onClick={handleClickForBackToHomeACB}>Back To Home</button>
                <button className={"MyJournalCollection"} onClick={handleclickForMyJournalACB}>Back slfkjdsf</button>

            {props.isEditing ? (
                <>
                    <input type="text" className="collectionTitle" onChange={(e) => handleEditTitleACB(e.target.value, props.collection.collection_id)}                         value={title}  
                    ></input>
                    <textarea
                        style={{resize: 'none'}}
                        onChange={(e) => handleEditDescriptionACB(e.target.value, props.collection.collection_id)}
                        className="collectionName"
                        value={description}  

                    ></textarea>
                    <button className="saveChanges" onClick={handleSaveChangesACB}>Save Changes</button>
                </>
            ) : (
                <>
                    <h1 className="collectionTitle">{props.collection.collection_title || ""}</h1>
                    <div className="collectionName">{props.collection.collection_description || ""}</div>
                </>
            )}

                <button className="editCollection" onClick={handleToggleACB}>{props.isEditing ? "Cancel": "Edit Collection"}</button>
                <SignInButton className={"signInLogo"}></SignInButton>
                <button className="signInIcon">
                <img src = "/image/signinIcon.png"/>
                </button>
            </div>
        </div> 


    )





}