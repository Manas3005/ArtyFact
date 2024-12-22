import "/src/css/style.css"
import "/src/css/journalsStyle.css"
import { transformJournalTitleCB,renderEntryArtWorkPath } from "../../utilities";




import { useDispatch } from "react-redux";
import { setSelectedEntryID } from "../../store/journalsSlice";

export function JournalEntriesListView(props){

    let dispatch = useDispatch()

    function handleJournalEntryClickedACB (entry){
        const ID = entry.entryID
        dispatch(setSelectedEntryID(ID))

        // parametric routing depending on selected journal entry ID
        const idString = ID.toString()
        const path = "#/journalEntryContent/" + idString
        return window.location.hash = path
    }
    
    if (props.entries.length === 0){
        
        console.log("journal entries array is empty");
        return (
        <div className="entriesList commonCenterFlex">
            <img src="/image/thinkingMan.png"></img>
            <p className="alertText">No Journal Entries Added Yet. </p>
            <p className="alertText">Add Journal Entries using the button above. </p>                       
        </div>

    )}else{

        console.log(props.entries);

        return (
            <div className="entriesList commonCenterFlex">

                <div className="entriesLabelList">

                <text className="previousEntriesText commonText">Previous Journal Entries</text>

                </div>

                <div id="scrollableArea" className="scrollable">

                {props.entries.map((entry, index) => ( //Dynamically renders the exisitng journal entries in the journal entries list
                        
                        <div key={index} className="journalEntryListDiv" onClick={() => handleJournalEntryClickedACB(entry)}>
                            
                            <img src={renderEntryArtWorkPath(entry.artworkID)} className="journalEntryListImage" />
                            <span className="journalEntryListText commonText">{transformJournalTitleCB(entry)}</span>
                            
                        </div>

                    ))}

                </div>

            </div>
        )
    } 



}
    


