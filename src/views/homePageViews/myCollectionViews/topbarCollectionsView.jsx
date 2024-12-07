import "/src/collectionsCSS/collectionsStyle.css"


function TopbarCollectionsView(props) {

    function backToHomeACB() {
        window.location.hash="#/";
    }

    function goToJournalACB() {
        window.location.hash="/myJournal";
    }

    const boxes = [

    ]
    
    return (

        <div>

            <div className="topbarCollection">
                <button className="MyJournalCollection" onClick={goToJournalACB}>My Journals</button>
                
                <button className="backToHomeCollection" onClick={backToHomeACB}>Back To Home</button>
                <button className="signInlogo">Sign in</button>
                <button className="signInIcon" >
                <img src = "image/signinIcon.png" />
                </button>
                <img className = "logo" src="image/Logo.png" />
            </div>
            
        </div>




    )

}

export {TopbarCollectionsView}