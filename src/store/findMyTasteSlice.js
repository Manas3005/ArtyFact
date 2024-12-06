import { createSlice } from "@reduxjs/toolkit";

export const findMyTaste = createSlice({
    name : "findMyTaste",
    initialState: {
        progress: 0,
    },
    reducers:{
        incrementProgress: (state, action)=> {
            state.progress += action.payload
        }
    }
})

export const { incrementProgress } = findMyTaste.actions;

