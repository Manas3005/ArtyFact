import "/src/css/collectionsStyle.css"

function TopbarCollectionsView(props) {

    console.log("These are the props in collections view", props);


    function backToHomeACB() {
        window.location.hash="#/";
    }

    function goToJournalACB() {
        window.location.hash="/myjournals";
    }

    function handleClearButtonACB(evt) {
        console.log("inside handle clear");
        props.setClearButton(false);
        //Vi vill även att tryckningen ska deleta texten inuti searchBar
    }
    

    function handleSearchACB(evt) {
        console.log("This is the evt", evt.target.value);
        console.log("Setting the search query to: ", evt.target.value);
        //setCollectionSearchQuery(evt.target.value);
        props.setSearch(evt.target.value);
        //console.log("This is the current search query", collectionSearchQuery);
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
                <button className="buttonX"
                    onClick={handleClearButtonACB} 
                    style={{display: props.clearButton ? 'block' : 'none' }}>
                    x</button> 
                <button className="signInlogo">Sign in</button>
                <button className="signInIcon" >
                <img src = "/image/signinIcon.png"/>
                </button>
                <img className = "collectionsLogo" src="/image/collectionsLogo.png" />

                <button className="addNewCollection">Create New Collection</button>
            </div>
            
        </div>




    )

}

export {TopbarCollectionsView}