import { FindMyTasteTopBarView } from "../views/findMyTastePageViews/findMyTasteTopBarView"
import { ArtQuizView } from "../views/findMyTastePageViews/artQuizView"
import { useState } from "react";
import { getArtWorkImageModified, fetchAllArtworks} from '/src/apiCall.js';
import { useDispatch, useSelector } from "react-redux";
import { incrementProgress, decrementProgress } from "../store/findMyTasteSlice";
import { fetchAndProcessArtworks, toggleSelection, getArtworkDetailsById} from "../utilities";


export function FindMyTaste(props){

    
    const dispatch = useDispatch()


    const [selectedArtists, setSelectedArtists ] = useState([]); /*component state used here to keep track of the selected choices for artists
    (only needed until the quiz session lasts hence not application state)*/
    const [selectedStyles, setSelectedStyles] = useState([]);
    const [selectedMediums, setSelectedMediums] = useState([]);

    

    const [imageByArtistsURLs, setImageByArtistsURLs] = useState([]);
    const [artTitlesByArtists, setArtTitlesByArtists] = useState([]);
    const [artistTitlesByArtists, setArtistTitlesByArtists] = useState([]);

    const [imageByStylesURLs, setImageByStylesURLs] = useState([]);
    const [artTitlesByStyles, setArtTitlesByStyles] = useState([]);
    const [artistTitlesByStyles, setArtistTitlesByStyles] = useState([]);
    const [styleTitles, setStyleTitles] = useState([]);

    const [imageByMediumsURLs, setImageByMediumsURLs] = useState([]);
    const [artTitlesByMediums, setArtTitlesByMediums] = useState([]);
    const [artistTitlesByMediums, setArtistTitlesByMediums] = useState([]);
    const [mediumTitles, setMediumTitles] = useState([]);
    
    const [quizReady, setQuizReady] = useState(false);
    const [resultsReady, setResultsReady] = useState(false);
    const [quizCompleted, setQuizCompleted] = useState(false);
    
    const [artistsOptions, setArtistsOptions] = useState([]);
    const [styleOptions, setStyleOptions] = useState([]);
    const [mediumOptions, setMediumOptions] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const [showMessage, setShowMessage] = useState(false);

    function loadQuizACB(){
        fetchAllArtworks()
        .then(function (data) {
            setQuizReady(false);
            const artists = data.data.map((artwork) => artwork.artist_title);
            const styles = data.data.map((artwork) => artwork.style_title);
            const mediums = data.data.map((artwork) => artwork.classification_title);
            const filteredStyles = [];
            const filteredArtists = [];
            const filteredMediums = [];
            
            //The checks below are really important otherwise duplicate options appear (tested)
            artists.forEach((artist) => { //this is done so if similar artworks have the same artists, they are not repeated as the options
                if (artist && !filteredArtists.includes(artist)) {
                  filteredArtists.push(artist);
                }
                
            });


            styles.forEach((style) => { 
                if (style && !filteredStyles.includes(style)) {
                  filteredStyles.push(style);
                }
                
            });

            mediums.forEach((medium) => {  
                if (medium && !filteredMediums.includes(medium)) {
                  filteredMediums.push(medium);
                }
                
            });

            setArtistsOptions(filteredArtists.sort()); 
            setStyleOptions(filteredStyles.sort());
            setMediumOptions(filteredMediums.sort());
            
            setQuizReady(true);
        })
        .catch((error) =>
            console.error("Error fetching quiz", error)
        );
    }



    
        

    function selectArtistACB(artist) {
        toggleSelection(artist, selectedArtists, setSelectedArtists);
    }
    
    function selectStyleACB(style) {
        toggleSelection(style, selectedStyles, setSelectedStyles);
    }

    function selectMediumACB(medium){
        toggleSelection(medium, selectedMediums, setSelectedMediums);
    }



    function incrementQuizProgressACB(){
        if(updatedProgress===66){
            dispatch(incrementProgress(34)); 
        } else {
            dispatch(incrementProgress(33)); 
        }
    }



    function decrementQuizProgressACB(){
        if(updatedProgress===100){
            dispatch(decrementProgress(34));
        } else {
            dispatch(decrementProgress(33));
        }
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
            (currentStyle) => ({ style_title: currentStyle }), 
            filterAndSetResultsACB, 
            "styles"
        );
    }

    function getArtworksByMediumsACB() {
        setQuizCompleted(true);
        fetchAndProcessArtworks(
            selectedMediums, 
            (currentMedium) => ({ classification_title: currentMedium }), 
            filterAndSetResultsACB, 
            "mediums"
        );
    }


    function getArtworksByResponsesACB(){
        if (selectedArtists.length === 0 && selectedStyles.length === 0 && selectedMediums.length === 0) {
            setErrorMessage("You must answer at least one question to see results.");
            setShowMessage(true);

            setTimeout(() => {
                setShowMessage(false);
            }, 3000);
        } else {
            setErrorMessage(""); 
            getArtworksByArtistsACB();
            getArtworksByStylesACB();
            getArtworksByMediumsACB();
        }
    }

    function extractArtworkDetails(artwork_id){
        getArtworkDetailsById(artwork_id);
    }

                

    function filterAndSetResultsACB(allArtworkData, filterType) { //this filters the artworks to keep only the artworks by the currentItem in selectedItms and retrieve its image URL
            
        //Temporary arrays that can be filtered on and then the actual array (component state) is set to these temp arrays 
        
        //The filteredArtworks are taken and mapped to their image URLs through a function in apiCall.js

        const newArtistImageURLs = [];
        const newArtistImageTitles = [];
        const newArtistTitlesByArtists = [];

        const newStyleImageURLs = [];
        const newStyleImageTitles = [];
        const newArtistTitlesByStyles = [];
        const newStyleTitles = []

        const newMediumImageURLs = [];
        const newMediumImageTitles = [];
        const newArtistTitlesByMediums = [];
        const newMediumTitles = []

        console.log("ALL ARTWORK DATA: ", allArtworkData);
        
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
  
              if (!newStyleImageURLs.includes(imageURL)) { //this is to ensure that the same URL is not appended again as duplicate artworks from the same artist from the API can lead to this
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
            
            

        } else if (filterType === "mediums"){

          const filteredMediumArtworks = allArtworkData.filter(function (artwork) {
              return selectedMediums.includes(artwork.classification_title);
          });
  
          console.log("FILTERED ARTWORKS BY MEDIUMS: ", filteredMediumArtworks); 
  
  
          filteredMediumArtworks.forEach(function (artwork) {
              const imageURL = getArtWorkImageModified(artwork.image_id); //using the function from apiCall.js to get the imageURL
              const imageTitle = artwork.title;         //same process as above but for the image titles
              const artistTitle = artwork.artist_title;
              const mediumTitle = artwork.classification_title;
  
              if (!newMediumImageURLs.includes(imageURL)) { //this is to ensure that the same URL is not appended again as duplicate artworks from the same artist from the API can lead to this
                  newMediumImageURLs.push(imageURL);
                  newMediumImageTitles.push(imageTitle);
                  newArtistTitlesByMediums.push(artistTitle);
                  newMediumTitles.push(mediumTitle);
  
              }
            
            });
          console.log("IMAGE URLS FOR ART BY MEDIUMS: ", newMediumImageURLs) //for debugging
  
            console.log("WOWWOWOWO: ", newArtistImageURLs)
          setImageByMediumsURLs(newMediumImageURLs);
          setArtTitlesByMediums(newMediumImageTitles);
          setArtistTitlesByMediums(newArtistTitlesByMediums);
          setMediumTitles(newMediumTitles);
        }
        
        setResultsReady(true); //this will be passed down to artQuizView to let it know that the results are ready

    }


    const updatedProgress = useSelector((state) => state.findMyTaste.progress); //this is to actually update the artQuizview


    return (<>
                <FindMyTasteTopBarView/> 
        
                <ArtQuizView 
                                                                        onNextButtonClicked = {incrementQuizProgressACB}
                                                                        onPreviousButtonClicked = {decrementQuizProgressACB}
                                                                        onArtistSelected = {selectArtistACB}
                                                                        onStyleSelected = {selectStyleACB}
                                                                        onMediumSelected = {selectMediumACB}
                                                                        onBeginLoadingQuiz = {loadQuizACB}
                                                                        onSubmitButtonClicked = {getArtworksByResponsesACB}
                                                                        onBackToQuizButtonClicked = {setResultsBackToPendingACB}
                                                                        onQuizArtworkChosen  = {extractArtworkDetails}
                                                                        
                                                                        updatedProgress = {updatedProgress} //passing down the updated progress to the ArtQuiz view
                                                                        selectedArtists = {selectedArtists} 
                                                                        selectedStyles = {selectedStyles}
                                                                        selectedMediums = {selectedMediums}

                                                                        artTitlesByArtists = {artTitlesByArtists}
                                                                        artistTitlesByArtists = {artistTitlesByArtists}
                                                                        imageByArtistsURLs = {imageByArtistsURLs}

                                                                        artTitlesByStyles = {artTitlesByStyles}
                                                                        artistTitlesByStyles = {artistTitlesByStyles}
                                                                        imageByStylesURLs = {imageByStylesURLs}
                                                                        styleTitles = {styleTitles}

                                                                        artTitlesByMediums = {artTitlesByMediums}
                                                                        artistTitlesByMediums = {artistTitlesByMediums}
                                                                        imageByMediumsURLs = {imageByMediumsURLs}
                                                                        mediumTitles = {mediumTitles}
                                                                        
                                                                        quizReady = {quizReady}
                                                                        resultsReady = {resultsReady}
                                                                        quizCompleted = {quizCompleted}
                                                                        
                                                                        artistsOptions = {artistsOptions}
                                                                        styleOptions = {styleOptions}
                                                                        mediumOptions = {mediumOptions}
                                                                        errorMessage = {errorMessage}
                                                                        showMessage = {showMessage}
                                                                        />
            </>)
}
