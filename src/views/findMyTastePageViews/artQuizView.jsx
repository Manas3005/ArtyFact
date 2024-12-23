import "/src/css/findMyTasteStyle.css"
import LinearWithValueLabel from "../ThirdPartyWrittenComponents/LinearProgressWithLabel"


export function ArtQuizView (props){

    const artTitlesByArtists = props.artTitlesByArtists;
    const artistTitlesByArtists = props.artistTitlesByArtists;
    const imageByArtistsURLs = props.imageByArtistsURLs;

    const artTitlesByStyles = props.artTitlesByStyles;
    const artistTitlesByStyles = props.artistTitlesByStyles;
    const imageByStylesURLs = props.imageByStylesURLs;
    const styleTitles = props.styleTitles;

    const artTitlesByMediums = props.artTitlesByMediums;
    const artistTitlesByMediums = props.artistTitlesByMediums;
    const imageByMediumsURLs = props.imageByMediumsURLs;
    const mediumTitles = props.mediumTitles;

    const selectedStyles = props.selectedStyles;
    const selectedArtists = props.selectedArtists;
    const selectedMediums = props.selectedMediums;

    const updatedProgress = props.updatedProgress;
    const resultsReady = props.resultsReady;
    const quizCompleted = props.quizCompleted;
    const quizReady = props.quizReady;

    const artistsOptions = props.artistsOptions;
    const styleOptions = props.styleOptions;
    const mediumOptions = props.mediumOptions;
    const errorMessage = props.errorMessage;
    const showMessage = props.showMessage;
    
    


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

    function handleMediumChoiceSelectionACB(medium){
      props.onMediumSelected(medium);
      console.log("SELECTED STYLE", medium)
    }



    function handleSubmitClickACB(){ //firing custom event to fetch art by selectedArtists 
        props.onSubmitButtonClicked(selectedArtists);
    }


    function handleBackToQuizACB() {
      props.onBackToQuizButtonClicked();
    }



    //THE RENDER OPTIONS METHODS BELOW CAN POSSIBLY BE SIMPLIFIED TO A REUSABLE FUNCTION
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

      return styleOptions.map(function organizeAsOptionCB(style) {
      const isSelected = selectedStyles.includes(style)
        
      return (
        <button
            key={style}
            className={"favoriteArtist" + (isSelected ? "Selected" : "")} //This is to use a different class to style the button if an input is selected (background color) for better user feedback
            onClick={function() { handleStyleChoiceSelectionACB(style); }}
        >
            <input
                type="checkbox"
                readOnly
                checked={isSelected}
            />
            {style}
        </button>
      );
      });
    }


    function renderMediumOptions() {

      return mediumOptions.map(function organizeAsOptionCB(medium) {
      const isSelected = selectedMediums.includes(medium)
        
      return (
        <button
            key={medium}
            className={"favoriteArtist" + (isSelected ? "Selected" : "")} 
            onClick={function() { handleMediumChoiceSelectionACB(medium); }}
        >
            <input
                type="checkbox"
                readOnly
                checked={isSelected}
            />
            {medium}
        </button>
      );
      });
    }

    function handleQuizLoadingACB(){
      props.onBeginLoadingQuiz();
    }

   

    function handleChosenArtworkClickACB (){
      window.location.hash = "#/searchChoosen";
      props.onQuizArtworkChosen();
    }


    
    function renderArtByArtistsACB() {
      if (selectedArtists.length !== 0 && imageByArtistsURLs.length !== 0) {
        return (
          <div>
            <div className="resultsPageSubtitle">Based on your favorite artists</div>
            <div className="separator"></div>
    
            <div className="quizResultsContainer">
              {imageByArtistsURLs.map((url, index) => {
                const artworkDetails = {
                  art_name: artTitlesByArtists[index],
                  image_id: url,
                  artist: artistTitlesByArtists[index],
                };
    
                return (
                  url ? (
                    <div
                      key={index}
                      className="quizResultItem"
                      onClick={() => handleChosenArtworkClickACB(artworkDetails)}
                    >
                      <img
                        src={url}
                        className="quizResultImage"
                        alt={`Couldn't fetch Artwork ${index + 1}`}
                        onError={(e) => {
                          e.target.closest(".quizResultItem").style.display = "none";
                        }}
                      />
                      <div className="quizArtDetails">
                        <div className="quizArtTitle">{artTitlesByArtists[index]}</div>
                        <div className="artistTitle">by {artistTitlesByArtists[index]}</div>
                      </div>
                    </div>
                  ) : null
                );
              })}
            </div>
          </div>
        );
      } else if (selectedArtists.length === 0 && imageByArtistsURLs.length === 0) {
        return;
      } else if (selectedArtists.length !== 0 && imageByArtistsURLs.length === 0) {
        return (
          <p className="noResults">
            Oops! No results found for the selected artists. Try selecting different artists to discover artworks you'll love
          </p>
        );
      }
    }


    function renderArtByStylesACB(){

      if(selectedStyles.length!==0 && imageByStylesURLs.length!==0){

        return (
        <div>

              <div className="resultsPageSubtitle">Based on your preferred styles</div>
              <div className="separator"></div>

              <div className="quizResultsContainer">

              {imageByStylesURLs.map((url, index) => (
                
               url ? (
               <div key={index} className="quizResultItem">
                 <img
                   src={url}
                   className="quizResultImage"
                   alt={`Couldn't fetch Artwork ${index + 1}`}
                   onError={(e) => {
                     e.target.closest(".quizResultItem").style.display = "none"; 
                   }}
                 />
                 <div className="quizArtDetails">
                   <div className="quizArtTitle">{artTitlesByStyles[index]}</div>
                   <div className="artistTitle">by {artistTitlesByStyles[index]}</div>
                   <div className="artistTitle">Style: {styleTitles[index]}</div>
                 </div>
               </div>
              ) : null
              ))}


              </div>

          </div>
          )
      } else if(selectedStyles.length===0 && imageByStylesURLs.length===0){
        return;
      } else if(selectedStyles.length!==0 && imageByStylesURLs.length===0){
        return (
          <p className = "noResults">Oops! No results found for the selected styles. Try selecting different styles to discover artworks you'll love</p>

        )
      }
    }


    function renderArtByMediumACB(){

      if(selectedMediums.length!==0 && imageByMediumsURLs.length!==0){
        
        return (
        <div>

              <div className="resultsPageSubtitle">Based on the mediums you liked</div>
              <div className="separator"></div>


              <div className="quizResultsContainer">

              {imageByMediumsURLs.map((url, index) => (
                url ? (
                  <div key={index} className="quizResultItem">
                    <img
                      src={url}
                      className="quizResultImage"
                      alt={`Couldn't fetch Artwork ${index + 1}`}
                      onError={(e) => {
                        e.target.closest(".quizResultItem").style.display = "none"; 
                      }}
                    />
                    <div className="quizArtDetails">
                      <div className="quizArtTitle">{artTitlesByMediums[index]}</div>
                      <div className="artistTitle">by {artistTitlesByMediums[index]}</div>
                      <div className="artistTitle">Medium: {mediumTitles[index]}</div>
                    </div>
                  </div>
                ) : null
              ))}


              </div>

          </div>
          )
      }else if(selectedMediums.length===0 && imageByMediumsURLs.length===0){
        return;

      } else if(selectedMediums.length!==0 && imageByMediumsURLs.length===0){
        
        return (
          <p className = "noResults">Oops! No results found for the selected mediums. Try selecting different mediums to discover artworks you'll love</p>
        )
      }
    }



    function renderQuizACB() {

      handleQuizLoadingACB()

      if(quizReady){
      if (updatedProgress === 0) {

        return (

          <div>

            <div className="quizWelcomeContainer">
                <h1 className="quizWelcomeTitle">Welcome to the Art Quiz!</h1>
                <p className="quizDescription">
                Discover artworks that match your unique taste! Select your favorite artists, styles, and mediums to create a personalized gallery just for you.
                </p>
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

          if(updatedProgress === 33){

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

           } else if(updatedProgress===66) {

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

           } 
      } else if (updatedProgress === 100) {

        if (!resultsReady && !quizCompleted) {
          
          return (
            <div>
            <div> The medium of an artwork is important because it reveals how the piece was created, highlights its artistic and technical qualities, and determines its preservation needs. Which of these mediums interest you?</div>
              <div className="favoriteMediumsContainer">
              {renderMediumOptions()}
              </div>             
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
                {errorMessage && (
                <div className={`error-message ${showMessage ? "fade-in" : "fade-out"}`}>
                    {errorMessage}
                </div>
                )}
              </div>

          );

        } else if(!resultsReady && quizCompleted){

            return (
              <div style={{ textAlign: 'center' }}>

                  <img 
                  src="public/image/artQuizBackground.gif" 
                  className="quizCompleted" 
                  alt="Loading Quiz Results" 
                  />

                  <p>Fetching the best artworks for you!</p>

              </div>
            )

        } else if(resultsReady && quizCompleted){

     

          return (
            <div>
              <div className="resultsPageTitle">Here Are Artworks Curated Just For You</div>

              {renderArtByArtistsACB()}
              {renderArtByStylesACB()}
              {renderArtByMediumACB()}

              <button
                onClick={handleBackToQuizACB}
                className="quizBackButton"
              >
                Back to Quiz
              </button>
            </div>
          );

        //}
        }

      }
    } else {
      return (
        <div style={{ textAlign: 'center' }}>

            <img 
            src="public/image/artQuizBackground.gif" 
            className="quizCompleted" 
            alt="Loading Art Quiz" 
            />

            <p>Loading Quiz</p>

        </div>
      )
    }
    }
    
    return (
      <div className="bodyBackground"> 
      <LinearWithValueLabel updatedProgress={updatedProgress} />
      <div className="quizQuestions">{renderQuizACB()}</div>
    </div>
    );
    

}