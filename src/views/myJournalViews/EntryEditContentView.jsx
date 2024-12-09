import "/src/css/style.css"
import "/src/css/journalsStyle.css"

export function EntryEditContentView(props){

    function onEntryTitleChangeACB (event){
        props.onEntryTitleChange(event.target.value)
    }

    function onEntryDateChangeACB (event){
        props.onEntryDateChange(event.target.value)
    }

    function onEntryMoodChangeACB (event){
        props.onEntryMoodChange(event.target.value)
    }

    function onEntryTextChangeACB (event){
        props.onEntryTextChange(event.target.value)
    }
    
    return (
        <div className="editEntryHorizontalFlexParent">

            <div className="editEntryLeftContent">

                <div className="titleAndDateDiv">
                   
                    <input className="entryTitleTextBox" placeholder="Journal Entry Title " onBlur={onEntryTitleChangeACB}></input>

                    <input className="entryTextBox" placeholder="Journal Entry Date " onBlur={onEntryDateChangeACB}></input>

                </div> 

                <div className="moodDiv">

                    <div>

                        <input className="entryTextBox" placeholder="Current Mood (Optional)" onBlur={onEntryMoodChangeACB}></input>

                    </div>
                </div>

                <div className="journalEntryDiv">

                    <textarea className="journalEntryContentTextBox" placeholder="What are you thinking about? Start Typing here ..." onBlur={onEntryTextChangeACB}></textarea>

                </div>

            </div>

            <div className="editEntryRightSideBar">

                

                    <div className="sidebarVerticalFlexParent">
                    
                        <div className="up">

                            <div className="artWorkBox">
                                    <img className="starryNightIcon" src="image/starry-night.png"></img>
                            </div>

                        </div>


                        <div className="down">
                        
                            <button className="addArtwork">Add Artwork</button>

                            <button className="deleteEntry">
                                <img className="Icon" src = "image/deleteIcon.png" />
                                <text >Delete Journal Entry</text>
                            </button>
                    
                        </div>    
                    
                    </div>

                    

            </div>
                               
        </div>

    ) 

}