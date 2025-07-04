import { EntryContentView } from "../views/myJournalViews/entryContentView";
import { JournalTopBarView } from "../views/myJournalViews/journalTopBarView";
import { removeEntry,setSelectedArtworkID,setSelectedEntryID } from "../store/journalsSlice";
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux";


function JournalEntryContent (props){

    let journalEntries = useSelector(state => state.myJournals.entries)
    let selectedID = useSelector(state => state.myJournals.selectedEntryID)

    let userUID = useSelector(state => state.user.uid)
    let userDisplayName = useSelector(state => state.user.displayName)
    let userProfilePicURL = useSelector(state => state.user.profilePicURL)

    let dispatch = useDispatch()

    //helper function to finding matching entryID as current selected Journal entry
    function selectedEntryFinderCB(entry) {
        return entry.entryID === selectedID;
    }
    
    // updates selectedEntry using reacts re-render cycle, when component re-renders
    // passed down to views as selectedEntry and accessed as props.selectedEntry when editing or viewing
    const selectedEntry = journalEntries.find(selectedEntryFinderCB);  

    console.log("Selected ID:", selectedID);
    console.log("Selected Entry:", selectedEntry);
    
    function onDeleteEntryClickedACB (){
        dispatch(setSelectedArtworkID(null))
        dispatch(removeEntry())
    }

    function setCurrentEntryArtworkIDACB (){
        dispatch(setSelectedArtworkID(selectedEntry.artworkID))
    }

    function defaultSelectedArtworkIDACB (){
        dispatch(setSelectedArtworkID(null))
    }

    function defaultSelectedEntryIDACB (){
        dispatch(setSelectedEntryID(null))
    }

        return (<div>
        
            <JournalTopBarView isJournalEntrySelected={true} 
                                pageHeading={selectedEntry.title} 
                                topRightButtonText={"Back To My Journals"}
                                onExitContentPage={defaultSelectedArtworkIDACB}
                                defaultSelectedEntryID={defaultSelectedEntryIDACB}
                                
                                userID={userUID} 
                                userName={userDisplayName} 
                                userProfilePicURL={userProfilePicURL}>    

                                </JournalTopBarView>
            
            <EntryContentView lastUpdated={selectedEntry.date}
                                mood={selectedEntry.mood}
                                content={selectedEntry.actualText}
                                artworkID={selectedEntry.artworkID}
                                onDeleteEntryClick={onDeleteEntryClickedACB} 
                                onEditEntryClick={setCurrentEntryArtworkIDACB}>
                                
                                </EntryContentView>
        
        </div>)   
}

export {JournalEntryContent}

