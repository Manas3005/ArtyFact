import {BackToHomeButton, MyJournalsButton, Button } from "../customViewComponents/backToHomeButton";
import "/src/css/collectionsStyle.css"
import "/src/css/collectionStyle.css"


export function TopbarCollectionView(props) {


    return (

        <div>
            <div className="topbarCollection">
                <BackToHomeButton className={"backToHomeCollection"}></BackToHomeButton>
                <MyJournalsButton className={"MyJournalCollection"}></MyJournalsButton>
                <h1 className="collectionTitle">Impressionism.. oh</h1>

            </div>
        </div> 


    )





}