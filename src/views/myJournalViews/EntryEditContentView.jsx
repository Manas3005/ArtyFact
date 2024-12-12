import "/src/css/style.css"
import "/src/css/journalsStyle.css"
import { monthArray, dateArray } from "../../utilities"

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

                    <div className="dateDropdownsDiv"> {/* Select a month and date */}
                        
                        <label>Date:</label>
                        
                        <select className="dropdown" size="1"> {/* dynamically generated from provided arrays */}
                            {monthArray.map((month, index) => (
                                 <option key={index}>{month}</option>
                            ))}
                        </select>

                        <select className="dropdown" size="1"> 
                            {dateArray.map((date, index) => (
                                 <option key={index}>{date}</option>
                            ))}
                        </select>

                    </div>

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
                                    <img className="starryNightIcon" src="/image/starry-night.png"></img>
                            </div>

                        </div>


                        <div className="down">
                        
                            <button className="addArtwork">Add Artwork</button>

                            <button className="deleteEntry">
                                <img className="Icon" src = "/image/deleteIcon.png" />
                                <text >Delete Journal Entry</text>
                            </button>
                    
                        </div>    
                    
                    </div>

                    

            </div>
                               
        </div>

    ) 

}