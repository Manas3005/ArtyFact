import {MAIN_URL, IMAGE_URL, IMAGE_DIM} from "/src/apiConfig.js";


const options = {
    method: "GET",
    headers: {
        "AIC-User-Agent": "ArtyFact (teoman@kth.se)",
        mode: 'no-cors',
        
    },
}

export function testAPI() {
    console.log("This is the test API call");
    console.log("This is the MAIN_URL", MAIN_URL);
    console.log("This is the IMAGE_URL", IMAGE_URL);
    fetch(MAIN_URL+"artworks/129884", options).then(gotResponseACB).then(printResponseACB);
}


function gotResponseACB(result) {
    return result.json();  
}

function printResponseACB(result) {
    return result;
}

function checkResultStatusACB(result){

    if(result.status!==200){
        throw new Error("Error encountered!")
    }
    else {
        return result;
    }
} 

export function getArtWorks(searchParams) {
    return fetch(createURLParamsForArtWork(searchParams), options).then(gotResponseACB).then(printResponseACB);
}

export function getArtWorkByID(searchParams) {
    console.log("This is params", searchParams);
    return fetch(createURLParamsForArtWorksByID(searchParams), options).then(gotResponseACB).then(printResponseACB);
}

export function getArtWorksSearch(searchParams) {
    //debugger;
    return fetch(createURLParamsForArtWorkSearch(searchParams), options).then(gotResponseACB).then(printResponseACB);
}



export function getCollection(searchParams) {
    return fetch(createURLParamsForCollection(searchParams), options).then(gotResponseACB).then(printResponseACB);
}






export function getArtWorkImage(result){
    console.log("This is the IMAGE ID", result);
    const imageID = result;
    const imagePath = imageID + IMAGE_DIM;
    return fetch(URLParamsForImage(imagePath), options).then(gotImageACB)
}


export function fetchAllArtworks() { //allows to fetch all artworks (limit 100) can be used for anything i.e. option instances for the quiz 
    return fetch("https://api.artic.edu/api/v1/artworks?page=1&limit=100", options)
        .then(function(response) {
            if (!response.ok) {
                throw new Error(`HTTP error! status: `, response.status);
            }
            return response.json();
        })
}



function gotImageACB(result) {
    console.log("THIS IS THE RESULTING URL FOR THE IMAGE: ", result.url);
    return result.url;
}
function printGotImageACB(result) {
    console.log("this is image result", result);
}



export function getArtWorkImageModified(result){ //USED BY FINDMYTASTE
    console.log("This is the IMAGE ID DIRECT", result); 
    const imageID = result;
    const imagePath = imageID + IMAGE_DIM;
    return URLParamsForImageModified(imagePath);
}

export function URLParamsForImage(searchParams) { //DO NOT CHANGE OR REPLACE DURING MERGE, MOST OF THE APP USING IMAGES RELIES ON THIS
    console.log("the path in image", IMAGE_URL + searchParams)
    return IMAGE_URL + searchParams + IMAGE_DIM;
}



export function URLParamsForImageModified(searchParams) { //DO NOT CHANGE OR REPLACE DURING MERGE, FINDMYTASTE USES THIS
    console.log("the path in image", IMAGE_URL + searchParams)
    return IMAGE_URL + searchParams;
}


/**
 * An example of searchParams would be
 * {
 *  id: 1;
 * }
 * @param {*} searchParams 
 * @returns An API promise object.
 */
function createURLParamsForArtWork(searchParams) {
    console.log("This is the query", searchParams);
    console.log("THIS IS THE URL: ", MAIN_URL + "artworks/" + "?" + new URLSearchParams(searchParams))
    return MAIN_URL + "artworks/" + "?" + new URLSearchParams(searchParams);
    
} 

function createURLParamsForArtWorksByID(searchParams) {
    console.log("this is the url for fetching the single artwork by selected artist or more", MAIN_URL + "artworks/" + searchParams);
    return MAIN_URL + "artworks/" +  searchParams;
}


function createURLParamsForArtWorkSearch(searchParams) {
    //debugger;
    console.log("hell hea", MAIN_URL + "artworks/" + "search/" + "?" + new URLSearchParams(searchParams));
    //debugger;
    const url = MAIN_URL + "artworks/" + "search/" + "?q=" + new URLSearchParams(searchParams);
    console.log("URL:", url);
    return url;

}




const searchParams1 = {
    title: "example",   
}

function createURLParamsForSpecificArtWork(id, searchParams1) {
    return MAIN_URL + "/artworks/" + id + "?" + new URLSearchParams(searchParams1);
}

//Create API calls for gathering images
