import { testAPI, getArtWorks } from "../apiCall.js"
import { HomePage } from "./homepagePresenter.jsx"
import { MyJournalsMain } from "./myJournalsMainPresenter.jsx";
import { EntryEdit } from "./editEntryPresenter.jsx";
import {MyCollectionsPresenter} from "./myCollectionsPresenter.jsx"
import {  createHashRouter,  RouterProvider} from "react-router-dom";
import {store} from "../index.jsx";
import { FindMyTaste } from "./findMyTastePresenter.jsx";
import {SearchResult} from "./searchResultPresenter.jsx"

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
        },
        {
            path: "/collections",
            element: <MyCollectionsPresenter store ={store}></MyCollectionsPresenter>
        },
        {   
            path: "/findMyTaste",
            element: <FindMyTaste store = {store}></FindMyTaste>
        },
        {   
            path: "/searchResult",
            element: <SearchResult store = {store}></SearchResult>
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