import { JournalTopBarView } from "../views/myJournalViews/journalTopBarView";
import { JournalEntriesListView } from "../views/myJournalViews/journalEntriesListView";
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux";
import { setSelectedEntryID, setSelectedArtworkID } from "../store/journalsSlice";


function MyJournalsMain (props){

    let dispatch = useDispatch()
    let journalEntries = useSelector(state => state.myJournals.entries)
    
    /*Login details after user logged in */ 
    let userUID = useSelector(state => state.user.uid)
    let userDisplayName = useSelector(state => state.user.displayName)
    let userProfilePicURL = useSelector(state => state.user.profilePicURL)

    //invoked when a new entry is being added and the user is directed to the edit journal entry page
    function onAddNewEntryClickACB (){ 
        dispatch(setSelectedEntryID(null))
    }

    function defaultSelectedArtworkIDACB (){
        dispatch(setSelectedArtworkID(null))
    }
        return (<div>
        
            <JournalTopBarView isJournalEntrySelected={false} 
                                pageHeading={"My Journals"} 
                                topRightButtonText={"My Collections"}
                                onAddNewEntryClick={onAddNewEntryClickACB}
                                onExitContentPage={defaultSelectedArtworkIDACB}
                                
                                userID={userUID} 
                                userName={userDisplayName} 
                                userProfilePicURL={userProfilePicURL}>

                                </JournalTopBarView>

            <JournalEntriesListView entries={journalEntries}> </JournalEntriesListView>
        
        </div>)   
}

export {MyJournalsMain}