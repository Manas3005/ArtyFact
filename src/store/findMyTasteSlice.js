import { createSlice } from "@reduxjs/toolkit";

export const findMyTaste = createSlice({
    name : "findMyTaste",
    initialState: [{
        progress: 0,
    }],
    reducers:{
        progressIncrement: (state, action)=> {
            state.progress += action.payload
        }
    }
})