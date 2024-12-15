


import { testAPI, getArtWorks, getArtWorkImage, URLParamsForImage, getArtWorksSearch} from '/src/apiCall.js';

export function SearchTopBar(props){
console.log("THIS IS THE PROPS THAT IS PASSED TO SEARCHVIEW",props)   
let hello = props.artworks.data[0].image_id
let allData = props.artworks.data
let image = URLParamsForImage(hello)


function eventHandlerForHomeClickACB() {
    window.location.hash="#/homepage";        
}



return (
  <div>
    <button onClick={eventHandlerForHomeClickACB}>  Home  </button>
     {[...allData].map(renderSearchResultsCB)} 

  </div>  
)


function renderSearchResultsCB(result) {  
        

    function onClickImageEventACB(){
        console.log("image has been clicked for : " )
        window.location.hash="#/searchChoosen";    
    }

    return (
    <div key={result.id} >     
      <img src={URLParamsForImage(result.id)} height="200" onClick={onClickImageEventACB}></img>

      <span>
            {result.title}
      </span>
    </div>
    


);

}

}