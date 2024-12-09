import "/src/style.css"





export function TopBarView(props){
    
    function handleMyJournalsClickedACB (){
        return window.location.hash = '#/myjournals'
    }

    return (
        <div>
            
            <div className="topBar">
                
                <button  className="Explore"> 
                    
                   ☰ Explore
                {/*<img  src="image/explore.png"/>*/}


                </button>

               <input className="searchBar" placeholder = "Search..."/> 


                <img  className = "logo" src = "image/Logo.png" />
                
                <button className="signInIcon">
                    <img  src = "image/signinIcon.png" />
                </button>

                <button  className="signInlogo">    
                    Sign in
                   {/*<img  src="/image/signinLogo.png"/>*/}
                </button>
                
                
                <button className="Myjournal" onClick={handleMyJournalsClickedACB} >My Journal</button>
                <button className="Mycollections" >My Collections</button>
                
            
            </div>

            

        </div>

        

    ) 

}
    


