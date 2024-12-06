import { testAPI, getArtWorks } from "../apiCall.js"
import { HomePage } from "./homepagePresenter.jsx"
import {MyCollectionsPresenter} from "./myCollectionsPresenter.jsx"
import {  createHashRouter,  RouterProvider} from "react-router-dom";
import { store} from "../index.jsx";

export function makeRouter(model){
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
            path: "/collections",
            element: <MyCollectionsPresenter store ={store}></MyCollectionsPresenter>
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