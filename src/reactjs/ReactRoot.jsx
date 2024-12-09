import { testAPI, getArtWorks } from "../apiCall.js"
import { HomePage } from "./homepagePresenter.jsx"
import { MyJournalsMain } from "./myJournalsMainPresenter.jsx";
import { EntryEdit } from "./editEntryPresenter.jsx";
import {  createHashRouter,  RouterProvider} from "react-router-dom";
import { store} from "../index.jsx";

export function makeRouter(store){
    return createHashRouter([
        {
            path:"/",
            element: <HomePage store ={store}></HomePage>
        },
        {
            path:"/homepage",
            element: <HomePage store ={store}></HomePage>
        },
        {
            path:"/myjournals",
            element: <MyJournalsMain store ={store}></MyJournalsMain>
        },
        {
            path:"/editentry",
            element: <EntryEdit store ={store}></EntryEdit>
        }
        
    ])
}


function ReactRoot(props){

    return (

        <div>
             <RouterProvider router={makeRouter(store)}/>
   
        </div>
        
         
    )
        

}

export{ReactRoot}