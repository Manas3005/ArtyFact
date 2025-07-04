import { intercept } from 'mobx';
import sanitizeHtml from 'sanitize-html'; 
import { getArtWorkByID, getArtWorksSearch, URLParamsForImage} from './apiCall';


export const cleanHtmlContent = (html) => {
    return sanitizeHtml(html, {
        allowedTags: [ ], 
        allowedAttributes: { '*': ['href'] },
    });
};


export function transformJournalTitleCB(entry) {
    return entry.title;
}


export function fetchAndProcessArtworks(selectedItems, constructSearchParams, onDataProcessed, filterType) { //This approach keeps track of the number of artworks that have gone through the processing stage
    //so that filterAndSetResultsACB is called only when all promises/fetches are resolved
    const tempAllArtworkData = []; 
    
    selectedItems.forEach(function (selectedItem) {
        const searchParams = constructSearchParams(selectedItem); // Constructs search parameters dynamically
        console.log("Search params here: ", searchParams);
        getArtWorksSearch(searchParams).then(function (allArtworks) { //searching all artworks including ones by selectedItem in selectedItems
            console.log("SINGULAR ARTWORK: ", allArtworks);
            let remainingArtworks = allArtworks.data.length;  // this is to track the number of artworks left to process, i.e. getArtWorkByID
            
            allArtworks.data.forEach(function (currentArtwork) {
                
                getArtWorkByID(currentArtwork.id).then(function (artworkDetails) {   //PROCESSING STAGE: this fetches each artwork by its id so the artist_title, image_url, etc. properties are accessible

                    tempAllArtworkData.push(artworkDetails.data); 
                    
                    remainingArtworks--;
                    if (remainingArtworks === 0 && tempAllArtworkData.length === allArtworks.data.length * selectedItems.length) { //since this can run before the async callbacks, it is important to check that all data has been fetched
                        console.log("HERE IS THE ORIGINAL VERSION", tempAllArtworkData);
                        onDataProcessed(tempAllArtworkData, filterType); // Call the callback to process the filtered data
                    }
                });
            });
        });
    });
}              


export async function getArtworkDetailsByObject(artworkDetails) {
    try {

        debugger;
        const data = artworkDetails;
        
        const allArtInformationToUpdate = {
            art_name: data.title || '',
            image_id: data.image_id || '',
            medium_display: data.medium_display || '',
            artist: data.artist_title || '',
            place_of_origin: data.place_of_origin || '',
            dimensions: data.dimensions || '',
            description: data.description || '',
            style_title: data.style_title || '',
            date_display: data.date_display || '',
        };

        return allArtInformationToUpdate;
    } catch (error) {
        console.error("Error fetching artwork details by ID:", error);
        throw error;
    }
}




export function toggleSelection(item, selectedItems, setSelectedItems) { //Filters such that if the same option is clicked on then updatedSelections will exclude it (to deselect)
    if (selectedItems.includes(item)) {
        const updatedSelections = selectedItems.filter(currentItem => currentItem !== item);
        setSelectedItems(updatedSelections);
    } else {
        setSelectedItems([...selectedItems, item]); //using array spread to select the new item along with the already selected items 
        console.log("Selected items: ", [...selectedItems, item]);
    }
}


    

export function extractDateInterval(input) {
    console.log("This is input", input);
    if(input) {
    const regex = /\d+/g;
    const matches = input.match(regex);
    return matches && matches.length >= 2 ? `${matches[0]}-${matches[1]}` : "";
    }
    else {
        return "";
    }
}
const input = "Charles Georges Dufresne\nFrench, 1876-1938";
const dateInterval = extractDateInterval(input);
console.log(dateInterval);

//can be used for rendering icons (icon paths the go in src fields), texts
export function conditionalRenderHelperCB (entry, arg1, arg2) { 
    if (entry === null){ 
        return arg1
    } else {
        return arg2
    }
}

export function updateSingleCollectionField(collection, field, value) {
    return {
        ...collection,
        [field]: value
    };
}

export function updateCollectionsArrayField(collections, id, field, value) {
    return collections.map(collection => {
        if (collection.collection_id === id) {
            console.log(`Updating ${field} for collection with id: ${id}`);
            return { ...collection, [field]: value };
        }
        return collection;
    });
}

export function updateCollectionFields(collection, title, description) {
    return {
        ...collection,
        collection_title: title,
        collection_description: description,
    };
}

export function addArtWorkToCollection(collections, artWork, collection_id) {
    /*console.log(
        "These are the collections:", collections,
        "This is the artWork:", artWork,
        "this is the id: ", collection_id
    );*/

    return collections.map(collection => {
        console.log(collection.collection_id);
        if (collection.collection_id == collection_id) {
            return {
                ...collection,
                artWorks: [...collection.artWorks, { 
                    artWork_id: artWork.artWork_id,
                    artistName: artWork.artist,
                    artWorkTitle: artWork.art_name,
                    image_URL: URLParamsForImage(artWork.image_id),
                }]
            };
        }
        return collection; 
    });
}

export function parseCollectionDropDown(collections) {
    console.log("These are the collections in utility", collections);
    return [...collections].map((collection) => {
        return {
            collection_id: collection.collection_id,
            collection_title: collection.collection_title,
        }
    });
}

export function renderEntryArtWorkPath (ID){
    const imagePath = URLParamsForImage(ID)
    console.log("IMAGE PATH IS", imagePath)
    return conditionalRenderHelperCB(ID, "/image/defaultArtwork.png", URLParamsForImage(ID))
}




export function removeArtworkById(collection, artWorkId) {
    return {
        ...collection,
        artWorks: collection.artWorks.filter(artWork => artWork.artWork_id !== artWorkId)
    };
}





