import { JournalTopBarView } from "../views/myJournalViews/journalTopBarView";
import { JournalEntriesListView } from "../views/myJournalViews/journalEntriesListView";

function MyJournalsMain (props){
    console.log("Rendering myJournalsMain")
    return (<div>

        <JournalTopBarView></JournalTopBarView>
        <JournalEntriesListView></JournalEntriesListView>
    </div>)

    
}

export {MyJournalsMain}