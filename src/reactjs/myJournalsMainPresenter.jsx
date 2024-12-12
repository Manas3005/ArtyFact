import { JournalTopBarView } from "../views/myJournalViews/journalTopBarView";
import { JournalEntriesListView } from "../views/myJournalViews/journalEntriesListView";
import { useSelector } from "react-redux"

function MyJournalsMain (props){

    let journalEntries = useSelector(state => state.myJournals.entries)
    let selectedID = useSelector(state => state.myJournals.selectedEntryID)

    function selectedEntryFinderCB(entry) {
        return entry.entryID === selectedID;
    }
    
    const selectedEntry = journalEntries.find(selectedEntryFinderCB);

    console.log("Selected ID:", selectedID);
    console.log("Selected Entry:", selectedEntry);

    return (<div>

        <JournalTopBarView></JournalTopBarView>
        <JournalEntriesListView entries={journalEntries}></JournalEntriesListView>
    </div>)

    
}

export {MyJournalsMain}