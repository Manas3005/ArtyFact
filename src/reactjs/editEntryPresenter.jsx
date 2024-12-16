import { EntryEditTopBarView } from "../views/myJournalViews/EntryEditTopBarView";
import { EntryEditContentView } from "../views/myJournalViews/EntryEditContentView";
import { useDispatch } from "react-redux";
import { useState } from "react";
import { addEntry, increaseLatestEntryID } from "../store/journalsSlice";
import { useSelector } from "react-redux"

function EntryEdit (props){

    let journalEntries = useSelector(state => state.myJournals.entries)
    let entryID = useSelector(state => state.myJournals.latestEntryID)
    let currentEntryID = useSelector(state => state.myJournals.selectedEntryID)

    const [title, setTitle] = useState('');
    const [mood, setMood] = useState('');
    const [actualText, setActualText] = useState('');
     
    let dispatch = useDispatch()

    // logic for adding todays date
    
    const today = new Date();
    const dateString = today.toDateString();
    

    // ACB for saving changes or adding new entry from edit / add entry page
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

    function selectedEntryFinderCB(entry) {
        if(currentEntryID !== null){
            return entry.entryID === currentEntryID;
        }
        console.log("adding working")
        return false
    }

    const selectedEntry = journalEntries.find(selectedEntryFinderCB);   
    const inputTitle = selectedEntry ? selectedEntry.title : ""
    const inputMood = selectedEntry ? selectedEntry.mood : ""
    const inputActualText = selectedEntry ? selectedEntry.actualText : ""

    return (<div>

        <EntryEditTopBarView onSaveChanges={saveChangesACB}
                             entryID={currentEntryID}>

                             </EntryEditTopBarView>
        
        <EntryEditContentView onEntryTitleChange={setTitle} 
                            todayDate={dateString} 
                            onEntryMoodChange={setMood} 
                            onEntryTextChange={setActualText}
                            
                            entryID={currentEntryID}
                            inputTitle={inputTitle}
                            inputMood={inputMood}
                            inputActualText={inputActualText}>

                            </EntryEditContentView>

    </div>)   
}

export {EntryEdit}