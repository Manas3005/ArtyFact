import { FindMyTasteTopBarView } from "../views/findMyTastePageViews/findMyTasteTopBarView"
import { DreamArtDescView } from "../views/findMyTastePageViews/dreamArtDescView"
import { ArtQuizView } from "../views/findMyTastePageViews/artQuizView"
import { useEffect, useState } from "react";


export function FindMyTaste(props){

    const [currentView, setCurrentView] = useState('describe'); /*here component state is used because it aids the change of views depnding
    on the tab button clicked only on findMyTaste so it has no connection with the application state*/
    
    function setArtDescViewACB(){ //handling custom event 
        setCurrentView('describe') 
    }

    function setArtQuizViewACB(){ //handling custom event
        setCurrentView('quiz') 
    }

    useEffect(function() { //this is taking currentView as a dependency so whenever the functions above are called, the view below updates
      }, [currentView]);

    

    return (<div>
                <FindMyTasteTopBarView onDescribeButtonClicked = {setArtDescViewACB} 
                                       onArtQuizButtonClicked = {setArtQuizViewACB}              
                ></FindMyTasteTopBarView> 
                {currentView === 'describe' ? (<DreamArtDescView/>) : (<ArtQuizView />)}
            </div>)
}
