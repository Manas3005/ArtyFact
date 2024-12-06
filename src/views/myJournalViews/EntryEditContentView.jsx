import "/src/style.css"

export function EntryEditContentView(props){

    
    return (
        <div className="editEntryHorizontalFlexParent">

            <div className="editEntryLeftContent">

                
                            
            </div>

            <div className="editEntryRightSideBar">

                

                    <div className="sidebarVerticalFlexParent">
                    
                        <div className="up">

                            <div className="artWorkBox">
                                    <img className="starryNightIcon" src="image/starry-night.png"></img>
                            </div>

                        </div>


                        <div className="down">
                        
                            <button className="addArtwork">Add Artwork</button>

                            <button className="deleteEntry">
                                <img className="Icon" src = "image/deleteIcon.png" />
                                <text >Delete Journal Entry</text>
                            </button>
                    
                        </div>    
                    
                    </div>

                    

            </div>
                               
        </div>

    ) 

}