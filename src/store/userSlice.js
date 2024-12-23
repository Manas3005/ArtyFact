import { createSlice } from "@reduxjs/toolkit";

export const user = createSlice({
    name : "user",
    initialState: {
        profilePicURL: null, // profile picture URL of currently logged in user
        uid: null,  // uid of the current user that is logged in
        displayName: null // displayName of user, intially set to guest when not logged in
    },
    reducers:{
        setUID: (state, action) => { 
            console.log("This is the UID in slice:", action.payload)
            state.uid = action.payload;
        },
        setProfilePicURL: (state, action) => { 
            state.profilePicURL = action.payload;
        },
        setDisplayName: (state, action) => { 
            state.displayName= action.payload;
        }
        }
    }
)

export const {setUID, setProfilePicURL, setDisplayName} = user.actions;