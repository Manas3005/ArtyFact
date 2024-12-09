import { EntryEditTopBarView } from "../views/myJournalViews/EntryEditTopBarView";
import { EntryEditContentView } from "../views/myJournalViews/EntryEditContentView";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { addEntry } from "../store/journalsSlice";

function EntryEdit (props){
    console.log("Rendering EntryEdit")

    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [mood, setMood] = useState('');
    const [actualText, setActualText] = useState('');
    const [entryID, setEntryID] = useState(0);

    let dispatch = useDispatch()

    function saveChangesACB (){

        
        setEntryID(entryID + 1)

        const newEntry = {
            title: title || 'Untitled',
            date: date || 'today', // Default to today string for now
            mood: mood || 'Neutral',
            actualText: actualText || 'No text provided',
            entryID: entryID
          };

          console.log(newEntry)
        dispatch(addEntry(newEntry))
    }

    return (<div>

        <EntryEditTopBarView onSaveChanges={saveChangesACB}></EntryEditTopBarView>
        
        <EntryEditContentView onEntryTitleChange={setTitle} 
                            onEntryDateChange={setDate} 
                            onEntryMoodChange={setMood} 
                            onEntryTextChange={setActualText}></EntryEditContentView>

    </div>)

    
}

export {EntryEdit}