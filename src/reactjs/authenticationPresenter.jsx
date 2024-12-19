import { auth } from "../firebaseModel";
import { AuthenticationView } from "../views/authenticationViews/authenticationView";
import {signInWithPopup, signInWithRedirect, GoogleAuthProvider, onAuthStateChanged, signOut} from "firebase/auth";

const provider = new GoogleAuthProvider();

function onSignClickedACB (){
    signInWithPopup(auth, provider);
} 

return ( <AuthenticationView onSignUpClick={}>

        </AuthenticationView>

)