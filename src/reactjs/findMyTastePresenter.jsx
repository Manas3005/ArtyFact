import { FindMyTasteTopBarView } from "../views/findMyTastePageViews/findMyTasteTopBarView"
import { DreamArtDescView } from "../views/findMyTastePageViews/dreamArtDescView"
import { ArtQuizView } from "../views/findMyTastePageViews/artQuizView"
import { useState } from "react";
import { getArtWorks, getArtWorkImage, URLParamsForImage, getArtWorksSearch} from '/src/apiCall.js';
import { useDispatch, useSelector } from "react-redux";
import { incrementProgress, decrementProgress } from "../store/findMyTasteSlice";

export function FindMyTaste(props){

    const dispatch = useDispatch()

    const [currentView, setCurrentView] = useState('describe'); /*here component state is used because it aids the change of views depnding
    on the tab button clicked only on findMyTaste so it has no connection with the application state*/

    const [selectedArtists, setSelectedArtists ] = useState([]) /*component state used here to keep track of the selected choices for artists
    (only needed until the quiz session lasts hence not application state)*/



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

    function getArtworksByArtistsACB(){ //This function is yet to be finished and implemented correctly 
        selectedArtists.forEach(artist => {
            const searchParams = { artist_title: artist };
            getArtWorks(searchParams)
                .then(artworks => {
                    artworks.forEach(artwork => {
                        getArtWorkImage(artwork.image_id) 
                            .then(imageURL => {
                                renderArtResults(imageURL); 
                            })
                            .catch(error => console.error("Error fetching image:", error));
                    });
                })
                .catch(error => console.error("Error fetching artworks:", error));
        });
        
    }

    function renderArtResults(imageURL) {
        return (
            <div className="ArtDescImageContainer">
                <img className="ArtDescImage" src={imageURL} alt="Artwork" />
            </div>
        );
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
