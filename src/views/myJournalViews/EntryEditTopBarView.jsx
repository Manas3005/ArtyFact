import "/src/css/style.css"
import "/src/css/journalsStyle.css"

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
               
                
                <div className="editJournalEntryLogo">Edit Journal Entry</div>
                <button className="saveChanges" onClick={handleSaveChangesClickedACB}>
                    <img className="Icon" src = "https://i.imgur.com/7gI19MR.png" />
                    <text >Save Changes</text>
                </button>

                
                            
            </div>
                               
        </div>

    ) 

}