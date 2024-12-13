import "/src/css/style.css"
import "/src/css/journalsStyle.css"

export function JournalTopBarView(props){
    
    function handleBackToHomeClickedACB (){
        return window.location.hash = '#/homepage'
    }

    function handleAddNewEntryClickedACB (){
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
            <img  className = "logo" src = "/image/myJournalsLogo.png" />
                
            <button className="addNewEntry" onClick={handleAddNewEntryClickedACB}>
                    <img className="Icon" src = "/image/plusIcon.png" />
                    <text >Add New Journal Entry</text>
                </button>
            </div>   
            )


            
        } else {
            return (<div className="editJournalEntryLogo">{props.pageHeading}</div>)
        }    
    }

    return (
        <div>
            
            <div className="topBar">
                
                <button className="myJournalsMyCollections" onClick={handletopRightButtonClickedACB}>{props.topRightButtonText}</button>
                <button className="backToHome" onClick={handleBackToHomeClickedACB}> Back To Home</button> 
               
                <div>{handleRenderPageTitleACB()}</div>

                <button className="buttonWithIcon">
                    <img className="Icon" src = "/image/signinIcon.png" />
                    <text className="loggedInText">Logged In</text>
                </button>
                            
            </div>

        </div>

    ) 

}
    


