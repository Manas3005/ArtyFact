import { createSlice } from "@reduxjs/toolkit";

export const user = createSlice({
    name : "user",
    initialState: {
        user: undefined, // initially, user is undefined
        ready: false,  // Initially, the app is not ready
        uid: undefined,  // Initially, we don't know the auth state
    },
    reducers:{
        setReady: (state, action) => { 
            state.ready = action.payload
          },

        setUID: (state, action) => { 
            state.uid = action.payload;
        },
        setUser: (state, action) => { 
            state.user = action.payload;
        }
        }
    }
)

export const { setReady, setUID, setUser } = user.actions;