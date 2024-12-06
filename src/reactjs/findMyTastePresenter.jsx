import { FindMyTasteTopBarView } from "../views/findMyTastePageViews/findMyTasteTopBarView"
import { DreamArtDescView } from "../views/findMyTastePageViews/dreamArtDescView"
import { ArtQuizView } from "../views/findMyTastePageViews/artQuizView"
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { incrementProgress, decrementProgress } from "../store/findMyTasteSlice";

export function FindMyTaste(props){

    const dispatch = useDispatch()

    const [currentView, setCurrentView] = useState('describe'); /*here component state is used because it aids the change of views depnding
    on the tab button clicked only on findMyTaste so it has no connection with the application state*/

    function setArtDescViewACB(){ //handling custom event 
        setCurrentView('describe') 
    }

    function setArtQuizViewACB(){ //handling custom event
        setCurrentView('quiz') 
    }

    function incrementQuizProgressACB(){
        dispatch(incrementProgress(10))
    }

    function decrementQuizProgressACB(){
        dispatch(decrementProgress(10))
    }

    const updatedProgress = useSelector((state) => state.findMyTaste.progress); //this is to actually update the artQuiz view


    useEffect(function() { //this is taking currentView as a dependency so whenever the functions above are called, the view below updates
      }, [currentView]);

    
    return (<div>
                <FindMyTasteTopBarView onDescribeButtonClicked = {setArtDescViewACB} 
                                       onArtQuizButtonClicked = {setArtQuizViewACB}              
                ></FindMyTasteTopBarView> 

                {currentView === 'describe' ? (<DreamArtDescView/>) : (<ArtQuizView 
                                                                        onNextButtonClicked = {incrementQuizProgressACB}
                                                                        onPreviousButtonClicked = {decrementQuizProgressACB}
                                                                        updatedProgress = {updatedProgress} //Passing down the updated progress to the ArtQuiz view
                                                                        />)}
            </div>)
}
