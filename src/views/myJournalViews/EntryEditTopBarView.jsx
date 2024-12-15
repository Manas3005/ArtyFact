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

    function renderPageTitleACB (){
        if (!props.entryID){ //when adding new entry
            return "Add New Journal Entry"
        } else {
            return "Edit Journal Entry"
        }
    }

    function renderSaveChangesIconACB (){
        if (!props.entryID){ //when adding new entry
            return "/image/plusIcon.png"
        } else {
            return "/image/saveIcon.png"
        }
    }

    function renderPageTitleACB (){
        if (!props.entryID){ //when adding new entry
            return "Add New Journal Entry"
        } else {
            return "Edit Journal Entry"
        }
    }

    function renderSaveTextACB (){
        if (!props.entryID){ //when adding new entry
            return "Save Entry"
        } else {
            return "Save Changes"
        }
    }
    
    return (
        <div>
            <div className="topBar">
                
                <button className="backToMyJournals commonText commonButtonBase" onClick={handleBackToMyJournalsClickedACB}> Back To My Journals</button> 
               
                
                <div className="editJournalEntryLogo commonText commonCenterFlex">{renderPageTitleACB()}</div>
                <button className="saveChanges commonText commonButtonBase" onClick={handleSaveChangesClickedACB}>
                    <img className="Icon" src = {renderSaveChangesIconACB()} />
                    <text >{renderSaveTextACB()}</text>
                </button>

                
                            
            </div>
                               
        </div>

    ) 

}