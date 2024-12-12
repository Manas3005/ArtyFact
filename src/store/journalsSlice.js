import { createSlice } from "@reduxjs/toolkit";
import { entries } from "mobx";

export const myJournalEntries = createSlice({
    name : "myJournalEntries",
    initialState: {
        entries: [], // Array to store journal entries
        currentEntryID:0
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
        increaseEntryID: (state) => {
            state.currentEntryID ++;
        }

        }
    }
)

export const { addEntry, removeEntry, increaseEntryID} = myJournalEntries.actions;