import "/src/css/style.css"
import "/src/css/journalsStyle.css"
import { URLParamsForImage } from "../../apiCall"
import { renderEntryArtWorkPath } from "../../utilities"

export function EntryContentView(props){

    function handleDeleteEntryClickedACB (){
        const deleteEntryModal = document.getElementById("deleteEntryModal")
        deleteEntryModal.style.display = "flex";
    }

    function handleDeleteConfirmationACB(){
        props.onDeleteEntryClick()
        return window.location.hash = "#/myjournals"
    }

    function closeModalACB(){
        const deleteEntryModal = document.getElementById("deleteEntryModal")
        deleteEntryModal.style.display = "none";
    }

    function handleEditEntryClickedACB (){
        props.onEditEntryClick()
        return window.location.hash = "#/editentry"
    }
   
    return (
        <div className="journalsHorizontalFlexParent">

            <div className="leftContent commonText">
                
                <div>
                    <div className="contentFlexParent">

                    <span className="lastUpdatedLeft">   
                        <div className="journalEntryContent">Last Updated: {props.lastUpdated}</div>
                    </span> 

                    <div className="lastUpdatedRight">

                        <button className="editButton commonButtonBase" onClick={handleEditEntryClickedACB}>
                            <img className="Icon" src = "/image/editIcon.png" />
                            <text className="editText commonText">Edit</text>
                        </button>

                    </div>

                    </div>
                    <div className="journalEntryContent">Mood: {props.mood}</div>

                </div>

                <div className="scrollableTextArea">
                    <div className="journalEntryContent">{props.content}</div>
                </div>

            </div>

            <div className="rightContent">

                <div className="sidebarVerticalFlexParent">

                    <div className="topFlex commonCenterFlex">
                        <div className="artWorkBox commonCenterFlex">
                            <img className="starryNightIcon" src={renderEntryArtWorkPath(props.artworkID)}></img>
                        </div>
                    </div>

                    <div className="commonCenterFlex">

                        <button id="delete" className="deleteEntry commonText commonCenterFlex commonButtonBase" 
                                onClick={handleDeleteEntryClickedACB}>

                                <img className="Icon" src = "/image/deleteIcon.png" />
                                <text >Delete Journal Entry</text>        
                        </button>
                    </div>

                </div>
            </div>

            <div id="deleteEntryModal" class="modal" >
                <div class="modal-content">
                    <h2 className="commonText">Are you sure you want to delete this journal entry?</h2>
                    <img className="Icon" src = "/image/deleteIcon.png" />
                    <div className="modalButtonDiv">
                        <button className="goButton commonText commonButtonBase" onClick={handleDeleteConfirmationACB}>Yes</button>
                        <button id="closeModel" className="cancel commonText commonButtonBase" onClick={closeModalACB}>No</button>
                    </div>
                </div>
            </div>

        </div>

    ) 

}