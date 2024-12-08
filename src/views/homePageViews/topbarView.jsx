import "/src/style.css"
//import Drawer from '@mui/material/Drawer';
import React, { useState } from 'react';
import ExploreDrawer from './ThirdPartyWrittenComponents/sideBarNav';
import "/src/style.css";


export function TopBarView(props){

    const [open, setOpen] = useState(false);

    const toggleDrawer = (newOpen) => () => {
      setOpen(newOpen);
    };
  
    console.log("we are here and this is props"+ props)

    return (
        <div>
            
            <div className="topBar">
                
                <button  onClick={toggleDrawer(true)} className="Explore"> 
                    
                   ☰ Explore
                {/*<img  src="image/explore.png"/>*/}

               
                </button>

                <ExploreDrawer open={open} toggleDrawer={toggleDrawer} />




               <input className="searchBar" placeholder = "Search..."/> 


                <img  className = "logo" src = "image/Logo.png" />
                
                <button className="signInIcon">
                    <img  src = "image/signinIcon.png" />
                </button>

                <button  className="signInlogo">    
                    Sign in
                   {/*<img  src="/image/signinLogo.png"/>*/}
                </button>
                
                
                <button className="Myjournal" >My Journal</button>
                <button className="Mycollections" >My Collections</button>
                
            
            </div>

            

        </div>

        

    ) 

}
    


