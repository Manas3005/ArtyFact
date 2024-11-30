import { testAPI, getArtWorks } from "../apiCall.js"
import { ExploreBody } from "./homePagePresenters/exploreBodyPresenter.jsx"
import { TopBar } from "./homePagePresenters/topBarPresenter.jsx"

function ReactRoot(props){

    return (

        <div>

            <div> {testAPI()} <TopBar/> </div>
        
            <div> <ExploreBody/></div>
        
        </div>
        
        
       
         
    )
        

}

export{ReactRoot}