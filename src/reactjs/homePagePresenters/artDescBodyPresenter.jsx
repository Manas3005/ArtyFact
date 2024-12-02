import { useEffect, useState } from "react";

import { ArtDescBodyView } from "../../views/homePageViews/artDescBodyView";
import { testAPI, getArtWorks, getArtWorkImage, URLParamsForImage, getArtWorksSearch} from '/src/apiCall.js';
import {cleanHtmlContent} from '/src/utilities.js'


function ArtDescBody(props){

    //Redux specific hooks
    //const selector = useSelector(); //Allows you to observe the latest data in the store (model)
    //const dispatch = useDispatch(); //Allows you to call upon setters in redux. So when u call setters, u just dispatch actions

    //This is component state - not anything to do with the model or store.
    const [artData, setArtData] = useState(null); 
    const [error, setError] = useState(null);

    //The first argument is an anonomyous ACB function that we define inside the argument.
    // We could might as well have defined it elsewhere and simply have given the functionACB reference as: useEffect(functionACB, []);
    //The name of this function could be "fetchArtWork" and its sole purpose would be to call the getArtWorks etc.
    useEffect(() => {
        getArtWorks().then(data => iterateThroughData(data)).catch(error => setError(error.message));
    }, []); 
    if (error) return <div>Error: {error}</div>;
    if (!artData) return <div>Loading...</div>;

    function iterateThroughData(array) {
        console.log("This is the array", array);
        console.log("This is it", array.data.filter(artwork => artwork.title && artwork.title !== "Untitled"));
        const filteredData = array.data.filter(artwork => artwork.description && artwork.title && artwork.title !== "Untitled" && artwork.image_id !== null && artwork.image_id);
        setArtData(filteredData);
    }

    function customEventHandlerForClickingACB(evt) {
        props.model.setNumberOfGuests(evt.target.value)
    }
  
    const randomArt = artData ? artData[Math.floor(Math.random() * artData.length)] : null;
    const image = randomArt ? URLParamsForImage(randomArt.image_id) : null;
    const cleanedDescription = randomArt ? cleanHtmlContent(randomArt.description) : '';
    console.log("cleaned", cleanedDescription);


    console.log("this is artData", artData);
    console.log("Selected random art:", randomArt);
    console.log("The image URL:", image);
   
    return <ArtDescBodyView 
                artData={randomArt} 
                image={image}
                description={cleanedDescription}
                />
}

export {ArtDescBody}