import { EntryEditTopBarView } from "../views/myJournalViews/EntryEditTopBarView";
import { EntryEditContentView } from "../views/myJournalViews/EntryEditContentView";

function EntryEdit (props){
    console.log("Rendering EntryEdit")

    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [mood, setMood] = useState('');
    const [actualText, setActualText] = useState('');
    const [entryID, setEntryID] = useState('');

    return (<div>

        <EntryEditTopBarView></EntryEditTopBarView>
        <EntryEditContentView></EntryEditContentView>

    </div>)

    
}

export {EntryEdit}