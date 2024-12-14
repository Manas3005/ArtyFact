import "/src/css/style.css"
import "/src/css/journalsStyle.css"

export function EntryContentView(props){

    
    return (
        <div className="horizontalFlexParent">

            <div className="leftContent">
                
                <div>
                    <div className="journalEntryContent">Last Updated: {props.lastUpdated}</div>
                    <div className="journalEntryContent">Mood: {props.mood}</div>
                </div>

                <div className="scrollableTextArea">
                    <div className="journalEntryContent">{props.content}</div>
                </div>

            </div>

            <div className="rightContent">

                <div className="sidebarVerticalFlexParent">

                    <div className="topFlex">
                        <div className="artWorkBox">
                            <img className="starryNightIcon" src="/image/starry-night.png"></img>
                        </div>
                    </div>

                    <div className="bottomFlex">
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