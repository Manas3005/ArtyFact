import { JournalTopBarView } from "../views/myJournalViews/journalTopBarView";
import { JournalEntriesListView } from "../views/myJournalViews/journalEntriesListView";
import { useSelector } from "react-redux"

function MyJournalsMain (props){

    let journalEntries = useSelector(state => state.myJournals.entries)
    
    /*Login details after user logged in */ 
    let userUID = useSelector(state => state.user.uid)
    let userDisplayName = useSelector(state => state.user.displayName)
    let userProfilePicURL = useSelector(state => state.user.profilePicURL)

    console.log("Rendering myJournalsMain")
    return (<div>

        <JournalTopBarView
            userID={userUID} 
            userName={userDisplayName} 
            userProfilePicURL={userProfilePicURL}>

        </JournalTopBarView>

        <JournalEntriesListView entries={journalEntries}></JournalEntriesListView>
    </div>)

    
}

export {MyJournalsMain}