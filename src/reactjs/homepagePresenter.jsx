import { useEffect, useState } from "react";

import { ArtDescBodyView } from "../views/homePageViews/artDescBodyView";
import { fetch20Artworks, getArtWorks, getArtWorkImage, URLParamsForImage, getArtWorksSearch} from '/src/apiCall.js';
import {cleanHtmlContent } from '/src/utilities.js'
import { TopBarView } from "../views/homePageViews/topbarView";
import { ExploreBodyView } from "/src/views/homePageViews/exploreBodyView.jsx";

import { useDispatch } from "react-redux"; // this is for the searched 
import {setNewSearchParam} from "/src/store/searchResultSlice.js";
import { useSelector } from "react-redux"

import { auth } from "../firebaseModel";
import {signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut} from "firebase/auth";

function HomePage(props){ 

    let userUID = useSelector(state => state.user.uid)
    let userDisplayName = useSelector(state => state.user.displayName)
    let userProfilePicURL = useSelector(state => state.user.profilePicURL)
    // here will be the logic for updating the searchReusltSlice 
  
    const dispatch = useDispatch(); 

    function updateCurrentSearch(setParam){
        console.log("about to set params:", setParam);

       const serachparam = {
            title : setParam,
       }
       
        dispatch(setNewSearchParam(serachparam)); 
    }

    //Redux specific hooks
    //const selector = useSelector(); //Allows you to observe the latest data in the store (model)
    //const dispatch = useDispatch(); //Allows you to call upon setters in redux. So when u call setters, u just dispatch actions

    //This is component state - not anything to do with the model or store.
    const [artData, setArtData] = useState(null); 
    const [error, setError] = useState(null);

    function fetchArtWorkACB() {
         
        getArtWorks().then(data => iterateThroughData(data)).catch(error => setError(error.message));
        
    }

    //The first argument is an anonomyous ACB function that we define inside the argument.
    // We could might as well have defined it elsewhere and simply have given the functionACB reference as: useEffect(functionACB, []);
    //The name of this function could be "fetchArtWork" and its sole purpose would be to call the getArtWorks etc.
    useEffect(fetchArtWorkACB, []); 
    if (error) return <div>Error: {error}</div>;
    if (!artData) return <div>Loading...</div>;

        
    function iterateThroughData(array) {
        console.log("This is the array", array);
        console.log("This is it", array.data.filter(artwork => artwork.title && artwork.title !== "Untitled"));
        const filteredData = array.data.filter(artwork => artwork.description && artwork.title && artwork.title !== "Untitled" && artwork.image_id !== null && artwork.image_id);
        setArtData(filteredData);
    }

  
    const randomArt = artData ? artData[Math.floor(Math.random() * artData.length)] : null;
    const image = randomArt ? URLParamsForImage(randomArt.image_id) : null;
    const cleanedDescription = randomArt ? cleanHtmlContent(randomArt.description) : '';
    console.log("THIS IS THE RANDOM ART",randomArt)
    console.log("cleaned", cleanedDescription);


    console.log("this is artData", artData);
    console.log("Selected random art:", randomArt);
    console.log("The image URL:", image);

    //authentication related ----------
    
    
    const provider = new GoogleAuthProvider();

    function onSignInClickedACB (){
        signInWithPopup(auth, provider);
    } 

    function onSignOutClickedACB (){
        signOut(auth).then(() => {
            window.location.reload()}); //reloads page upon sign out
    }

    //----------------------------------
   
    return (<div>
       
        <TopBarView onSearched={updateCurrentSearch}
                    onSignUpClick={onSignInClickedACB}
                    onSignOutClick={onSignOutClickedACB} 
                    userID={userUID} 
                    userName={userDisplayName} 
                    userProfilePicURL={userProfilePicURL}> 
                    
                    </TopBarView>
        <ExploreBodyView> </ExploreBodyView>
        <ArtDescBodyView 
                artData={randomArt} 
                image={image}
                description={cleanedDescription}
                
                />
                
        </div>)
}

export {HomePage}