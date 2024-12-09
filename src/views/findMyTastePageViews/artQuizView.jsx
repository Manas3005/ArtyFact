import "/src/style.css"
import LinearWithValueLabel from "../ThirdPartyWrittenComponents/LinearProgressWithLabel"


export function ArtQuizView (props){

    const updatedProgress = props.updatedProgress;
    const artists = ["Picasso", "Van Gogh", "Da Vinci", "Monet", "Dali", "Rembrandt", "Matisse", "Mary Cassatt", "Edgar Degas", "Georges Seurat"] // List of artist options to be rendered
    const selectedArtists = props.selectedArtists;


    function renderArtistOptions() {
        return artists.map(function organizeAsOptionCB(artist) {
            const isSelected = selectedArtists.includes(artist);
            return (
                <button
                    key={artist}
                    className={"favoriteArtist" + (isSelected ? "Selected" : "")}
                    onClick={function() { handleChoiceSelectionACB(artist); }}
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


    return (
    
    <div>

        <LinearWithValueLabel updatedProgress = {updatedProgress}></LinearWithValueLabel> {/*Passing down the updated progress to the third party component*/}
        
        <div className = "quizQuestions">
            {updatedProgress === 0 ? (<div >Select your favorite artists {/*Parameter used: "artist_title" */}
                                        <div className="favoriteArtistsContainer">
                                           {renderArtistOptions()}
                                        </div>
                                     </div>) 
            :updatedProgress=== 10 ? (<div >Select your favorite color that you would like your art to be dominated with</div>)
            :(<div >Done</div>) }

            <button onClick = {handlePreviousClickACB} className = "quizPreviousQuestion"> Previous</button>
            <button onClick = {handleNextClickACB} className = "quizNextQuestion"> Next</button> 

        </div>

     
    </div>


    )
}