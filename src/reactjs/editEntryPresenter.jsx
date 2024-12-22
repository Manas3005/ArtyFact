import { EntryEditTopBarView } from "../views/myJournalViews/EntryEditTopBarView";
import { EntryEditContentView } from "../views/myJournalViews/EntryEditContentView";
import { useDispatch } from "react-redux";
import { useState,useEffect } from "react";
import { addEntry, increaseLatestEntryID, editEntry } from "../store/journalsSlice";
import { useSelector } from "react-redux"
import {setNewSearchParam} from "/src/store/searchResultSlice.js";

function EntryEdit (props){

    let journalEntries = useSelector(state => state.myJournals.entries)
    let entryID = useSelector(state => state.myJournals.latestEntryID)
    let currentEntryID = useSelector(state => state.myJournals.selectedEntryID)
    let imageID = useSelector(state => state.myJournals.selectedArtworkID)

    const [title, setTitle] = useState('');
    const [mood, setMood] = useState('');
    const [actualText, setActualText] = useState('');
    const [searchParam, setSearchParam] = useState('');
    let dispatch = useDispatch()

    function selectedEntryFinderCB(entry) {
        if(currentEntryID !== null){
            return entry.entryID === currentEntryID;
        }
        console.log("adding working")
        return false
    }

    const selectedEntry = journalEntries.find(selectedEntryFinderCB);

    // logic for adding todays date
    
    const today = new Date();
    const dateString = today.toDateString();
    

    // ACB for saving changes or adding new entry from edit / add entry page
    function saveChangesACB (){

        if (!selectedEntry){
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
        } else {
            console.log("editing existing entry")

            const updatedEntry = { 
                
                //keeps unedited parts of the selectedEntry as they are, 
                //and saves any edits to the properties otherwise, the id must remain the same
                
                ...selectedEntry,
                title: title,
                date: dateString,
                mood: mood,
                actualText: actualText,
            };
            console.log("updated entry", updatedEntry)
            console.log(currentEntryID)
            dispatch(editEntry(updatedEntry))

        }
    }

    function sendSearchParamACB (){
        const param = {
            title: searchParam,
            limit: 40
        }

        dispatch(setNewSearchParam(param))
    }
    
    useEffect(() => {
        if (selectedEntry) {
            setTitle(selectedEntry.title);
            setMood(selectedEntry.mood);
            setActualText(selectedEntry.actualText);
        }
    }, [selectedEntry]); 

    return (<div>

        <EntryEditTopBarView onSaveChanges={saveChangesACB}
                             entryID={currentEntryID}>

                             </EntryEditTopBarView>
        
        <EntryEditContentView onEntryTitleChange={setTitle} 
                            todayDate={dateString} 
                            onEntryMoodChange={setMood} 
                            onEntryTextChange={setActualText}
                            onSearchParamChange={setSearchParam}
                            onSearchParamsSend={sendSearchParamACB}


                            entryID={currentEntryID}
                            imageID={imageID}
                            inputTitle={title}
                            inputMood={mood}
                            inputActualText={actualText}>

                            </EntryEditContentView>

    </div>)   
}

export {EntryEdit}