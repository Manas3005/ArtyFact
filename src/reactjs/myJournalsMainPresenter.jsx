import { JournalTopBarView } from "../views/myJournalViews/journalTopBarView";
import { JournalEntriesListView } from "../views/myJournalViews/journalEntriesListView";
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux";
import { setSelectedEntryID } from "../store/journalsSlice";


function MyJournalsMain (props){

    let journalEntries = useSelector(state => state.myJournals.entries)
    let dispatch = useDispatch()

    //invoked when a new entry is being added and the user is directed to the edit journal entry page
    function onAddNewEntryClickACB (){ 
        dispatch(setSelectedEntryID(null))
    }

        return (<div>
        
            <JournalTopBarView isJournalEntrySelected={false} 
                                pageHeading={"My Journals"} 
                                topRightButtonText={"My Collections"}
                                onAddNewEntryClick={onAddNewEntryClickACB}>
                                
                                </JournalTopBarView>

            <JournalEntriesListView entries={journalEntries}> </JournalEntriesListView>
        
        </div>)   
}

export {MyJournalsMain}