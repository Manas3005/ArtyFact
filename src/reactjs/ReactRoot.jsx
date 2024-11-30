import { testAPI, getArtWorks } from "../apiCall.js"
import { TopBar } from "./topBarPresenter.jsx"

function ReactRoot(props){

    return (
        <div>{testAPI()}
        <TopBar/></div>
        
    )
        

}

export{ReactRoot}