import "/src/css/style.css"
import "/src/css/journalsStyle.css"

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

    function renderDeleteTextACB (){
        if (props.entryID === null){ //when adding new entry
            return "Cancel" 
        } else{ 
            return "Discard Changes"
        }
    }

    function renderDeleteIconACB (){
        if (props.entryID === null){ //when adding new entry
            return "/image/minusIcon.png"
        } else {
            return "/image/deleteIcon.png"
        }
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

                        <input className="entryTextBox commonText" value={props.inputMood} placeholder="Current Mood (Optional)" onChange={onEntryMoodChangeACB}></input>

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
                                    <img className="starryNightIcon" src="/image/starry-night.png"></img>
                            </div>

                        </div>


                        <div className="down">
                        
                            <button className="addArtwork commonText commonButtonBase">Add Artwork</button>

                            <button className="deleteEntry commonText commonCenterFlex commonButtonBase">
                                <img className="Icon" src = {renderDeleteIconACB()} />
                                <text >{renderDeleteTextACB()}</text>
                            </button>
                    
                        </div>    
                    
                    </div>

                    

            </div>
                               
        </div>

    ) 

}