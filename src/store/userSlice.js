import { createSlice } from "@reduxjs/toolkit";

export const user = createSlice({
    name : "user",
    initialState: {
        profilePicURL: undefined, // initially, user is undefined
        uid: undefined,  // Initially, we don't know the auth state
    },
    reducers:{
        setUID: (state, action) => { 
            console.log("This is the UID in slice:", action.payload)
            state.uid = action.payload;
        },
        setProfilePicURL: (state, action) => { 
            state.profilePicURL = action.payload;
        }
        }
    }
)

export const {setUID, setProfilePicURL} = user.actions;