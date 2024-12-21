import "/src/css/style.css"
//import Drawer from '@mui/material/Drawer';
import React, { useState } from 'react';
import ExploreDrawer from "/src/views/ThirdPartyWrittenComponents/sideBarNav.jsx";
import { conditionalRenderHelperCB } from "../../utilities";

export function TopBarView(props){

    
    function handleMyJournalsClickedACB (){
        return window.location.hash = '#/myjournals'
    }


    const [open, setOpen] = useState(false);

    const toggleDrawer = (newOpen) => () => {
      setOpen(newOpen);
    };
  
    console.log("we are here and this is props"+ props)

    function handleClickForMyCollectionACB() {
        window.location.hash="#/collections";
    }

    function handleSignInClick (){
        if (props.userID === null){
            props.onSignUpClick()
        } else{
            props.onSignOutClick()
        }
        
    }

    function renderProfilIcon (){
        return conditionalRenderHelperCB(props.userID, "/image/signinIcon.png", props.userProfilePicURL)
    }

    function renderSignInButtonText (){
        return conditionalRenderHelperCB(props.userID, "Sign In", "Sign Out")
    }

    function renderDisplayNameText (){
        return conditionalRenderHelperCB(props.userID,"Guest", props.userName)
    }



    return (
        <div>
            
            <div className="topBar">
                
                <button  onClick={toggleDrawer(true)} className="Explore"> 
                    
                   ☰ Explore
                {/*<img  src="image/explore.png"/>*/}

               
                </button>

                <ExploreDrawer open={open} toggleDrawer={toggleDrawer} />

               <input className="searchBar" placeholder = "Search..."/> 


                <img  className = "logo" src = "/image/Logo.png" />
                
                <div className="signInDiv">    
                    <img className="profilePic" src = {renderProfilIcon()} />
                    <label className="displayName">{renderDisplayNameText()}  </label>

                    <button className="signInButton" onClick={handleSignInClick}> {renderSignInButtonText()} </button>
                </div>
                
                <button className="Myjournal" onClick={handleMyJournalsClickedACB} >My Journal</button>
                <button className="Mycollections" onClick={handleClickForMyCollectionACB}>My Collections</button>

                
            
            </div>

            

        </div>

        

    ) 

}
    


