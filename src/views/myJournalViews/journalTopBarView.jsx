import "/src/css/style.css"
import "/src/css/journalsStyle.css"
import { conditionalRenderHelperCB } from "../../utilities";

export function JournalTopBarView(props){
    
    function handleBackToHomeClickedACB (){
        return window.location.hash = '#/homepage'
    }

    function handleAddNewEntryClickedACB (){
        return window.location.hash = '#/editentry'
    }

    function handleMyCollectionsClickedACB (){
        return window.location.hash = '#/collections'
    }

    function renderProfilIcon (){
        return conditionalRenderHelperCB(props.userID, "/image/signinIcon.png", props.userProfilePicURL)
    }

    function renderDisplayNameText (){
        return conditionalRenderHelperCB(props.userID,"Guest", props.userName)
    }

    return (
        <div>
            
            <div className="topBar">
                
                <button className="myJournalsMyCollections" onClick={handleMyCollectionsClickedACB}>My Collections</button>
                <button className="backToHome" onClick={handleBackToHomeClickedACB}> Back To Home</button> 
               
                <img  className = "logo" src = "/image/myJournalsLogo.png" />
                
                <button className="buttonWithIcon">
                    <img className="Icon" src = {renderProfilIcon()} />
                    <text className="loggedInText">{renderDisplayNameText()}</text>
                </button>

                <button className="addNewEntry" onClick={handleAddNewEntryClickedACB}>
                    <img className="Icon" src = "/image/plusIcon.png" />
                    <text >Add New Journal Entry</text>
                </button>
                            
            </div>

        </div>

    ) 

}
    


