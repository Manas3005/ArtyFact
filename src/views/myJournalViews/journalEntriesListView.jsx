import "/src/css/style.css"
import "/src/css/journalsStyle.css"
import { transformJournalTitleCB } from "../../utilities"; 



export function JournalEntriesListView(props){

    
    if (props.entries.length === 0){
        
        console.log("journal entries array is empty");
        return (
        <div className="entriesList">
            <img src="image/thinkingMan.png"></img>
            <p className="alertText">No Journal Entries Added Yet. </p>
            <p className="alertText">Add Journal Entries using the button above. </p>                       
        </div>

    )}else{

        console.log(props.entries);

        return (
            <div className="entriesList">

                <div className="entriesLabelList">

                <text className="previousEntriesText">Previous Journal Entries</text>

                </div>

                <div id="scrollableArea" className="scrollable">

                {props.entries.map((entry, index) => (
                        <div key={index} className="journalEntryListDiv">
                            <img src="image/starry-night.png" className="journalEntryListImage" />
                            <span className="journalEntryListText">{transformJournalTitleCB(entry)}</span>
                        </div>
                    ))}

                </div>

            </div>
        )
    } 



}
    


