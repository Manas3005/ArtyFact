import {BackToHomeButton, MyJournalsButton, Button, SignInButton } from "../customViewComponents/backToHomeButton";
import "/src/css/collectionsStyle.css"
import "/src/css/collectionStyle.css"


export function TopbarCollectionView(props) {

    console.log("This is the props in topbarcollectionview", props);
    
    function handleClickForBackToHomeACB(evt) {
        window.location.hash = "#/";
    }

    function handleclickForMyJournalACB() {
        window.location.hash ="#/myJournal";
    }



    return (

        <div>
            <div className="topbarCollection">
                <button className={"backToHomeCollection"} onClick={handleClickForBackToHomeACB}>Back To Home</button>
                <button className={"MyJournalCollection"} onClick={handleclickForMyJournalACB}>Back slfkjdsf</button>
                <h1 className="collectionTitle">{props.collection.collection_title}</h1>
                <div className="collectionName">{props.collection.collection_description}</div>
                <SignInButton className={"signInLogo"}></SignInButton>
                <button className="signInIcon">
                <img src = "/image/signinIcon.png"/>
                </button>
            </div>
        </div> 


    )





}