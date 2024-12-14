import { createSlice } from "@reduxjs/toolkit";


export const searchResults = createSlice({

    name : "searchResults",
    initialState: {
        results: [], // Array to store all the found art pieces
    },

    reducers:{

        copyFoundArtList: (state,action)=>{
        
            state.results = [...action.payload]; // this makes a copy of the array and stores it in the results

        }

        }

    }
)
export const {copyFoundArtList } = searchResults.actions;