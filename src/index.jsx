import {createRoot} from "react-dom/client";
import { ReactRoot } from "/src/reactjs/ReactRoot.jsx";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { myCollections} from "./store/collectionsSlice";



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
        <Provider store = {store}>    
            <ReactRoot />;
        </Provider>
    </div>)
}

createRoot(document.getElementById('root'))
    .render(
        <App/>
    );