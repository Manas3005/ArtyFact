import "/src/style.css"
//import "/buttons/explore.png"

export function TopBarView(props){

    return (
        <div>
            <div className="topBar">
                
                <button  className="Explore"> 
                   <img  src="image/explore.png"/>
                </button>

               <input className="searchBar" placeholder = "Search..."/> 


                    <div> 
                    <img  src = "image/Logo.png" />
                     </div>

                

            </div>
            

        </div>


    ) 

}
    


