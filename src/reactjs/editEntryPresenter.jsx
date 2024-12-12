import { EntryEditTopBarView } from "../views/myJournalViews/EntryEditTopBarView";
import { EntryEditContentView } from "../views/myJournalViews/EntryEditContentView";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { addEntry, increaseLatestEntryID } from "../store/journalsSlice";
import { useSelector } from "react-redux"

function EntryEdit (props){

    let entryID = useSelector(state => state.myJournals.latestEntryID)

    console.log("Rendering EntryEdit")

    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [mood, setMood] = useState('');
    const [actualText, setActualText] = useState('');
     
    let dispatch = useDispatch()

    function saveChangesACB (){

           
        const newEntry = {
            title: title || 'Untitled',
            date: date || 'today', // Default to today string for now
            mood: mood || 'Neutral',
            actualText: actualText || 'No text provided',
            entryID: entryID
            
          };

         
          console.log(newEntry)
        dispatch(addEntry(newEntry))
        dispatch(increaseLatestEntryID())
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