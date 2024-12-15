


import { testAPI, getArtWorks, getArtWorkImage, URLParamsForImage, getArtWorksSearch} from '/src/apiCall.js';

export function SearchTopBar(props){



console.log("THIS IS THE PROPS THAT IS PASSED TO SEARCHVIEW",props)
    
let hello = props.artworks.data[0].image_id
let image = URLParamsForImage(hello)

return (
  <div>

    <button>  Home  </button>
    <img src= {image} />
    


  </div>  
)

}