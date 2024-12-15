


import { testAPI, getArtWorks, getArtWorkImage, URLParamsForImage, getArtWorksSearch} from '/src/apiCall.js';

export function SearchTopBar(props){
console.log("THIS IS THE PROPS THAT IS PASSED TO SEARCHVIEW",props)   
let hello = props.artworks.data[0].image_id
let allData = props.artworks.data
let image = URLParamsForImage(hello)


function eventHandlerForHomeClickACB(evt) {
    window.location.hash="#/homepage";        
}


return (
  <div>
    <button onClick={eventHandlerForHomeClickACB}>  Home  </button>
     {[...allData].map(renderSearchResultsCB)} 

  </div>  
)


function renderSearchResultsCB(result) {  
        
    return (
    <div key={result.id} >     
      <img src={URLParamsForImage(result.image_id)} height="100"></img>
    
    </div>
);

}

}