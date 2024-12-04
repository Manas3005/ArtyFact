import "/src/style.css"

export function JournalTopBarView(props){
    

    return (
        <div>
            
            <div className="topBar">
                
                <button className="Mycollections" >My Collections</button>
                <button className="backToHome"> Back To Home</button> 
               
                <img  className = "logo" src = "image/myJournalsLogo.png" />
                
                <button className="signInIcon">
                    <img  src = "image/signinIcon.png" />
                </button>

                <button  className="signInlogo"> Logged In </button>
                            
            </div>

        </div>

    ) 

}
    


