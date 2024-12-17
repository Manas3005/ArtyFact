import sanitizeHtml from 'sanitize-html'; 
import { getArtWorkByID, getArtWorksSearch} from './apiCall';


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


    
