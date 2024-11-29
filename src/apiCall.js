import {MAIN_URL, IMAGE_URL, IMAGE_DIM} from "/src/apiConfig.js";


const options = {
    method: "GET",
    headers: {
        "AIC-User-Agent": "ArtyFact (teoman@kth.se)"
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
    console.log(result);
}

function checkResultStatusACB(result){

    if(result.status!==200){
        throw new Error("Error encountered!")
    }
    else {
        return result;
    }
}
function getJSONDataACB (result){
    return result.data
}

export function getArtWorks(searchParams) {
    return fetch(createURLParamsForArtWork(searchParams), options).then(gotResponseACB).then(printResponseACB);
}

export function getArtWorkImage(result){
    const imageID = result.image_id //check gotResponseACB
    return (imageID + IMAGE_DIM)
    
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
    return MAIN_URL + "/artworks/" + "?" + new URLSearchParams(searchParams);
}
const searchParams1 = {
    title: "example",
}
function createURLParamsForSpecificArtWork(id, searchParams1) {
    return MAIN_URL + "/artworks/" + id + "?" + new URLSearchParams(searchParams1);
}