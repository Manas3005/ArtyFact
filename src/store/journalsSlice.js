import { createSlice } from "@reduxjs/toolkit";

export const myJournalEntries = createSlice({
    name : "myJournalEntries",
    initialState: {
        entries: [], // Array to store journal entries
        latestEntryID:0,
        selectedEntryID: '',
        selectedArtworkID:null
    },
    reducers:{
        addEntry: (state, action) => {
            state.entries.push(action.payload); // Add new entry to entries array
          },

        removeEntry: (state) => {
            
                function entryFilterCB(entry){
                    if (entry.entryID === state.selectedEntryID){
                        return false
                    }
                    return true
                }
                state.entries= state.entries.filter(entryFilterCB); // Remove the current entry you are viewing from entries array
            
        },
        setEntries: (state, action) => { 
            state.entries = action.payload;
        },
        
        increaseLatestEntryID: (state) => {
            state.latestEntryID ++;
        },
        setSelectedEntryID: (state, action) => { //sets the selected entry ID, when a journal entry is clicked in the entry list
            state.selectedEntryID = action.payload
        },
        editEntry: (state,action) => {
            return {...state, 
                // creates a shallow copy of the entire state, and only edits the parts of the which are 
                // changed, leaving the other parts of the state as it is 
        
            // sets edited entry to the entry that is currently selected, i.e. has the same id, then updates the entries array
            //action.payload is the updated entry object 
            entries: (state.entries.map((entry) => 
            entry.entryID === action.payload.entryID ? action.payload : entry
            ))}
        
        },
        setSelectedArtworkID: (state, action) => { 
            state.selectedArtworkID = action.payload
        }   
        }
    }
)

export const { addEntry, removeEntry, setEntries, increaseLatestEntryID, setSelectedEntryID, editEntry, setSelectedArtworkID} = myJournalEntries.actions;
