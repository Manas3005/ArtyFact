import { createSlice } from "@reduxjs/toolkit";

export const myCollections = createSlice({
    name : "myCollections",
    initialState: [],
    reducers:{
        //Definiera de olika reducers som vi vill använda, och deras logik.
        //vi behöver inte definiera actions för dessa reducers eftersom de är gjorda automatiskt av redux-toolkit.
        /**
         * När vi använder redux toolkit så används immer under the hood, så vi får skriva "mutable" logik här men ENDAST här inne.
         * Med react-redux 
         */ //Example of reducers.
        increment: (state) => {
            state.value += 1;
        },
        decrement: (state) => {
            state.value += 1;
        }
    }
})