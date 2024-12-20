import { createSlice } from "@reduxjs/toolkit";

export const user = createSlice({
    name : "user",
    initialState: {
        user: undefined, // initially, user is undefined
        uid: undefined,  // Initially, we don't know the auth state
    },
    reducers:{
        setUID: (state, action) => { 
            console.log("This is the UID in slice:", action.payload)
            state.uid = action.payload;
        },
        setUser: (state, action) => { 
            state.user = action.payload;
        }
        }
    }
)

export const {setUID, setUser} = user.actions;