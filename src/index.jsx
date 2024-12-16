import {createRoot} from "react-dom/client";
import { ReactRoot } from "/src/reactjs/ReactRoot.jsx";
import { Provider} from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { myCollections} from "./store/collectionsSlice";
import "./firebaseModel.js";
import { myJournalEntries } from "./store/journalsSlice";


import { findMyTaste } from "./store/findMyTasteSlice";
import { connectToFirebase } from "./firebaseModel.js";

//Store
export const store = configureStore({
    reducer: {
        myCollections: myCollections.reducer,
        myJournals: myJournalEntries.reducer,

        findMyTaste: findMyTaste.reducer,
        //to be added as separate slices
        //artWorks: artWorks.reducer,
        //journalEntryName: journalEntryName.reducer,
        //journalEntryImage: journalEntryName.reducer
    }
        
    },
)

export function App (){
    return (
    <div>
        <Provider store = {store}>
                
            <ReactRoot />
        </Provider>
    </div>)
}

createRoot(document.getElementById('root'))
    .render(
        <App/>
    );
