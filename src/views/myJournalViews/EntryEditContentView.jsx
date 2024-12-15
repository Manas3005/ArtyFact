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
        if (!props.entryID){ //when adding new entry
            return "Cancel"
        } else {
            return "Discard Changes"
        }
    }

    function renderDeleteIconACB (){
        if (!props.entryID){ //when adding new entry
            return "/image/minusIcon.png"
        } else {
            return "/image/deleteIcon.png"
        }
    }
    
    
    return (
        <div className="journalsHorizontalFlexParent">

            <div className="leftContent commonText">

                <div className="titleAndDateDiv">
                   
                    <input className="entryTitleTextBox commonText" placeholder="Journal Entry Title " onBlur={onEntryTitleChangeACB}></input>

                    <div className="dateText commonText"> 
                        
                        <label>Date:  </label>{props.todayDate}
                        
                        
                    </div>

                </div> 

                <div className="moodDiv">

                    <div>

                        <input className="entryTextBox commonText" placeholder="Current Mood (Optional)" onBlur={onEntryMoodChangeACB}></input>

                    </div>
                </div>

                <div className="journalEntryDiv">

                    <textarea className="journalEntryContentTextBox commonText" placeholder="What are you thinking about? Start Typing here ..." onBlur={onEntryTextChangeACB}></textarea>

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