import { EntryEditTopBarView } from "../views/myJournalViews/EntryEditTopBarView";
import { EntryEditContentView } from "../views/myJournalViews/EntryEditContentView";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { addEntry, increaseLatestEntryID } from "../store/journalsSlice";
import { useSelector } from "react-redux"

function EntryEdit (props){

    let entryID = useSelector(state => state.myJournals.latestEntryID)


    const [title, setTitle] = useState('');
    const [mood, setMood] = useState('');
    const [actualText, setActualText] = useState('');
     
    let dispatch = useDispatch()

    const today = new Date();
    const dateString = today.toDateString();

    function saveChangesACB (){

        const newEntry = {
            title: title || 'Untitled',
            date: dateString, // Default to today string for now
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
                            todayDate={dateString} 
                            onEntryMoodChange={setMood} 
                            onEntryTextChange={setActualText}></EntryEditContentView>

    </div>)

    
}

export {EntryEdit}