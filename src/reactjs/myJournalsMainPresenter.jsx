import { JournalTopBarView } from "../views/myJournalViews/journalTopBarView";
import { JournalEntriesListView } from "../views/myJournalViews/journalEntriesListView";
import { useSelector } from "react-redux"


function MyJournalsMain (props){

    let journalEntries = useSelector(state => state.myJournals.entries)
    let selectedID = useSelector(state => state.myJournals.selectedEntryID)

    



    //helper function to finding matching entryID as current selected Journal entry
    function selectedEntryFinderCB(entry) {
        return entry.entryID === selectedID;
    }
    
    // updates selectedEntry using reacts re-render cycle, when component re-renders

    // passed down to views as selectedEntry and accessed as props.selectedEntry when editing or viewing
    const selectedEntry = journalEntries.find(selectedEntryFinderCB);  

    console.log("Selected ID:", selectedID);
    console.log("Selected Entry:", selectedEntry);
    
        return (<div>
        
            <JournalTopBarView isJournalEntrySelected={false} 
                                pageHeading={"My Journals"} 
                                topRightButtonText={"My Collections"}>

                                </JournalTopBarView>

            <JournalEntriesListView entries={journalEntries}> </JournalEntriesListView>
        
        </div>)

    

    
}

export {MyJournalsMain}