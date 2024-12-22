import "/src/css/style.css"
import "/src/css/journalsStyle.css"
import { renderEntryArtWorkPath, conditionalRenderHelperCB } from "../../utilities"

export function EntryEditContentView(props){

    function onEntryTitleChangeACB (event){
        props.onEntryTitleChange(event.target.value)
    }

    function onEntryMoodChangeACB (event){
        props.onEntryMoodChange(event.target.value)
    }

    function onEntryTextChangeACB (event){
        props.onEntryTextChange(event.target.value)
    }

    function handleAddOrChangeArtworkClick (){
        const searchArtworkModal = document.getElementById("searchArtworkModal")
        searchArtworkModal.style.display = "flex";
    }

    function closeModalACB(){
        const searchArtworkModal = document.getElementById("searchArtworkModal")
        searchArtworkModal.style.display = "none";
    }

    function handleSearchParamChangeACB(event){
        props.onSearchParamChange(event.target.value)
    }

    function handleSearchParamsSendACB (){
        props.onEntryContentChange()
        props.onSearchParamsSend()
        window.location.hash="#/searchResult";
    }

    function renderChangeArtWorkButtonText (){
        return conditionalRenderHelperCB(props.imageID, "Add Artwork", "Change Artwork")
    }
    
    return (
        <div className="journalsHorizontalFlexParent">

            <div className="leftContent commonText">

                <div className="titleAndDateDiv">
                   
                    <input className="entryTitleTextBox commonText" value={props.inputTitle} placeholder="Journal Entry Title " onChange={onEntryTitleChangeACB}></input>

                    <div className="dateText commonText"> 
                        
                        <label>Date:  </label>{props.todayDate}
                        
                        
                    </div>

                </div> 

                <div className="moodDiv">

                    <div>

                        <input className="entryTextBox commonText" value={props.inputMood} placeholder="Current Mood" onChange={onEntryMoodChangeACB}></input>

                    </div>
                </div>

                <div className="journalEntryDiv">

                    <textarea className="journalEntryContentTextBox commonText" value={props.inputActualText} placeholder="What are you thinking about? Start Typing here ..." onChange={onEntryTextChangeACB}></textarea>

                </div>

            </div>


            <div className="rightContent">

                

                    <div className="sidebarVerticalFlexParent">
                    
                        <div className="up commonCenterFlex">

                            <div className="artWorkBox commonCenterFlex">
                                    <img className="starryNightIcon" src={renderEntryArtWorkPath(props.imageID)}></img>
                            </div>

                        </div>


                        <div className="down">
                        
                            <button id="addOrChangeArtwork" className="addArtwork commonText commonButtonBase"
                            onClick={handleAddOrChangeArtworkClick}>{renderChangeArtWorkButtonText()}</button>
                    
                        </div>    
                    
                    </div>

                    

            </div>

            <div id="searchArtworkModal" class="modal" >
                <div class="modal-content">
                    <h2 className="commonText">Search for the artwork you wish to add to the current Journal Entry</h2>
                    <input className="editEntrysearchBar" placeholder = "Type here..." onBlur={handleSearchParamChangeACB}/>
                    <div className="modalButtonDiv">
                        <button className="goButton commonText commonButtonBase" onClick={handleSearchParamsSendACB}>Go</button>
                        <button id="closeModel" className="cancel commonText commonButtonBase" onClick={closeModalACB}>Cancel</button>
                    </div>
                </div>
            </div>
                               
        </div>

    ) 

}