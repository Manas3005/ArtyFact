import "/src/style.css"

export function EntryEditTopBarView(props){

    function handleBackToMyJournalsClickedACB (){
        return window.location.hash = '#/myjournals'
    }
    
    return (
        <div>
            <div className="topBar">
                
                <button className="backToMyJournals" onClick={handleBackToMyJournalsClickedACB}> Back To My Journals</button> 
               
                <img  className = "logo" src = "image/editJournalEntryLogo.png" />
                
                <button className="saveChanges">
                    <img className="Icon" src = "image/saveIcon.png" />
                    <text >Save Changes</text>
                </button>

                
                            
            </div>
                               
        </div>

    ) 

}