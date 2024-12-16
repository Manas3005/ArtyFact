import { testAPI, getArtWorks } from "../apiCall.js"
import { HomePage } from "./homepagePresenter.jsx"
import { MyJournalsMain } from "./myJournalsMainPresenter.jsx";
import { EntryEdit } from "./editEntryPresenter.jsx";
import {MyCollectionsPresenter} from "./myCollectionsPresenter.jsx"
import {  createHashRouter,  RouterProvider} from "react-router-dom";
import { store} from "../index.jsx";
import { FindMyTaste } from "./findMyTastePresenter.jsx";
import { useDispatch } from "react-redux";
import { useEffect} from "react";
import { connectToFirebase } from "../firebaseModel.js";

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
        }
        
    ])
}


function ReactRoot(props){

    /* moved To React Root from index.jsx because the hooks like useEffect needs to be used inside
      the <Provider> component in index.jsx. The <Provider> from react-redux must be at the top 
      level, wrapping the entire React component tree (including App), which is hwy is is called in 
      ReactRoot as it is wrapped in <Provider> component in index.jsx .

    */
    let dispatch = useDispatch();

    //on login

    useEffect(() => {
        connectToFirebase(store, dispatch); // Pass state and the dispatch objects, the dispatch cannot be called inside FirebaseModel
    }, [dispatch]);


    return (

        
        <div>
            
             <RouterProvider router={makeRouter(store)}/>
   
        </div>
        
         
    )
        

}

export{ReactRoot}