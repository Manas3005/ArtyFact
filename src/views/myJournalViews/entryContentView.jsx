import "/src/css/style.css"
import "/src/css/journalsStyle.css"

export function EntryContentView(props){

    function handleDeleteEntryClickedACB (){
        props.onDeleteEntryClick()
        return window.location.hash = "#/myjournals"
    }
    
    return (
        <div className="journalsHorizontalFlexParent">

            <div className="leftContent commonText">
                
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

                    <div className="topFlex commonCenterFlex">
                        <div className="artWorkBox commonCenterFlex">
                            <img className="starryNightIcon" src="/image/starry-night.png"></img>
                        </div>
                    </div>

                    <div className="commonCenterFlex">
                        <button id="delete" className="deleteEntry commonText commonCenterFlex commonButtonBase" onClick={handleDeleteEntryClickedACB}>
                                <img className="Icon" src = "/image/deleteIcon.png" />
                                <text >Delete Journal Entry</text>        
                        </button>
                    </div>

                </div>
            </div>

        </div>

    ) 

}