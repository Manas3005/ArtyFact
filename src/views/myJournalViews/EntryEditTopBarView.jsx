import "/src/css/style.css"
import "/src/css/journalsStyle.css"
import { useSelector } from "react-redux"

export function EntryEditTopBarView(props){

    function handleNavigationBackACB (){
        if (props.entryID === null){
            return window.location.hash = '#/myjournals'
        }

        const idString = props.entryID.toString()
        const path = "#/journalEntryContent/" + idString
        return window.location.hash = path
    }

    function handleSaveChangesClickedACB (){
        props.onSaveChanges();
        handleNavigationBackACB();
    }

    function renderBackButtonTitleACB (){
        if (props.entryID === null){ //when adding new entry
            return "Back To My Journals"
        } else {
            return "Back To Journal Entry"
        }
    }
    function renderPageTitleACB (){
        if (props.entryID === null){ //when adding new entry
            return "Add New Journal Entry"
        } else {
            return "Edit Journal Entry"
        }
    }

    function renderSaveChangesIconACB (){
        if (props.entryID === null){ //when adding new entry
            return "/image/plusIcon.png"
        } else {
            return "/image/saveIcon.png"
        }
    }

    function renderPageTitleACB (){
        if (props.entryID === null){ //when adding new entry
            return "Add New Journal Entry"
        } else {
            return "Edit Journal Entry"
        }
    }

    function renderSaveTextACB (){
        if (props.entryID === null){ //when adding new entry
            return "Save Entry"
        } else {
            return "Save Changes"
        }
    }
    
    return (
        <div>
            <div className="topBar">
                
                <button className="backToMyJournals commonText commonButtonBase" onClick={handleNavigationBackACB}> {renderBackButtonTitleACB()}</button> 
               
                
                <div className="editJournalEntryLogo commonText commonCenterFlex">{renderPageTitleACB()}</div>
                <button className="saveChanges commonText commonButtonBase" onClick={handleSaveChangesClickedACB}>
                    <img className="Icon" src = {renderSaveChangesIconACB()} />
                    <text >{renderSaveTextACB()}</text>
                </button>

                
                            
            </div>
                               
        </div>

    ) 

}