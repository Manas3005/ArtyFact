import { createSlice } from "@reduxjs/toolkit";
import { entries } from "mobx";

export const myJournalEntries = createSlice({
    name : "myJournalEntries",
    initialState: {
        entries: [], // Array to store journal entries
        latestEntryID:0,
        selectedEntryID: ''
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
        increaseLatestEntryID: (state) => {
            state.latestEntryID ++;
        },
        setSelectedEntryID: (state, action) => { //sets the selected entry ID, when a journal entry is clicked in the entry list
            state.selectedEntryID = action.payload
        }
        }
    }
)

export const { addEntry, removeEntry, increaseLatestEntryID, setSelectedEntryID} = myJournalEntries.actions;