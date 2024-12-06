import "/src/style.css"


function TopbarCollectionsView(props) {

    function backToHomeACB() {
        window.location.hash="/";
    }

    function goToJournalACB() {
        window.location.hash="/myJournal";
    }
    
    return (

        <div>

            <div className="">
                <button className="myJournal" onClick={goToJournalACB}>My Journals</button>
                
                <button className="backToHome" onClick={backToHomeACB}>Back To Home</button>
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