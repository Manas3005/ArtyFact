
import { SearchChoose } from "/src/views/SearchBar/searchChoosenView.jsx";
import { useSelector } from "react-redux"



function SearchChoosenPresent(){

    const search = useSelector((state) => state.searchResults.results);
  
    const currentArt = useSelector((state) => state.searchResults.currentArt);
    console.log("CURRENT ART THAT WILL BE DISPLAYED",currentArt)

return (
<div>
 <SearchChoose art={currentArt} />
</div>
   
)


}

export {SearchChoosenPresent}