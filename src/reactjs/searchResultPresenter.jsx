import { useSelector } from "react-redux"

import {SearchTopBar} from "/src/views/SearchBar/SearchTopBarView.jsx"

function SearchResult(props){

    let search = useSelector(state => state.SearchResults.resuts)

return(
<div>    


<SearchTopBar  results={search} >  </SearchTopBar>


</div>

)

}

export {SearchResult}
