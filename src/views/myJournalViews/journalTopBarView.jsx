import "/src/style.css"

export function JournalTopBarView(props){
    
    function handleBackToHomeClickedACB (){
        return window.location.hash = '#/homepage'
    }

    function handleAddNewEntryClickedACB (){
        return window.location.hash = '#/editentry'
    }

    return (
        <div>
            
            <div className="topBar">
                
                <button className="myJournalsMyCollections" >My Collections</button>
                <button className="backToHome" onClick={handleBackToHomeClickedACB}> Back To Home</button> 
               
                <img  className = "logo" src = "image/myJournalsLogo.png" />
                
                <button className="buttonWithIcon">
                    <img className="Icon" src = "image/signinIcon.png" />
                    <text className="loggedInText">Logged In</text>
                </button>

                <button className="addNewEntry" onClick={handleAddNewEntryClickedACB}>
                    <img className="Icon" src = "image/plusIcon.png" />
                    <text >Add New Journal Entry</text>
                </button>
                            
            </div>

        </div>

    ) 

}
    


