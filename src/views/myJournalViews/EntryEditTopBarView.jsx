import "/src/style.css"
import "/src/journalsStyle.css"

export function EntryEditTopBarView(props){

    function handleBackToMyJournalsClickedACB (){
        return window.location.hash = '#/myjournals'
    }

    function handleSaveChangesClickedACB (){
        props.onSaveChanges();
    }
    
    return (
        <div>
            <div className="topBar">
                
                <button className="backToMyJournals" onClick={handleBackToMyJournalsClickedACB}> Back To My Journals</button> 
               
                <img  className = "logo" src = "image/editJournalEntryLogo.png" />
                
                <button className="saveChanges" onClick={handleSaveChangesClickedACB}>
                    <img className="Icon" src = "image/saveIcon.png" />
                    <text >Save Changes</text>
                </button>

                
                            
            </div>
                               
        </div>

    ) 

}