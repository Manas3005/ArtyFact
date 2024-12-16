import { createSlice } from "@reduxjs/toolkit";
import { entries } from "mobx";

export const myJournalEntries = createSlice({
    name : "myJournalEntries",
    initialState: {
        entries: [], // Array to store journal entries
    },
    reducers:{
        addEntry: (state, action) => {
            state.entries.push(action.payload); // Add new entry to entries array
          },

        removeEntry: (state, action) => {
            
                function entryFilterCB(entry){
                    if (state.entries.id != entryToRemove.id){
                        return true
                    }
                }
                state.entries= state.entries.filter(entryFilterCB); // Remove the current entry you are viewing from entries array
            
        },
        setEntries: (state, action) => { 
            state.entries = action.payload;
        },
        /*setLatestEntryID: (state, action) => { 
            state.latestEntryID = action.payload;
        },*/
        }
    }
)

export const { addEntry, removeEntry, setEntries } = myJournalEntries.actions;