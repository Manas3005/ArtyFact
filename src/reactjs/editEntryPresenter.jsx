import { EntryEditTopBarView } from "../views/myJournalViews/EntryEditTopBarView";
import { EntryEditContentView } from "../views/myJournalViews/EntryEditContentView";

function EntryEdit (props){
    console.log("Rendering EntryEdit")
    return (<div>

        <EntryEditTopBarView></EntryEditTopBarView>
        <EntryEditContentView></EntryEditContentView>

    </div>)

    
}

export {EntryEdit}