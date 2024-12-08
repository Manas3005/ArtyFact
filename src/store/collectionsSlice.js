import { createSlice } from "@reduxjs/toolkit";

export const myCollections = createSlice({
    name : "myCollections",
    initialState: {
        searchQuery: [],
        collectionsArray: [],
    },
    reducers:{
        //Definiera de olika reducers som vi vill använda, och deras logik.
        //vi behöver inte definiera actions för dessa reducers eftersom de är gjorda automatiskt av redux-toolkit.
        /**
         * När vi använder redux toolkit så används immer under the hood, så vi får skriva "mutable" logik här men ENDAST här inne.
         * Med react-redux 
         */ //Example of reducers.
        setSearchQuery: (state, action) => { //Kanske inte behövs ifall vi använder local?
            state.searchQuery = action.payload;
        },
        setCollectionsArray: (state, action) => {
            state.collectionsArray = action.payload;
        },
        
    }
})

    export const selectCollectionsArray = (state) => {
        return state.collectionsArray;
    }

export const { setSearchQuery, setCollectionsArray } = myCollections.actions;
