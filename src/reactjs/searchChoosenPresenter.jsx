
import { SearchChoose } from "/src/views/SearchBar/searchChoosenView.jsx";
import { useSelector } from "react-redux"
function SearchChoosenPresent(){

    const search = useSelector((state) => state.searchResults.results);
  


return (
<div>
 <SearchChoose results={search} />
</div>
   
)


}

export {SearchChoosenPresent}