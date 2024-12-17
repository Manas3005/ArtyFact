import "/src/css/findMyTasteStyle.css";

import LinearWithValueLabel from "../ThirdPartyWrittenComponents/LinearProgressWithLabel"
import { useState } from "react";


export function ArtQuizView (props){

    const artTitlesByArtists = props.artTitlesByArtists;
    const artistTitlesByArtists = props.artistTitlesByArtists;
    const imageByArtistsURLs = props.imageByArtistsURLs;

    const artTitlesByStyles = props.artTitlesByStyles;
    const artistTitlesByStyles = props.artistTitlesByStyles;
    const imageByStylesURLs = props.imageByStylesURLs;
    const styleTitles = props.styleTitles;

    const selectedStyles = props.selectedStyles;
    const selectedArtists = props.selectedArtists;

    const updatedProgress = props.updatedProgress;
    const resultsReady = props.resultsReady;
    
    //const artistsOptions = ["Tanaka Atsuko", "Diego Rivera", "Alma Thomas", "Kerry James Marshall", "Joan Mitchell", "Aztec (Mexica)", "Gustave Caillebotte", "Georges Seurat", "Vincent van Gogh", "Richard Earlom"]
    const quizCompleted = props.quizCompleted;
    const artistsOptions = props.artistsOptions;
    const styleOptions = props.styleOptions;


    function handleNextClickACB(){
        props.onNextButtonClicked(); //Firing custom event to dispatch mutation of progress variable in findMyTaste presenter
    }


    function handlePreviousClickACB(){
        props.onPreviousButtonClicked();
    }


    function handleArtistChoiceSelectionACB(artist){
        props.onArtistSelected(artist); /*firing custom event to select artist and store in selectedArtists to later fetch related art
        once quiz is submitted*/
    }

    function handleStyleChoiceSelectionACB(style){
      props.onStyleSelected(style);
      console.log("SELECTED STYLE", style)
    }


    function handleSubmitClickACB(){ //firing custom event to fetch art by selectedArtists 
        props.onSubmitButtonClicked(selectedArtists);
    }


    function handleBackToQuizACB() {
      props.onBackToQuizButtonClicked();
    }


    function renderArtistOptions() {

      return artistsOptions.map(function organizeAsOptionCB(artist) {
      const isSelected = selectedArtists.includes(artist)
 
      return (
        <button
            key={artist}
            className={"favoriteArtist" + (isSelected ? "Selected" : "")} //This is to use a different class to style the button if an input is selected (background color) for better user feedback
            onClick={function() { handleArtistChoiceSelectionACB(artist); }}
        >
            <input
                type="checkbox"
                readOnly
                checked={isSelected}
            />
            {artist}
        </button>
      );
      });
    }

    function renderStyleOptions() {

      return styleOptions.map(function organizeAsOptionCB(color) {
      const isSelected = selectedStyles.includes(color)
        
      return (
        <button
            key={color}
            className={"favoriteArtist" + (isSelected ? "Selected" : "")} //This is to use a different class to style the button if an input is selected (background color) for better user feedback
            onClick={function() { handleStyleChoiceSelectionACB(color); }}
        >
            <input
                type="checkbox"
                readOnly
                checked={isSelected}
            />
            {color}
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

          if(updatedProgress === 20){

              return (
                <div>
                  <div> Select your favorite art styles </div>
                  <div className="favoriteArtistsContainer">
                  {renderStyleOptions()}
                  </div>
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

           } else if(updatedProgress===40) {

              return (
                <div>
                  <div> What color would you like your art to be dominated with? </div>
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

           } else if(updatedProgress===60) {

            return (
              <div>
                <div> What color would you like your art to be dominated with? </div>
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

         } else if(updatedProgress===80) {

          return (
            <div>
              <div> What color would you like your art to be dominated with? </div>
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

       }

      } else if (updatedProgress === 100) {

        if (!resultsReady && !quizCompleted) {
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

        } else if(!resultsReady && quizCompleted){

            return (
              <div style={{ textAlign: 'center' }}>

                  <img 
                  src="https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExdXE2bW5xbjBzcnk3eHdtMmIzdXBjczRobnBqbXR6b3RtemJtdjNjeiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l3nWhI38IWDofyDrW/giphy.gif" 
                  className="quizCompleted" 
                  alt="Loading Quiz Results" 
                  />

                  <p>Fetching the best artworks for you!</p>

              </div>
            )

        } else if(resultsReady && quizCompleted){

          return (
            <div>

              <div>We think you will like these artworks...</div>
              <div className = "gap"></div>

              <div>Based on your favorite artists</div>
              <div className="resultsContainer">

                
                {imageByArtistsURLs.map((url, index) => (
                  <div key={index} className="resultItem">
                    <img
                      src={url}
                      className="resultImage"
                      alt={` Couldn't fetch Artwork ${index + 1}`}
                    />
                    <div className="artDetails">
                      <div className="artTitle">{artTitlesByArtists[index]}</div>
                      <div className="artistTitle">by {artistTitlesByArtists[index]}</div>
                    </div>
                  </div>
                ))}


              </div>  

              <div className = "gap"></div>
              <div>Based on your preferred styles</div>
              <div className="resultsContainer">


                {imageByStylesURLs.map((url, index) => (
                  <div key={index} className="resultItem">
                    <img
                      src={url}
                      className="resultImage"
                      alt={` Couldn't fetch Artwork ${index + 1}`}
                    />
                    <div className="artDetails">
                      <div className="artTitle">{artTitlesByStyles[index]}</div>
                      <div className="artistTitle">by {artistTitlesByStyles[index]}</div>
                      <div className="artistTitle">Style: {styleTitles[index]}</div>
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

      }

    }
    
    return (
      <div> 
        <LinearWithValueLabel updatedProgress={updatedProgress} />
        <div className="quizQuestions">{renderQuizACB()}</div>
      </div>
    );
    

}