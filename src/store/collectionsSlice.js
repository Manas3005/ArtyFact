import { createSlice } from "@reduxjs/toolkit";

export const myCollections = createSlice({
    name : "myCollections",
    initialState: {
        searchQuery: [],
        collectionsArray: [],   //A list of collections
        singleCollectionArray: [], //A single collection
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
            console.log("This is the payload (for setCollectionsArray) given to store", action.payload);
            console.log("This is the type", action.type);
            state.collectionsArray = action.payload;
            console.log("This is the collections array after storing", state.collectionsArray);
        },
        setCollection: (state, action) => {
            console.log("This is the payload (for setCollection) given to store", action.payload);
            console.log("This is the collections array before storing", state.singleCollectionArray);
            state.singleCollectionArray = action.payload;
            console.log("This is the collections array after storing", state.singleCollectionArray);
        },
        editCollectionDescription: (state, action) => {
            console.log("This is the payload in editColletionDescription", action.payload);
            state.singleCollectionArray = action.payload;
            console.log("the store after updating", state.singleCollectionArray);

            console.log("This is the new description", action.payload.collection_description);
            const collection_id = action.payload.collection_id;
            const newDescription = action.payload.collection_description;            
        },
        editCollectionTitle: (state, action) => {
            console.log("This is the payload in editCollectionTitle", action.payload);
            state.singleCollectionArray = action.payload;
            console.log("the store after updating", state.singleCollectionArray);
        }
        
    }
})


export const { setSearchQuery, setCollectionsArray, setCollection, editCollectionDescription, editCollectionTitle} = myCollections.actions;

