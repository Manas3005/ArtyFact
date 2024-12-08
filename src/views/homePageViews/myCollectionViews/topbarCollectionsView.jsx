import "/src/collectionsCSS/collectionsStyle.css"
import { useEffect, useState } from "react";

function TopbarCollectionsView(props) {

    function backToHomeACB() {
        window.location.hash="#/";
    }

    function goToJournalACB() {
        window.location.hash="/myJournal";
    }

    const [collectionSearchQuery, setCollectionSearchQuery] = useState();

    function handleSearchACB(evt) {
        console.log("This is the evt", evt.target.value);
        console.log("Setting the search query to: ", evt.target.value);
        setCollectionSearchQuery(evt.target.value);
        console.log("This is the current search query", collectionSearchQuery);
    }
    /**
     * Det vi vill göra är att vi vill skapa en search query.
     * Vi skapar en fetch till firebase inuti vår useEffect så att den görs när sidan rendererar.
     * I nuläget nöjer vi oss med att vi 
     * 
     * 
     * Vi behöver (väl) funktioner som tolka datan från firebase.
     */


  


    
    return (

        <div>

            <div className="topbarCollection">
                <button className="MyJournalCollection" onClick={goToJournalACB}>My Journals</button>
                
                <button className="backToHomeCollection" onClick={backToHomeACB}>Back To Home</button>
                <input className="collectionsSearchBar" placeholder = "Search Collections..." onChange={handleSearchACB}/> 
                <button className="signInlogo">Sign in</button>
                <button className="signInIcon" >
                <img src = "image/signinIcon.png" />
                </button>
                <img className = "collectionsLogo" src="image/collectionsLogo.png" />

                <button className="addNewCollection">Create New Collection</button>
            </div>
            
        </div>




    )

}

export {TopbarCollectionsView}