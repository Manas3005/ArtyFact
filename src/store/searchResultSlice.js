import { createSlice } from "@reduxjs/toolkit";


export const searchResults = createSlice({

    name : "searchResults",
    initialState: {
        results: [], // Array to store all the found art pieces
        currentArt : null,
        
        searchParam:{
             title : "",
             limiet :40
        }

    },

    reducers:{

        copyFoundArtList: (state,action)=>{
        
            state.results = [...action.payload]; // this makes a copy of the array and stores it in the results

        },

        setNewSearchParam:(state,action) =>{

            state.searchParam.title = action.payload;

        },

        setCurrentArt: (state, action) => {
            state.currentArt = action.payload; // Fix property name
        },


        }

    }
)
export const {copyFoundArtList,setNewSearchParam,setCurrentArt } = searchResults.actions;