import { useEffect, useState } from "react";

import { ArtDescBodyView } from "../../views/homePageViews/artDescBodyView";
import { testAPI, getArtWorks, getArtWorkImage, URLParamsForImage } from '/src/apiCall.js';



function ArtDescBody(props){

    const [artData, setArtData] = useState(null); 
    const [error, setError] = useState(null);

    useEffect(() => {
        getArtWorks({id: 1234}).then(data => iterateThroughData(data)).catch(error => setError(error.message));
    }, []); 
    if (error) return <div>Error: {error}</div>;
    if (!artData) return <div>Loading...</div>;

    function iterateThroughData(array) {
        console.log("This is the array", array);
        console.log("This is it", array.data.filter(artwork => artwork.title && artwork.title !== "Untitled"));
        const filteredData = array.data.filter(artwork => artwork.description && artwork.title && artwork.title !== "Untitled" && artwork.image_id !== null && artwork.image_id);
        setArtData(filteredData);
    }
    
  
    const randomArt = artData ? artData[Math.floor(Math.random() * artData.length)] : null;

    const image = randomArt ? URLParamsForImage(randomArt.image_id) : null;

    console.log("this is artData", artData);
    console.log("Selected random art:", randomArt);
    console.log("The image URL:", image);
   
    return <ArtDescBodyView 
                artData={randomArt} 
                image={image}
                />
}

export {ArtDescBody}