import "/src/css/style.css"
import "/src/css/journalsStyle.css"

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

    return (
        <div>
            
            <div className="topBar">
                
                <button className="myJournalsMyCollections" onClick={handleMyCollectionsClickedACB}>My Collections</button>
                <button className="backToHome" onClick={handleBackToHomeClickedACB}> Back To Home</button> 
               
                <img  className = "logo" src = "https://i.imgur.com/i2maDv0.png" />
                
                <button className="buttonWithIcon">
                    <img className="Icon" src = "https://i.imgur.com/uf8TJb6.png" />
                    <text className="loggedInText">Logged In</text>
                </button>

                <button className="addNewEntry" onClick={handleAddNewEntryClickedACB}>
                    <img className="Icon" src = "https://i.imgur.com/U5BgrwK.png" />
                    <text >Add New Journal Entry</text>
                </button>
                            
            </div>

        </div>

    ) 

}
    


