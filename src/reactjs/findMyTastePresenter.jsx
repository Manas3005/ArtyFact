import { FindMyTasteTopBarView } from "../views/findMyTastePageViews/findMyTasteTopBarView"
import { DreamArtDescView } from "../views/findMyTastePageViews/dreamArtDescView"
import { ArtQuizView } from "../views/findMyTastePageViews/artQuizView"
import { useState } from "react";
import { getArtWorks, getArtWorkImage, URLParamsForImage, getArtWorksSearch, getArtWorkByID} from '/src/apiCall.js';
import { useDispatch, useSelector } from "react-redux";
import { incrementProgress, decrementProgress } from "../store/findMyTasteSlice";
import { useEffect } from "react";

export function FindMyTaste(props){

    const dispatch = useDispatch()

    const [currentView, setCurrentView] = useState('describe'); /*here component state is used because it aids the change of views depnding
    on the tab button clicked only on findMyTaste so it has no connection with the application state*/

    const [selectedArtists, setSelectedArtists ] = useState([]) /*component state used here to keep track of the selected choices for artists
    (only needed until the quiz session lasts hence not application state)*/
    const [artData, setArtData] = useState([]);

    const [filteredArray, setFilteredArray] = useState([]);



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

    /*function getArtworksByArtistsACB(){ //This function is yet to be finished and implemented correctly 
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
        
    }*/

    function filterSearchResultACB(artWork, currentArtist) {
        console.log("FILTER FUNCTION", artWork);
        console.log("dataaaaa", artWork.data);
        console.log("the current artist", currentArtist);
        if(artWork.data.artist_title == currentArtist) {
            setFilteredArray([...filteredArray, artWork]);
        }
        /*const newArray = artWorks.data.filter((artwork) => {
            return artwork.artist_title !== currentArtist;
        })*/
        console.log("FILTERED ARRAY: ", filteredArray);
    }
       
   

     
    function getArtworksByArtistsACB(){
        selectedArtists.forEach(
            function(currentArtist){ 
                const searchParams = {artist_title: currentArtist}
                console.log("THIS IS THE ART WORKS SEARCH RESULT", getArtWorksSearch(searchParams));
                getArtWorksSearch(searchParams).then((artWork) => apiToApi(artWork, currentArtist))
                /*.then((artWorks) => console.log("ARTWORKS", artWorks)/*filterSearchResultACB(artWorks, currentArtist)*/
            }   
        )
    }

    function apiToApi(artWork, currentArtist) {
        [artWork.data].forEach((element) => {

            console.log("This IS THE ELEMENT", element);
            const artWorkID = element.id;
            console.log("This is the artWORK ID", artWorkID);
            getArtWorkByID(element.id).then((artWork) => console.log(artWork));
        })
    }

    useEffect(() => {
        console.log("This is the artData", artData);
    },[artData]);

     /*console.log("This is THE API LINK", element.api_link);
            const image_id = element.image_id;
            const image_URL = URLParamsForImage(image_id);
            console.log("This is the image_url for the data element", element, "in the for each", image_URL);*/

    const result = getArtWorks({
        artist_title: "Alma Thomas",
    })

    console.log("This is the result from getArtWorks", result);

    console.log("HEJ");
    

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
