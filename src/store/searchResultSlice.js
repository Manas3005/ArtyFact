import { createSlice } from "@reduxjs/toolkit";


export const searchResults = createSlice({

    name : "searchResults",
    initialState: {
        results: [], // Array to store all the found art pieces
        currentArt : null,
        
        searchParam:{
             title : "",
             limit :40
        },

        idParam:{
            id:"",
            limit:1
        },

    },
    reducers:{
        copyFoundArtList: (state,action)=>{
        
            state.results = [...action.payload]; // this makes a copy of the array and stores it in the results

        },
        setNewSearchParam: (state,action) => {
            console.log("This is the payload (for setNewSearchParam) given to store", action.payload);
            console.log("This is the searchParam before storing", state.searchParam);
            state.searchParam = action.payload;
            console.log("This is the searchParam after storing", state.searchParam);
        },

        setCurrentArt: (state, action) => {
            state.currentArt = action.payload; // Fix property name
        },


        }

    }
)
export const {copyFoundArtList,setNewSearchParam,setCurrentArt } = searchResults.actions;