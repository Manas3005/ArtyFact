import { JournalTopBarView } from "../views/myJournalViews/journalTopBarView";
import { JournalEntriesListView } from "../views/myJournalViews/journalEntriesListView";
import { useSelector } from "react-redux"


function MyJournalsMain (props){

    let journalEntries = useSelector(state => state.myJournals.entries)
    
        return (<div>
        
            <JournalTopBarView isJournalEntrySelected={false} 
                                pageHeading={"My Journals"} 
                                topRightButtonText={"My Collections"}>

                                </JournalTopBarView>

            <JournalEntriesListView entries={journalEntries}> </JournalEntriesListView>
        
        </div>)   
}

export {MyJournalsMain}