import "/src/css/style.css"
import "/src/css/journalsStyle.css"
import { conditionalRenderHelperCB } from "../../utilities"

export function EntryEditTopBarView(props){

    function handleNavigationBackACB (){
        props.onEditEntryPageExit()
        if (props.entryID === null){
            return window.location.hash = '#/myjournals'
        }

        const idString = props.entryID.toString()
        const path = "#/journalEntryContent/" + idString
        return window.location.hash = path
    }

    function handleCancelClickedACB (){
        handleNavigationBackACB();
    }


    function handleSaveChangesClickedACB (){
        props.onSaveChanges();
        handleNavigationBackACB();
    }

    function renderBackButtonTitleACB (){
        return conditionalRenderHelperCB(props.entryID, "Back To My Journals", "Back To Journal Entry")

    }
    function renderPageTitleACB (){
        return conditionalRenderHelperCB(props.entryID, "Add New Journal Entry", "Edit Journal Entry")
    }

    function renderSaveChangesIconACB (){
        return conditionalRenderHelperCB(props.entryID, "/image/plusIcon.png", "/image/saveIcon.png")
    }

    function renderPageTitleACB (){
        return conditionalRenderHelperCB(props.entryID, "Add New Journal Entry", "Edit Journal Entry")

    }

    function renderSaveTextACB (){
        return conditionalRenderHelperCB(props.entryID, "Save Entry", "Save Changes")

    }
    
    return (
        <div>
            <div className="topBar">
                
                <button className="backToMyJournals commonText commonButtonBase" onClick={handleNavigationBackACB}> {renderBackButtonTitleACB()}</button> 
               
                
                <div className="editJournalEntryLogo commonText commonCenterFlex">{renderPageTitleACB()}</div>
                
                <div className="saveAndCancelDiv commonCenterFlex">
                    <button className="saveChanges commonText commonButtonBase" onClick={handleSaveChangesClickedACB}>
                        <img className="Icon" src = {renderSaveChangesIconACB()} />
                        <text >{renderSaveTextACB()}</text>
                    </button>

                    <button className="deleteEntry commonText commonCenterFlex commonButtonBase" onClick={handleCancelClickedACB}>
                            <img className="Icon" src = "/image/minusIcon.png" />
                            <text >Discard Changes</text>
                    </button>

                </div>
                            
            </div>
                               
        </div>

    ) 

}