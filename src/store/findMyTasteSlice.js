import { createSlice } from "@reduxjs/toolkit";

export const findMyTaste = createSlice({
    name : "findMyTaste",
    initialState: {
        progress: 0,
    },
    reducers:{
        incrementProgress: (state, action) => {
            if(state.progress<100){
                state.progress += action.payload
            }
        },

        decrementProgress: (state, action) => {
            if(state.progress>0){
                state.progress -= action.payload
            }
        }
    }
})

export const { incrementProgress, decrementProgress } = findMyTaste.actions;

