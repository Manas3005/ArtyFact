import "/src/style.css"
import "/src/journalsStyle.css"

export function EntryEditContentView(props){

    
    return (
        <div className="editEntryHorizontalFlexParent">

            <div className="editEntryLeftContent">

                <div className="titleAndDateDiv">
                   
                    <input className="entryTitleTextBox" placeholder="Journal Entry Title "></input>

                    <input className="entryTextBox" placeholder="Journal Entry Date "></input>

                </div> 

                <div className="moodDiv">

                    <div>

                        <input className="entryTextBox" placeholder="Current Mood (Optional)"></input>

                    </div>
                </div>

                <div className="journalEntryDiv">

                    <textarea className="journalEntryContentTextBox" placeholder="What are you thinking about? Start Typing here ..."></textarea>

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