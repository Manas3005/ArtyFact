import { FindMyTasteTopBarView } from "../views/findMyTastePageViews/findMyTasteTopBarView"
import { DreamArtDescView } from "../views/findMyTastePageViews/dreamArtDescView"
import { ArtQuizView } from "../views/findMyTastePageViews/artQuizView"
import { useState } from "react";
import { getArtWorksSearch, getArtWorkByID, getArtWorkImageModified, fetchAllArtworks, fetchFourtyArtworks} from '/src/apiCall.js';
import { useDispatch, useSelector } from "react-redux";
import { incrementProgress, decrementProgress } from "../store/findMyTasteSlice";
import { useEffect } from "react";
import { getArtWorks } from "../apiCall";


export function FindMyTaste(props){

    
    const dispatch = useDispatch()

    const [currentView, setCurrentView] = useState('describe'); /*here component state is used because it aids the change of views depnding
    on the tab button clicked only on findMyTaste so it has no connection with the application state*/

    const [selectedArtists, setSelectedArtists ] = useState([]) /*component state used here to keep track of the selected choices for artists
    (only needed until the quiz session lasts hence not application state)*/
    const [selectedColors, setSelectedColors ] = useState([])
    const [imageURLs, setImageURLs] = useState([]);
    const [resultsReady, setResultsReady] = useState(false);
    const [artTitles, setArtTitles] = useState([]);
    const [artistTitles, setArtistTitles] = useState([]);
    const [quizCompleted, setQuizCompleted] = useState(false);
    const [artistsOptions, setArtistsOptions] = useState([]);
    const [colorOptions, setColorOptions] = useState([]);

    //The values below define the hue ranges for each color option in the art quiz for question 2
    const LOWER_RED_VALUE_ONE = 0;
    const UPPER_RED_VALUE_ONE = 15;
    const LOWER_RED_VALUE_TWO = 345;
    const UPPER_RED_VALUE_TWO = 360;
    
    const LOWER_ORANGE_VALUE = 16;
    const UPPER_ORANGE_VALUE = 45;
    
    const LOWER_YELLOW_VALUE = 46;
    const UPPER_YELLOW_VALUE = 75;
    
    const LOWER_GREEN_VALUE = 76;
    const UPPER_GREEN_VALUE = 150;
    
    const LOWER_CYAN_VALUE = 151;
    const UPPER_CYAN_VALUE = 180;

    const LOWER_BLUE_VALUE = 181;
    const UPPER_BLUE_VALUE = 255;
    
    const LOWER_PURPLE_VALUE = 256;
    const UPPER_PURPLE_VALUE = 320;
    
    const LOWER_MAGENTA_VALUE = 321;
    const UPPER_MAGENTA_VALUE = 344;


    function getUserFriendlyColors(colorHLSValues) {
        let userFriendlyColors = [];
        colorHLSValues.forEach(function (colorObject) {
            if (colorObject === null) {//this check is done because some artworks in the API do not have colors defined
                return;
            } else if (
                (colorObject.h >= LOWER_RED_VALUE_ONE && colorObject.h <= UPPER_RED_VALUE_ONE) ||
                (colorObject.h >= LOWER_RED_VALUE_TWO && colorObject.h <= UPPER_RED_VALUE_TWO)) {
                userFriendlyColors = [...userFriendlyColors, "Red"];
            } else if (colorObject.h >= LOWER_ORANGE_VALUE && colorObject.h <= UPPER_ORANGE_VALUE) {
                userFriendlyColors = [...userFriendlyColors, "Orange"];
            } else if (colorObject.h >= LOWER_YELLOW_VALUE && colorObject.h <= UPPER_YELLOW_VALUE) {
                userFriendlyColors = [...userFriendlyColors, "Yellow"];
            } else if (colorObject.h >= LOWER_GREEN_VALUE && colorObject.h <= UPPER_GREEN_VALUE) {
                userFriendlyColors = [...userFriendlyColors, "Green"];
            } else if (colorObject.h >= LOWER_CYAN_VALUE && colorObject.h <= UPPER_CYAN_VALUE) {
                userFriendlyColors = [...userFriendlyColors, "Cyan"];
            } else if (colorObject.h >= LOWER_PURPLE_VALUE && colorObject.h <= UPPER_PURPLE_VALUE) {
                userFriendlyColors = [...userFriendlyColors, "Purple/Violet"];
            } else if (colorObject.h >= LOWER_MAGENTA_VALUE && colorObject.h <= UPPER_MAGENTA_VALUE) {
                userFriendlyColors = [...userFriendlyColors, "Magenta/Pink"];
            } else if(colorObject.h >= LOWER_BLUE_VALUE && colorObject.h <= UPPER_BLUE_VALUE){
                userFriendlyColors = [...userFriendlyColors, "Blue"];
            } else {
                return;
            }
        });
        return userFriendlyColors;
    }


    function getBackHLSValues(colorSelectedByUser){ //this is to allow the API to understand userInput

        let hValues = []

        if(colorSelectedByUser === "Red"){

            for (let h = LOWER_RED_VALUE_ONE; h <= UPPER_RED_VALUE_ONE; h++) { //this needs to be done so all artworks that have hValues in this range can be fetched
                hValues = [...hValues, h]
            }
            for (let h = LOWER_RED_VALUE_TWO; h <= UPPER_RED_VALUE_TWO; h++) {
                hValues = [...hValues, h]
            }

        } else if(colorSelectedByUser === "Orange"){

            for (let h = LOWER_ORANGE_VALUE; h <= UPPER_ORANGE_VALUE; h++) {
                hValues = [...hValues, h]
            }

        } else if(colorSelectedByUser === "Yellow"){

            for (let h = LOWER_YELLOW_VALUE; h <= UPPER_YELLOW_VALUE; h++) {
                hValues = [...hValues, h]
            }

        } else if(colorSelectedByUser === "Green"){

            for (let h = LOWER_GREEN_VALUE; h <= UPPER_GREEN_VALUE; h++) {
                hValues = [...hValues, h]
            }
            
        } else if(colorSelectedByUser === "Cyan"){

            for (let h = LOWER_CYAN_VALUE; h <= UPPER_CYAN_VALUE; h++) {
                hValues = [...hValues, h]
            }
            
        } else if(colorSelectedByUser === "Purple/Violet"){

            for (let h = LOWER_PURPLE_VALUE; h <= UPPER_PURPLE_VALUE; h++) {
                hValues = [...hValues, h]
            }
            
        } else if(colorSelectedByUser === "Magenta/Pink"){

            for (let h = LOWER_MAGENTA_VALUE; h <= UPPER_MAGENTA_VALUE; h++) {
                hValues = [...hValues, h]
            }
            
        } else if(colorSelectedByUser === "Blue"){

            for (let h = LOWER_BLUE_VALUE; h <= UPPER_BLUE_VALUE; h++) {
                hValues = [...hValues, h]
            }

        } else {
            return;
        }

        return {
                h: hValues
               }

    }
    


    useEffect(() => {
    
        fetchAllArtworks().then(function (data) {
            const artists = data.data.map((artwork) => artwork.artist_title);
            const colorHLSValues = data.data.map((artwork) => artwork.color);
            const userFriendlyColors = getUserFriendlyColors(colorHLSValues); //this is so the options are render in a human-readable way
            const filteredColors = []
            const filteredArtists = [];
            
            artists.forEach((artist) => { //this is done so if similar artworks have the same artists, they are not repeated as the options
                if (artist && !filteredArtists.includes(artist)) {
                  filteredArtists.push(artist);
                }
                
            });
            userFriendlyColors.forEach((color) => { //this is done so if similar artworks have the same colors, they are not repeated as the options
                if (color && !filteredColors.includes(color)) {
                  filteredColors.push(color);
                }
                
            });


            setArtistsOptions(filteredArtists); 
            setColorOptions(filteredColors);
        })
        .catch((error) =>
            console.error("Error fetching options", error)
        );
    } , []);


    function toggleSelection(item, selectedItems, setSelectedItems) { //Filters such that if the same option is clicked on then updatedSelections will exclude it (to deselect)
        if (selectedItems.includes(item)) {
            const updatedSelections = selectedItems.filter(currentItem => currentItem !== item);
            setSelectedItems(updatedSelections);
        } else {
            setSelectedItems([...selectedItems, item]); //using array spread to select the new item along with the already selected items 
            console.log("Selected items: ", [...selectedItems, item]);
        }
    }
        
    function selectArtistACB(artist) {
        toggleSelection(artist, selectedArtists, setSelectedArtists);
    }
    
    function selectColorACB(color) {
        toggleSelection(color, selectedColors, setSelectedColors);
    }

    

    function setArtDescViewACB(){ //handling custom event 
        setCurrentView('describe') 
    }


    function setArtQuizViewACB(){ //handling custom event
        setCurrentView('quiz') 
    }


    function incrementQuizProgressACB(){
        dispatch(incrementProgress(20)); 
    }


    function decrementQuizProgressACB(){
        dispatch(decrementProgress(20))
    }

    function setResultsBackToPendingACB(){
        setResultsReady(false);
        setQuizCompleted(false);
    }




    function getArtworksByArtistsACB() { //This approach keeps track of the number of artworks that have gone through the processing stage
            //so that filterAndSetResultsACB is called only when all promises/fetches are resolved
            setQuizCompleted(true);
            const tempAllArtworkData = [];             
            selectedArtists.forEach(function (currentArtist) {
                //selectedColors.forEach(function(currentColor) { 
                const searchParams = { artist_title: currentArtist}//, color: getBackHLSValues(currentColor)};
                getArtWorksSearch(searchParams).then(function (allArtworks) { //searching all artworks including ones by currentArtist in selectedArtists
                    console.log("SINGULAR ARTWORK: ", allArtworks)
                    let remainingArtworks = allArtworks.data.length;    // this is to track the number of artworks left to process, i.e. getArtWorkByID
                    allArtworks.data.forEach(function (currentArtwork) {
                        getArtWorkByID(currentArtwork.id).then(function (artworkDetails) { //PROCESSING STAGE: this fetches each artwork by its id so the artist_title, image_url, etc. properties are accessible
                            tempAllArtworkData.push(artworkDetails.data); 
                            remainingArtworks--;

                            if (remainingArtworks === 0 && tempAllArtworkData.length === allArtworks.data.length * selectedArtists.length) { //since this can run before the async callbacks, it is important to check that all data has been fetched
                                console.log("HERE IS THE ORIGINAL VERSION", tempAllArtworkData)
                                filterAndSetResultsACB(tempAllArtworkData);
                            }
                        });
                    });
                });
                //});
            });
    }



    function filterAndSetResultsACB(allArtworkData) { //this filters the artworks to keep only the artworks by the currentArtist in selectedArtists and retrieve its image URL
            
            const filteredArtworks = allArtworkData.filter(function (artwork) {
                return selectedArtists.includes(artwork.artist_title) //&& selectedColors.includes(artwork.color)
            });
            console.log("FILTERED ARTWORKS: ", filteredArtworks); //for debugging
            
            //these are temporary arrays that can be filtered on and then the actual array (component state) is set to these temp arrays 
            const newImageURLs = [];
            const newImageTitles = [];
            const newArtistTitles = []
            
            //the filteredArtworks are taken and mapped to their image URLs through a function in apiCall.js
            filteredArtworks.forEach(function (artwork) {
                const imageURL = getArtWorkImageModified(artwork.image_id); //using the function from apiCall.js to get the imageURL
                const imageTitle = artwork.title         //same process as above but for the image titles
                const artistTitle = artwork.artist_title

                if (!newImageURLs.includes(imageURL)) { //this is to ensure that the same URL is not appended again as duplicate artworks from the same artist from the API can lead to this
                    newImageURLs.push(imageURL);
                    newImageTitles.push(imageTitle);
                    newArtistTitles.push(artistTitle);
                }
                
            });
            console.log("IMAGE URLS: ", newImageURLs) //for debugging
        
            setImageURLs(newImageURLs); // this will be passed down to artQuizView to render the images
            setArtTitles(newImageTitles); //this will also be passed down to artQuizView to render art titles respective to the images
            setArtistTitles(newArtistTitles); //this will also be passed down to artQuizView to render artist titles respective to the artTitles
            setResultsReady(true); //this will be passed down to artQuizView to let it know that the results are ready
    }

    function getArtWorksFromResponses (){

    }


    const updatedProgress = useSelector((state) => state.findMyTaste.progress); //this is to actually update the artQuizview


    return (<div>
                <FindMyTasteTopBarView onDescribeButtonClicked = {setArtDescViewACB} 
                                       onArtQuizButtonClicked = {setArtQuizViewACB}              
                ></FindMyTasteTopBarView> 
        
                {currentView === 'describe' ? (<DreamArtDescView/>) : (<ArtQuizView 
                                                                        onNextButtonClicked = {incrementQuizProgressACB}
                                                                        onPreviousButtonClicked = {decrementQuizProgressACB}
                                                                        onArtistSelected = {selectArtistACB}
                                                                        onColorSelected = {selectColorACB}
                                                                        updatedProgress = {updatedProgress} //Passing down the updated progress to the ArtQuiz view
                                                                        selectedArtists = {selectedArtists} 
                                                                        selectedColors = {selectedColors}
                                                                        onSubmitButtonClicked = {getArtworksByArtistsACB}
                                                                        onBackToQuizButtonClicked = {setResultsBackToPendingACB}
                                                                        imageURLs = {imageURLs}
                                                                        resultsReady = {resultsReady}
                                                                        artTitles = {artTitles}
                                                                        artistTitles = {artistTitles}
                                                                        quizCompleted = {quizCompleted}
                                                                        artistsOptions = {artistsOptions}
                                                                        colorOptions = {colorOptions}
                                                                        />)}
            </div>)
}
