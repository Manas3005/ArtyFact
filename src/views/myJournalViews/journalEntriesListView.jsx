import "/src/style.css"
import "/src/journalsStyle.css"
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

                {addDynamicJournalEntries(props.entries)}

                </div>

            </div>
        )

        function addDynamicJournalEntries (journalEntries){ 
            const entryTitles = journalEntries.map(transformJournalTitleCB)
    
            entryTitles.forEach(entryTitle => {
    
                const scrollableArea = document.getElementById("scrollableArea");
                const wrapper = document.createElement("div"); // Create a container
              
                const img = document.createElement("img");
                img.src = "image/starry-night.png"                 
    
                const text = document.createElement("span"); // Create text element
                text.textContent = entryTitle;        // Set the text content
    
                wrapper.appendChild(img);            // Add image to the wrapper
                wrapper.appendChild(text);           // Add text to the wrapper
                scrollableArea.appendChild(wrapper); // Add wrapper to the container
            });
        }

    } 



}
    


