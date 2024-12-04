import { testAPI, getArtWorks } from "../apiCall.js"
import { HomePage } from "./homepagePresenter.jsx"
import { MyJournalsMain } from "./myJournalsMainPresenter.jsx";
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