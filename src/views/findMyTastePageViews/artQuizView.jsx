import "/src/css/findMyTasteStyle.css";

import LinearWithValueLabel from "../ThirdPartyWrittenComponents/LinearProgressWithLabel"
import { useState } from "react";


export function ArtQuizView (props){

    const updatedProgress = props.updatedProgress;
    const artists = ["Pablo Picasso", "Vincent van Gogh", "Kerry James Marshall", "Tanaka Atsuko", "Gustave Caillebotte", "Alma Thomas", "Edgar Degas", "Georges Seurat", "Diego Rivera", "Joan Mitchell", "Aztec (Mexica)"] // List of artist options to be rendered
    const selectedArtists = props.selectedArtists;
    const resultsReady = props.resultsReady;
    const imageURLs = props.imageURLs;


    function renderArtistOptions() {
        return artists.map(function organizeAsOptionCB(artist) {
        const isSelected = selectedArtists.includes(artist);
   
            return (
                <button
                    key={artist}
                    className={"favoriteArtist" + (isSelected ? "Selected" : "")} //This is to use a different class to style the button if an input is selected (background color) for better user feedback
                    onClick={function() { handleChoiceSelectionACB(artist); }}
                >
                    <input
                        type="checkbox"
                        readOnly
                        checked={isSelected}
                    />
                    {artist}
                    {console.log(selectedArtists)} {/*TESTING - REMOVE*/}
                </button>
            );
        });
    }
    

    function handleNextClickACB(){
        props.onNextButtonClicked(); //Firing custom event to dispatch mutation of progress variable in findMyTaste presenter
    }

    function handlePreviousClickACB(){
        props.onPreviousButtonClicked();
    }

    function handleChoiceSelectionACB(artist){
        props.onArtistSelected(artist); /*firing custom event to select artist and store in selectedArtists to later fetch related art
        once quiz is submitted*/
    }


    function handleSubmitClickACB(){ //firing custom event to fetch art by selectedArtists 
        props.onSubmitButtonClicked(selectedArtists);
        
    }

    function handleBackToQuizACB() {
      props.onBackToQuizButtonClicked();
    }



    return (
      <div>
        <LinearWithValueLabel updatedProgress={updatedProgress} />
        <div className="quizQuestions">
          {updatedProgress === 0 ? (
            <div>
              Select your favorite artists
              <div className="favoriteArtistsContainer">
                {renderArtistOptions()}
              </div>
            </div>
          ) 
          
          : updatedProgress === 10 ? (
            <div>Select a color that you would like your art to be dominated with</div>
          ) 
          
          : updatedProgress === 100 ? (
            resultsReady ? (
              <div>
                  <button
                  onClick={handleBackToQuizACB}
                  className="quizBackButton"
                  > Back to Quiz </button>

                  <div className="resultsContainer">
                    {imageURLs.map((url, index) => (
                    <img
                      key={url}
                      src={url}
                      alt={`Artwork ${index + 1}`}
                      className="resultImage"
                    />
                    ))}
                  </div>

              </div>
            ) 
            
            : (
              <div>
                <button
                  onClick={handlePreviousClickACB}
                  className="quizPreviousQuestion"
                >
                  Previous
                </button>
                <div>Select a color that you would like your art to be dominated with</div>
                <button
                  onClick={handleSubmitClickACB}
                  className="submitQuizButton"
                >
                  Submit
                </button>
              </div>
            )
          ) : (
            <div>Done</div>
          )}
          {updatedProgress < 100 && (
            <div>
              <button
                onClick={handlePreviousClickACB}
                className="quizPreviousQuestion"
              >
                Previous
              </button>
              <button
                onClick={handleNextClickACB}
                className="quizNextQuestion"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    );
    
}