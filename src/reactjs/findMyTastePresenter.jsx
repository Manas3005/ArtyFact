import { FindMyTasteTopBarView } from "../views/findMyTastePageViews/findMyTasteTopBarView"
import { DreamArtDescView } from "../views/findMyTastePageViews/dreamArtDescView"
import { ArtQuizView } from "../views/findMyTastePageViews/artQuizView"
import { useState } from "react";
import { getArtWorks, getArtWorkImage, URLParamsForImage, getArtWorksSearch, getArtWorkByID, getArtWorkImageModified} from '/src/apiCall.js';
import { useDispatch, useSelector } from "react-redux";
import { incrementProgress, decrementProgress } from "../store/findMyTasteSlice";
import { useEffect } from "react";
import { current } from "@reduxjs/toolkit";

export function FindMyTaste(props){

    const dispatch = useDispatch()

    const [currentView, setCurrentView] = useState('describe'); /*here component state is used because it aids the change of views depnding
    on the tab button clicked only on findMyTaste so it has no connection with the application state*/

    const [selectedArtists, setSelectedArtists ] = useState([]) /*component state used here to keep track of the selected choices for artists
    (only needed until the quiz session lasts hence not application state)*/
    const [allArtworkData, setAllArtworkData] = useState([])
    const [imageURLs, setImageURLs] = useState([]);
    const [resultsReady, setResultsReady] = useState(false);





    function setArtDescViewACB(){ //handling custom event 
        setCurrentView('describe') 
    }

    function setArtQuizViewACB(){ //handling custom event
        setCurrentView('quiz') 
    }

    function incrementQuizProgressACB(){
        dispatch(incrementProgress(10)) 
    }

    function decrementQuizProgressACB(){
        dispatch(decrementProgress(10))
    }

    function selectArtistACB(artist){ //Filters such that if the same artist option is clicked on then updatedSelections will exclude it (to deselect)
        if((selectedArtists.includes(artist))){
            const updatedSelections = selectedArtists.filter(function removeArtistChoiceCB (currentArtist){ 
                return currentArtist !== artist 
            })
            setSelectedArtists(updatedSelections) 
        } else {
            setSelectedArtists([...selectedArtists, artist]) //using array spread to select the new artist along with the already selected artists 
        }
    }

    
    
    /*function getArtworksByArtistsACB(){
        
        selectedArtists.forEach(
            function(currentArtist){ 
                const searchParams = {artist_title: currentArtist}
                const allArtworks = getArtWorksSearch((searchParams)) //searching all artworks including by alma thomas
                console.log("HERE ARE ALL THE ARTWORKS IMAGE DETAILS WITH FIRST ONE AS BY ALMA THOMAS: ", allArtworks)
                
                allArtworks.then(function (artworks){
                    artworks.data.forEach(function (currentArtwork){ 
                            getArtWorkByID(currentArtwork.id) //fetching each artwork by its id so artist_title is accessible
                            .then(function(artworkDetails){
                                setAllArtworkData((prevData) => [...prevData, artworkDetails.data])
                                
                            })
                         });
                    
                });

                filterSearchResultACB(currentArtist)
            }   
        )
        
    }

        


    function filterSearchResultACB(currentArtist) {//filtering the artworks such that only artworks with artist as currentArtist is kept
        const filteredArtworks = allArtworkData.filter(function(artworkData){
            return artworkData.artist_title === currentArtist;
        })

        console.log("FILTERED ARTWORK: ", filteredArtworks)
                
        filteredArtworks.forEach(function(artwork){
                const imageURL = getArtWorkImageModified(artwork.image_id)
                setImageURLs((prevImageURLs) => [...prevImageURLs, imageURL])
                console.log("Appended Image URL: ", imageURL)
                console.log("IMAGE URL FROM ARRAY ", imageURLs[0])
                setResultsReady(true);
            }
        )
        
    }*/

        function getArtworksByArtistsACB() { //This approach keeps track of the number of artworks that have gone through the processing stage
            //so that filterAndSetResultsACB is called only when all promises/fetches are resolved
            const tempAllArtworkData = []; 
    
            selectedArtists.forEach(function (currentArtist) {
                const searchParams = { artist_title: currentArtist };
        
                getArtWorksSearch(searchParams).then(function (allArtworks) { //searching all artworks including ones by currentArtist in selectedArtists
                    let remainingArtworks = allArtworks.data.length; // this is to track the number of artworks left to process, i.e. getArtWorkByID
        
                    allArtworks.data.forEach(function (currentArtwork) {
                        getArtWorkByID(currentArtwork.id).then(function (artworkDetails) { //PROCESSING STAGE: this fetches each artwork by its id so the artist_title property is accessible
                            tempAllArtworkData.push(artworkDetails.data); 
                            remainingArtworks--;

                            if (remainingArtworks === 0 && tempAllArtworkData.length === allArtworks.data.length * selectedArtists.length) { //since this can run before the async callbacks, it is important to check that all data has been fetched
                                filterAndSetResultsACB(tempAllArtworkData);
                            }
                        });
                    });
                });
            });
        }
        
        function filterAndSetResultsACB(allArtworkData) { //this filters the artworks to keep only the artworks by alma thomas and retrieve its image URL
            const filteredArtworks = allArtworkData.filter(function (artwork) {
                return selectedArtists.includes(artwork.artist_title);
            });
        
            console.log("FILTERED ARTWORKS: ", filteredArtworks);
        
            const newImageURLs = filteredArtworks.map(function (artwork) { //the filteredArtworks are taken and mapped to their image URLs through a utility function in apiCall.js
                return getArtWorkImageModified(artwork.image_id);
            });
            console.log("IMAGE URLS: ", newImageURLs)
        
            setImageURLs(newImageURLs); // this will be passed down to artQuizView
            setResultsReady(true); //this will be passed down to artQuizView to let it know that the results are ready
        }

    const updatedProgress = useSelector((state) => state.findMyTaste.progress); //this is to actually update the artQuiz view

    return (<div>
                <FindMyTasteTopBarView onDescribeButtonClicked = {setArtDescViewACB} 
                                       onArtQuizButtonClicked = {setArtQuizViewACB}              
                ></FindMyTasteTopBarView> 
        
                {currentView === 'describe' ? (<DreamArtDescView/>) : (<ArtQuizView 
                                                                        onNextButtonClicked = {incrementQuizProgressACB}
                                                                        onPreviousButtonClicked = {decrementQuizProgressACB}
                                                                        onArtistSelected = {selectArtistACB}
                                                                        updatedProgress = {updatedProgress} //Passing down the updated progress to the ArtQuiz view
                                                                        selectedArtists = {selectedArtists} 
                                                                        onSubmitButtonClicked = {getArtworksByArtistsACB}
                                                                        imageURLs = {imageURLs}
                                                                        resultsReady = {resultsReady}
                                                                        />)}
            </div>)
}
