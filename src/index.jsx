import {createRoot} from "react-dom/client";
import { ReactRoot } from "/src/reactjs/ReactRoot.jsx";
import { createElement } from "react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { myCollections} from "./store/collectionsSlice";
import {useParams} from "react-router-dom";
import { makeRouter } from "./reactjs/ReactRoot";



//Store
export const store = configureStore({
    reducer: {
        myCollections: myCollections.reducer,
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
        <a href="/"></a>
        <Provider store = {store}>    
            <ReactRoot />;
        </Provider>
    </div>)
}

createRoot(document.getElementById('root'))
    .render(
        <App/>
    );