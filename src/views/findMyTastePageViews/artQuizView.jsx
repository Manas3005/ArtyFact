import "/src/css/findMyTasteStyle.css";

import LinearWithValueLabel from "../ThirdPartyWrittenComponents/LinearProgressWithLabel"
import { useState } from "react";


export function ArtQuizView (props){

    const updatedProgress = props.updatedProgress;
    const artists = ["Vincent van Gogh", "Kerry James Marshall", "Tanaka Atsuko", "Gustave Caillebotte", "Alma Thomas", "Edgar Degas", "Georges Seurat", "Diego Rivera", "Joan Mitchell", "Aztec (Mexica)"] // List of artist options to be rendered
    const selectedArtists = props.selectedArtists;
    const resultsReady = props.resultsReady;
    const imageURLs = props.imageURLs;
    const artTitles = props.artTitles;
    const artistTitles = props.artistTitles;



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

    function renderQuizACB() {
      if (updatedProgress === 0) {
        return (
          <div>
            <div>Select your favorite artists</div>
            <div className="favoriteArtistsContainer">
              {renderArtistOptions()}
            </div>
            <div>
              <button
                onClick={handlePreviousClickACB}
                className="quizPreviousQuestion"
                disabled
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
          </div>
        );
      } else if (updatedProgress < 100) {
        return (
          <div>
            <div>Question {updatedProgress / 20}</div>
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
          </div>
        );
      } else if (updatedProgress === 100) {
        if (!resultsReady) {
          return (
            <div>
              <div>Final Question: Select your preferred art style</div>
              <div>
                <button
                  onClick={handlePreviousClickACB}
                  className="quizPreviousQuestion"
                >
                  Previous
                </button>
                <button
                  onClick={handleSubmitClickACB}
                  className="submitQuizButton"
                >
                  Submit
                </button>
              </div>
            </div>
          );
        } else {
          return (
            <div>
              <div className="resultsContainer">
                {imageURLs.map((url, index) => (
                  <div key={index} className="resultItem">
                    <img
                      src={url}
                      className="resultImage"
                      alt={`Artwork ${index + 1}`}
                    />
                    <div className="artDetails">
                      <div className="artTitle">{artTitles[index]}</div>
                      <div className="artistTitle">by {artistTitles[index]}</div>
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={handleBackToQuizACB}
                className="quizBackButton"
              >
                Back to Quiz
              </button>
            </div>
          );
        }
      } else {
        return <div>Done</div>;
      }
    }
    
    return (
      <div> 
        <LinearWithValueLabel updatedProgress={updatedProgress} />
        <div className="quizQuestions">{renderQuizACB()}</div>
      </div>
    );
    

}