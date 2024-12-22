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
            console.log("This is the payload (for setCurrentArt) given to store", action.payload);
            console.log("This is the setCurrentArt before storing", state.searchParam);
            state.currentArt = action.payload; // Fix property name
            console.log("This is the currentArt after storing", state.searchParam);

        },


        }

    }
)
export const {copyFoundArtList,setNewSearchParam,setCurrentArt } = searchResults.actions;