import { testAPI, getArtWorks } from "../apiCall.js"
import { HomePage } from "./homePagePresenters/homepagePresenter.jsx"

function ReactRoot(props){

    return (

        <div>

             {testAPI()} <HomePage></HomePage>

                
        </div>
        
         
    )
        

}

export{ReactRoot}