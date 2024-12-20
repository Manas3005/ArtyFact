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

export function getArtWorksWithLog(searchParams) {
    return fetch(createURLParamsForArtWork(searchParams), options).then(gotResponseACB).then((result) => console.log("this is where we are now ",result));
}



export function getArtWorksSearch(searchParams) {
    return fetch(createURLParamsForArtWorkSearch(searchParams), options).then(gotResponseACB).then(printResponseACB);
}

export function getArtWorkByID(searchParams) {
    console.log("This is params", searchParams);
    return fetch(createURLParamsForArtWorksByID(searchParams), options).then(gotResponseACB).then(printResponseACB);
}



export function getArtWorkImage(result){
    console.log("This is result", result);
    const imageID = result;
    const imagePath = imageID + IMAGE_DIM;
    return fetch(URLParamsForImage(imagePath), options).then(gotImageACB)
}
function gotImageACB(result) {
    console.log("this is result", result);
    return result.url;
}
function printGotImageACB(result) {
    console.log("this is image result", result);
}

export function URLParamsForImage(searchParams) {
    console.log("the path in image", IMAGE_URL + searchParams)
    return IMAGE_URL + searchParams + IMAGE_DIM;
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
    return MAIN_URL + "artworks/" +  "?" + new URLSearchParams(searchParams);
}
function createURLParamsForArtWorkSearch(searchParams) {
    console.log("hell hea", MAIN_URL + "artworks/" + "search/" + "?" + new URLSearchParams(searchParams))
    return MAIN_URL + "artworks/" + "search/" + "?" + new URLSearchParams(searchParams);
}
const searchParams1 = {
    title: "example",
}
function createURLParamsForSpecificArtWork(id, searchParams1) {
    return MAIN_URL + "/artworks/" + id + "?" + new URLSearchParams(searchParams1);
}

function createURLParamsForArtWorksByID(searchParams) {
    console.log("this is the url for fetching the single artwork by selected artist or more", MAIN_URL + "artworks/" + searchParams);
    return MAIN_URL + "artworks/" + searchParams;
    
}


//Create API calls for gathering images

export function testingAnAPICallForMostSimilar() {
    return fetch("https://www.artic.edu/artworks/129884/exploreFurther?ef-most-similar_ids=most-similar", options)
    .then(gotResponseACB).then(printGotImageACB);
}
