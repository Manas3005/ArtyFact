import "/src/css/style.css"
import "/src/css/journalsStyle.css"
import { conditionalRenderHelperCB } from "../../utilities";

export function JournalTopBarView(props){
    
    function handleBackToHomeClickedACB (){
        props.onExitContentPage();
        if(props.isJournalEntrySelected){
        props.defaultSelectedEntryID()
        };
        return window.location.hash = '#/homepage'
        
    }

    function handleAddNewEntryClickedACB (){
        props.onAddNewEntryClick()
        return window.location.hash = '#/editentry'
    }

    function handletopRightButtonClickedACB (){
        props.onExitContentPage();
       
        if (!props.isJournalEntrySelected){
            return window.location.hash = '#/collections'
        } else {
            props.defaultSelectedEntryID();
            return window.location.hash = '#/myjournals'
        }
    }

    //conditionally rendering the title of the page where the user currently is
    function handleRenderPageTitleACB(){ 

        if (!props.isJournalEntrySelected){
            
            return (
            
            <div>
            <img  className = "myJournalsMainTitle" style={{cursor:"pointer"}}src = "/image/myJournalsLogo.png" onClick={() => window.location.hash="/"}/>
                
            <button className="addNewEntry commonText" onClick={handleAddNewEntryClickedACB}>
                    <img className="Icon" src = "/image/plusIcon.png" />
                    <text >Add New Journal Entry</text>
                </button>
            </div>   
            )


            
        } else {
            return (<div className="editJournalEntryLogo commonText commonCenterFlex">{props.pageHeading}</div>)
        }    
    }

    function renderProfilIcon (){
        return conditionalRenderHelperCB(props.userID, "/image/signinIcon.png", props.userProfilePicURL)
    }

    function renderDisplayNameText (){
        return conditionalRenderHelperCB(props.userID,"Guest", props.userName)
    }

    return (
        <div>
            
            <div className="journalTopBar">
                
                <button className="myJournalsMyCollections commonText commonButtonBase" 
                    onClick={handletopRightButtonClickedACB}>{props.topRightButtonText}</button>
                    
                <button className="backToHomeJournals commonText commonButtonBase" 
                    onClick={handleBackToHomeClickedACB}> Back To Home</button> 
               
                <div>{handleRenderPageTitleACB()}</div>
                
                <button className="buttonWithIcon commonButtonBase ">
                    <img className="Icon" src = {renderProfilIcon()} />
                    <text className="loggedInText">{renderDisplayNameText()}</text>
                </button>

                              
            </div>

        </div>

    ) 

}

