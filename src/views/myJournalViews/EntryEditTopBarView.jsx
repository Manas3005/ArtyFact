import "/src/css/style.css"
import "/src/css/journalsStyle.css"

export function EntryEditTopBarView(props){

    function handleBackToMyJournalsClickedACB (){
        return window.location.hash = '#/myjournals'
    }

    function handleSaveChangesClickedACB (){
        props.onSaveChanges();
        return window.location.hash = '#/myjournals'
    }
    
    return (
        <div>
            <div className="topBar">
                
                <button className="backToMyJournals commonText commonButtonBase" onClick={handleBackToMyJournalsClickedACB}> Back To My Journals</button> 
               
                
                <div className="editJournalEntryLogo commonText commonCenterFlex">Edit Journal Entry</div>
                <button className="saveChanges commonText commonButtonBase" onClick={handleSaveChangesClickedACB}>
                    <img className="Icon" src = "/image/saveIcon.png" />
                    <text >Save Changes</text>
                </button>

                
                            
            </div>
                               
        </div>

    ) 

}