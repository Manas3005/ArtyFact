import "/src/css/style.css"
import "/src/css/journalsStyle.css"

export function JournalTopBarView(props){
    
    function handleBackToHomeClickedACB (){
        return window.location.hash = '#/homepage'
    }

    function handleAddNewEntryClickedACB (){
        props.onAddNewEntryClick()
        return window.location.hash = '#/editentry'
    }

    function handletopRightButtonClickedACB (){
       
        if (!props.isJournalEntrySelected){
            return window.location.hash = '#/collections'
        } else {
            return window.location.hash = '#/myjournals'
        }
    }

    //conditionally rendering the title of the page where the user currently is
    function handleRenderPageTitleACB(){ 

        if (!props.isJournalEntrySelected){
            
            return (
            
            <div>
            <img  className = "logo" style={{cursor:"pointer"}}src = "/image/myJournalsLogo.png" onClick={() => window.location.hash="/"}/>
                
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

    return (
        <div>
            
            <div className="topBar">
                
                <button className="myJournalsMyCollections commonText commonButtonBase" onClick={handletopRightButtonClickedACB}>{props.topRightButtonText}</button>
                <button className="backToHome commonText commonButtonBase" onClick={handleBackToHomeClickedACB}> Back To Home</button> 
               
                <div>{handleRenderPageTitleACB()}</div>

                <button className="buttonWithIcon commonButtonBase">
                    <img className="Icon" src = "/image/signinIcon.png" />
                    <text className="loggedInText commonText">Logged In</text>
                </button>
                            
            </div>

        </div>

    ) 

}