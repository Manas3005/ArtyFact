import { MyJournalsButton } from "../customViewComponents/backToHomeButton";
import "/src/css/collectionsStyle.css"
import { BackToHomeButton } from "/src/views/customViewComponents/BackToHomeButton"
import "/src/css/collectionsStyle.css"


export function TopbarMyCollectionsView(props) {

    console.log("These are the props in collections view", props);




    function backToHomeACB() {
        window.location.hash = "#/";
    }

    function goToJournalACB() {
        window.location.hash = "/myjournals";
    }

    function handleClearButtonACB(evt) {
        console.log("inside handle clear");
        props.setClearButton(false);
        props.setSearch("");
        props.setSearchField("");
        //Vi vill även att tryckningen ska deleta texten inuti searchBar
    }


    function handleSearchACB(evt) {
        console.log("This is the evt", evt.target.value);
        console.log("Setting the search query to: ", evt.target.value);
        //setCollectionSearchQuery(evt.target.value);
        props.setSearch(evt.target.value);
        props.setSearchField(evt.target.value);
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

    function handleCreateNewCollectionACB() {
        console.log("We have pressed create new collection");
        const selectCollectionModal = document.getElementById("selectCollectionModal")
        selectCollectionModal.style.display = "flex";
    }

    function handleCollectionChangeACB() {

    }

    //Should be handleCreateCollection
    function handleAddArtworkToCollectionACB() {
        if (props.title == "") {
            alert("Collection must have title!")
        }
        else {
            const selectCollectionModal = document.getElementById("selectCollectionModal")
            selectCollectionModal.style.display = "none";
            props.onCreateCollection();
        }
    }

    function closeModalACB() {
        const selectCollectionModal = document.getElementById("selectCollectionModal")
        selectCollectionModal.style.display = "none";
    }


    return (

        <div>

            <div className="topbarCollection">
              
            <button onClick={backToHomeACB} className="backToHomeCollection">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className="icon">
    <path d="M575.8 255.5c0 18-15 32.1-32 32.1l-32 0 .7 160.2c0 2.7-.2 5.4-.5 8.1l0 16.2c0 22.1-17.9 40-40 40l-16 0c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1L416 512l-24 0c-22.1 0-40-17.9-40-40l0-24 0-64c0-17.7-14.3-32-32-32l-64 0c-17.7 0-32 14.3-32 32l0 64 0 24c0 22.1-17.9 40-40 40l-24 0-31.9 0c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2l-16 0c-22.1 0-40-17.9-40-40l0-112c0-.9 0-1.9 .1-2.8l0-69.7-32 0c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"/>
  </svg>
</button>

                
                <input className="collectionsSearchBar" placeholder = "Search Collections..." onChange={handleSearchACB}/>
                <button className="buttonX"
                    onClick={handleClearButtonACB}
                    style={{ display: props.clearButton ? 'block' : 'none' }}>
                    x</button>
                <button className="signInlogo">Sign in</button>
                <button className="signInIcon" >
                    <img src="/image/signinIcon.png" />
                </button>
                <img className="collectionsLogo" style={{ cursor: "pointer" }} src="/image/collectionsLogo.png" onClick={() => window.location.hash = "/homepage"} />

                <button className="addNewCollection" onClick={handleCreateNewCollectionACB}>Create New Collection</button>
            </div>


            <div id="selectCollectionModal" className="modal">
                <div className="modal-content">
                    <h2 className="commonText">Create A New Collection...!!</h2>

                    <label htmlFor="collectionTitle">Title *</label>
                    <input
                        type="text"
                        id="collectionTitle"
                        value={props.title}
                        onChange={(e) => props.setTitle(e.target.value)}
                        placeholder="Enter collection title"
                        required
                    />

                    <label htmlFor="collectionDescription">
                        Description <span className="optional">(optional)</span>
                    </label>
                    <textarea
                        id="collectionDescription"
                        value={props.description}
                        onChange={(e) => props.setDescription(e.target.value)}
                        placeholder="Enter collection description"
                    ></textarea>

                    <div className="modalButtonDiv">
                        <button
                            className="goButton commonText commonButtonBase"
                            onClick={handleAddArtworkToCollectionACB}
                        >
                            Save New Collection
                        </button>
                        <button
                            className="cancel commonText commonButtonBase"
                            onClick={closeModalACB}
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>


        </div>




    )

}