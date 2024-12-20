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
                <h1 className="collectionTitle">{props.collection.title}</h1>
                <div className="collectionName">
                Long before death there was there was the Nile, and out of the Nile death sprung out.. blossomed and ready to kill...
                songs had not yet been invented, nor was love anywhere to be found.. only sickness.. Mefistofeles was simply not ready to accept Nazim Hikmet at this point in time, nor was Prague yet to be on a world map.
                The world was simply not ready..asdklj asd lkasjdkla  sdlkajskdj askldjalksd.. jaoksdjaisd osad... sdjaoidoiwoiausdoiu oiasjdkl kslkqw jelqwe... asdsadiooiqweu  yhej va dgl ryd le..laksdlsa dwq we asdlasd 
                </div>
                <SignInButton className={"signInLogo"}></SignInButton>
                <button className="signInIcon">
                <img src = "/image/signinIcon.png"/>
                </button>
            </div>
        </div> 


    )





}