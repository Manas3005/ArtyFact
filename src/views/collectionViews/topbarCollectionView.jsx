import {BackToHomeButton, MyJournalsButton, Button, SignInButton } from "../customViewComponents/backToHomeButton";
import "/src/css/collectionsStyle.css"
import "/src/css/collectionStyle.css"


export function TopbarCollectionView(props) {

    /**
     * Vi vill göra så att när man trycker på edit collection att det kommer upp lite extra saker på skärmen. 
     * Så vi behöver conditionally render baserat på isEditing. 
     */

  
    console.log("This is the props in topbarcollectionview", props);

    
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
        props.onToggleEdit();
    }

    function handleEditField(collection_description, collection_id) {
        console.log("This is the evt", collection_description);
        props.onEditDescription(collection_description, collection_id);
    }
    


    return (

        <div>
            <div className="topbarCollection">
                <button className={"backToHomeCollection"} onClick={handleClickForBackToHomeACB}>Back To Home</button>
                <button className={"MyJournalCollection"} onClick={handleclickForMyJournalACB}>Back slfkjdsf</button>

                {props.isEditing ? (
                <>
                    <input type="text" className="collectionTitle"></input>
                    <textarea
                        style={{resize: 'none'}}
                        onChange={(e) => handleEditField(e.target.value, props.collection.collection_id)}
                        className="collectionName"
                    ></textarea>
                    <button className="saveChanges">Save Changes</button>
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