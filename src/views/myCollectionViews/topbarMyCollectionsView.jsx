import { MyJournalsButton } from "../customViewComponents/backToHomeButton";
import "/src/css/collectionsStyle.css"
import { BackToHomeButton } from "/src/views/customViewComponents/BackToHomeButton"
import "/src/css/journalsStyle.css"


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

    function handleCreateNewCollectionACB() {
        console.log("We have pressed create new collection");
            const selectCollectionModal = document.getElementById("selectCollectionModal")
            selectCollectionModal.style.display = "flex";
    }

    function handleCollectionChangeACB() {

    }

    //Should be handleCreateCollection
    function handleAddArtworkToCollectionACB() {
        if(props.title == "") {
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
                <MyJournalsButton className="myJournalCollection"></MyJournalsButton>

                <BackToHomeButton className="backToHomeCollection" ></BackToHomeButton>
                <input className="collectionsSearchBar" placeholder="Search Collections..." onChange={handleSearchACB} />
                <button className="buttonX"
                    onClick={handleClearButtonACB}
                    style={{ display: props.clearButton ? 'block' : 'none' }}>
                    x</button>
                <button className="signInlogo">Sign in</button>
                <button className="signInIcon" >
                    <img src="/image/signinIcon.png" />
                </button>
                <img className="collectionsLogo" style={{cursor:"pointer"}} src="/image/collectionsLogo.png" onClick={() => window.location.hash="/homepage"}/>

                <button className="addNewCollection" onClick={handleCreateNewCollectionACB}>Create New Collection</button>
            </div>


            <div id="selectCollectionModal" className="modal" >
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

                    <label htmlFor="collectionDescription">Description</label>
                    <input
                        type="text"
                        id="collectionDescription"
                        value={props.description}
                        onChange={(e) => props.setDescription(e.target.value)}
                        placeholder="Enter collection description (optional)"
                    />


                    <div className="modalButtonDiv">
                        <button className="goButton commonText commonButtonBase" onClick={handleAddArtworkToCollectionACB}>Save New Collection</button>
                        <button className="cancel commonText commonButtonBase" onClick={closeModalACB}>Cancel</button>
                    </div>

                </div>
            </div>

        </div>




    )

}