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
    const [filteredArray, setFilteredArray] = useState([]);
    const [allArtworkData, setAllArtworkData] = useState([])
    const [imageURLs, setImageURLs] = useState([]);





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

    
    
    function getArtworksByArtistsACB(){
        
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
                 
            }
        )
        
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
                                                                        />)}
            </div>)
}
