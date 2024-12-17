import { FindMyTasteTopBarView } from "../views/findMyTastePageViews/findMyTasteTopBarView"
import { DreamArtDescView } from "../views/findMyTastePageViews/dreamArtDescView"
import { ArtQuizView } from "../views/findMyTastePageViews/artQuizView"
import { useState } from "react";
import { getArtWorksSearch, getArtWorkByID, getArtWorkImageModified, fetchAllArtworks, fetchFourtyArtworks} from '/src/apiCall.js';
import { useDispatch, useSelector } from "react-redux";
import { incrementProgress, decrementProgress } from "../store/findMyTasteSlice";
import { useEffect } from "react";
import { getArtWorks } from "../apiCall";
import { fetchAndProcessArtworks} from "../utilities";


export function FindMyTaste(props){

    
    const dispatch = useDispatch()

    const [currentView, setCurrentView] = useState('describe'); /*here component state is used because it aids the change of views depnding
    on the tab button clicked only on findMyTaste so it has no connection with the application state*/

    const [selectedArtists, setSelectedArtists ] = useState([]); /*component state used here to keep track of the selected choices for artists
    (only needed until the quiz session lasts hence not application state)*/
    const [selectedStyles, setSelectedStyles] = useState([]);
    const [resultsReady, setResultsReady] = useState(false);
    
    const [imageByArtistsURLs, setImageByArtistsURLs] = useState([]);
    const [artTitlesByArtists, setArtTitlesByArtists] = useState([]);
    const [artistTitlesByArtists, setArtistTitlesByArtists] = useState([]);

    const [imageByStylesURLs, setImageByStylesURLs] = useState([]);
    const [artTitlesByStyles, setArtTitlesByStyles] = useState([]);
    const [artistTitlesByStyles, setArtistTitlesByStyles] = useState([]);
    const [styleTitles, setStyleTitles] = useState([]);
    
    const [quizCompleted, setQuizCompleted] = useState(false);
    const [artistsOptions, setArtistsOptions] = useState([]);
    const [styleOptions, setStyleOptions] = useState([]);

    useEffect(() => {
    
        fetchAllArtworks().then(function (data) {
            const artists = data.data.map((artwork) => artwork.artist_title);
            const styles = data.data.map((artwork) => artwork.style_title);
            const filteredStyles = []
            const filteredArtists = [];
            
            artists.forEach((artist) => { //this is done so if similar artworks have the same artists, they are not repeated as the options
                if (artist && !filteredArtists.includes(artist)) {
                  filteredArtists.push(artist);
                }
                
            });

            styles.forEach((style) => { //this is done so if similar artworks have the same artists, they are not repeated as the options
                if (style && !filteredStyles.includes(style)) {
                  filteredStyles.push(style);
                }
                
            });
            setArtistsOptions(filteredArtists); 
            setStyleOptions(filteredStyles);
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
    
    function selectStyleACB(style) {
        toggleSelection(style, selectedStyles, setSelectedStyles);
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



    function getArtworksByArtistsACB() {
        setQuizCompleted(true);
        fetchAndProcessArtworks(
            selectedArtists, 
            (currentArtist) => ({ artist_title: currentArtist }), //construct search params for artists
            filterAndSetResultsACB, //callback to process the filtered data
            "artists" //this is so the filterAndSetResultsACB method knows which filters to run
        );
    };


    function getArtworksByStylesACB() {
        setQuizCompleted(true);
        fetchAndProcessArtworks(
            selectedStyles, 
            (currentStyle) => ({ style_title: currentStyle }), //construct search params for artists
            filterAndSetResultsACB, //callback to process the filtered data
            "styles"
        );
    }



    function getArtworksByResponsesACB(){
        getArtworksByArtistsACB();
        getArtworksByStylesACB();
    }

                

    function filterAndSetResultsACB(allArtworkData, filterType) { //this filters the artworks to keep only the artworks by the currentArtist in selectedArtists and retrieve its image URL
            
        const newArtistImageURLs = [];
        const newArtistImageTitles = [];

        const newStyleImageURLs = [];
        const newStyleImageTitles = [];

        const newArtistTitlesByArtists = [];
        const newArtistTitlesByStyles = [];
        const newStyleTitles = []

        
        if (filterType === "artists"){ //this check is done so the filtering by filteredStyleArtworks is not populated for artworks that are meant to be filtered by artists
            
            const filteredArtistArtworks = allArtworkData.filter(function (artwork) { //CHECK IF THIS CAN BE REMOVED
                return selectedArtists.includes(artwork.artist_title);
            });

            console.log("FILTERED ARTWORKS BY ARTISTS: ", filteredArtistArtworks); //for debugging
            
            filteredArtistArtworks.forEach(function (artwork) {
                const imageURL = getArtWorkImageModified(artwork.image_id); //using the function from apiCall.js to get the imageURL
                const imageTitle = artwork.title;         //same process as above but for the image titles
                const artistTitle = artwork.artist_title;

                if (!newArtistImageURLs.includes(imageURL)) { //this is to ensure that the same URL is not appended again as duplicate artworks from the same artist from the API can lead to this
                    newArtistImageURLs.push(imageURL);
                    newArtistImageTitles.push(imageTitle);
                    newArtistTitlesByArtists.push(artistTitle);
                }
                
            });
            console.log("IMAGE URLS FOR ART BY ARTISTS: ", newArtistImageURLs) //for debugging
            setImageByArtistsURLs(newArtistImageURLs); // this will be passed down to artQuizView to render the images
            setArtTitlesByArtists(newArtistImageTitles); //this will also be passed down to artQuizView to render art titles respective to the images
            setArtistTitlesByArtists(newArtistTitlesByArtists);


        } else if(filterType === "styles"){ //for artworks filtered by styles

          const filteredStyleArtworks = allArtworkData.filter(function (artwork) {
              return selectedStyles.includes(artwork.style_title);
          });

          console.log("FILTERED ARTWORKS BY STYLES: ", filteredStyleArtworks); 


          filteredStyleArtworks.forEach(function (artwork) {
              const imageURL = getArtWorkImageModified(artwork.image_id); //using the function from apiCall.js to get the imageURL
              const imageTitle = artwork.title;         //same process as above but for the image titles
              const artistTitle = artwork.artist_title;
              const styleTitle = artwork.style_title;
  
              if (!newArtistImageURLs.includes(imageURL)) { //this is to ensure that the same URL is not appended again as duplicate artworks from the same artist from the API can lead to this
                  newStyleImageURLs.push(imageURL);
                  newStyleImageTitles.push(imageTitle);
                  newArtistTitlesByStyles.push(artistTitle);
                  newStyleTitles.push(styleTitle);
  
              }
            
            });
            console.log("IMAGE URLS FOR ART BY STYLES: ", newStyleImageURLs) //for debugging


            setImageByStylesURLs(newStyleImageURLs);
            setArtTitlesByStyles(newStyleImageTitles);
            setArtistTitlesByStyles(newArtistTitlesByStyles);
            setStyleTitles(newStyleTitles);
            
            setResultsReady(true); //this will be passed down to artQuizView to let it know that the results are ready

        }
        
        //these are temporary arrays that can be filtered on and then the actual array (component state) is set to these temp arrays 
        
        //the filteredArtworks are taken and mapped to their image URLs through a function in apiCall.js

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
                                                                        onStyleSelected = {selectStyleACB}
                                                                        onSubmitButtonClicked = {getArtworksByResponsesACB}
                                                                        onBackToQuizButtonClicked = {setResultsBackToPendingACB}
                                                                        
                                                                        updatedProgress = {updatedProgress} //passing down the updated progress to the ArtQuiz view
                                                                        selectedArtists = {selectedArtists} 
                                                                        selectedStyles = {selectedStyles}

                                                                        artTitlesByArtists = {artTitlesByArtists}
                                                                        artistTitlesByArtists = {artistTitlesByArtists}
                                                                        imageByArtistsURLs = {imageByArtistsURLs}

                                                                        artTitlesByStyles = {artTitlesByStyles}
                                                                        artistTitlesByStyles = {artistTitlesByStyles}
                                                                        imageByStylesURLs = {imageByStylesURLs}
                                                                        styleTitles = {styleTitles}
                                                                        
                                                                        resultsReady = {resultsReady}
                                                                        quizCompleted = {quizCompleted}
                                                                        artistsOptions = {artistsOptions}
                                                                        styleOptions = {styleOptions}
                                                                        />)}
            </div>)
}
