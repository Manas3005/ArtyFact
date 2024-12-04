import { testAPI, getArtWorks } from "../apiCall.js"
import { HomePage } from "./homepagePresenter.jsx"
import {  createHashRouter,  RouterProvider} from "react-router-dom";
import { store} from "../index.jsx";
import { FindMyTaste } from "./findMyTastePresenter.jsx";

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
            path: "/findMyTaste",
            element: <FindMyTaste store = {store}></FindMyTaste>
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