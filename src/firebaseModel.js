import {firebaseConfig} from "/src/firebaseConfig.js";
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get, set } from "firebase/database";
import { setEntries } from "./store/journalsSlice";
import { setSearchQuery, setCollectionsArray } from "./store/collectionsSlice";

import "./apiCall";
import "./utilities"
import { useSelector} from "react-redux";


import { useEffect } from "react";
import { getArtWorkByID, URLParamsForImage } from "./apiCall";
import { extractDateInterval } from "./utilities";

/**
 * We will have one "modelToPersistence" for each slice, since each slice has different data/objects to store in firebase,
 * it makes sense to keep these functions separately for modularity purposes.
 * 
 * On authentication/login, the index will call upon the connectToFirebase function and pass the store as an argument.
 * In that case, we need to read the data from the firebase.
 */


const app= initializeApp(firebaseConfig);
const db= getDatabase(app);

/*  PATH is the “root” Firebase path.  */
const PATH = "ArtyFact";
const rf = ref(db, PATH);

// Initialise firebase app, database, ref
const myBigRef = ref(db, PATH);
const myRef = ref(db, PATH + "/test")
const myCollectionsRef = ref(db, PATH + "/collections")
const myJournalsRef = ref(db, PATH + "/myJournals")

// here is a test to try
set(myRef, {
    numberOfGuests:5, 
    currentDishId:13, 
    dishes:[{id:13, title:"dummy1"}, 
            {id:42, title:"dummy2"}]
   }) 

set(myCollectionsRef, {
    collectionsArray: [
        {
            collectionTitle: "Japanese Art",
            artWorks: [34,123,5312]
        },
        {
            collectionTitle: "Impressionism.. oh",
            artWorks: [3123,235,12]
        },
    ]
})

set(myJournalsRef,{entries:[
        {
            title: "Japanese Art",
            mood: "Happy",
            date: "Mon Dec 16 2024",
            actualText: "HSAHKJ",
            entryID: 12
        },
        {
            title: "Japanese Art",
            mood: "Happy",
            date: "Mon Dec 16 2024",
            actualText: "HSAHKJ",
            entryID: 12
        },
    ],
    latestID: 122,
    selectedEntryID: 12,
})

function readyACB(snap) {
    return snap.val();
}

function modelToPersistenceForMyCollections() {
    const selectedCollections = useSelector(state => state.myCollections.collectionsArray);
    console.log("THIS IS SELECTER", selectedCollections);
    set(myCollectionsRef, selectedCollectionsArray1);
}

function modelToPersistenceForMyJournals() {
    const selectedJournalEntries = useSelector(state => state.journalsSlice.entries);
    set(myJournalsRef, selectedJournalEntries);
}

    /**
     * We need logic that iterates through the store's objects and gets the relevant parts that we need to store in the firebase.
     * So for example in the case below, in order to create an array of dishIDs we are mapping through the dishes array and returning only the IDs of each dish.
     * And then we persist only this data.
     * @param } model 
     * @returns 
     */
function modelToPersistence(state) {

    modelToPersistenceForMyCollections(state)
    modelToPersistenceForMyJournals(state)

    const send = {
        guests: model.numberOfGuests,//--------------change 
        dishIDs: [...model.dishes].map(dish => dish.id).sort((a, b) => a - b),
        dishId: model.currentDishId,
    };

    return send;
 }

 async function generateObjectsForCollections(collections) {
    const populatedCollections = await Promise.all(
        collections.collectionsArray.map(async (collection) => {
            const resolvedArtWorks = await Promise.all(
                collection.artWorks.map(async (id) => {
                    try {
                        const result = await getArtWorkByID(id);
                        const dateInterval = extractDateInterval(result.data.artist_display) || "";
                        return {
                            artWork_id: id,
                            artistName: result.data.artist_title,
                            artWorkTitle: result.data.title,
                            image_URL: URLParamsForImage(result.data.image_id),
                            artistDate: dateInterval,
                        };
                    } catch (error) {
                        console.error(`Error fetching artwork ID ${id}, perhaps it doesn't exist:`, error);
                        return null; 
                    }
                })
            );

            return {
                collectionTitle: collection.collectionTitle,
                artWorks: resolvedArtWorks.filter((artwork) => artwork !== null),
            };
        })
    );

    return populatedCollections;
}


 /**
  * Denna funktion ska omvandla data från firebase till objekt som vi ska spara i store.
  * Hur ska dessa objekt se ut?
  * Vi vill spara det som är relevant för collections.
  * För varje collection-item (alltså en artWork) vill vi returnera/skapa ett obejtk för den artWorken.
  * collectionsArray: [
  *                                     
  * ]
  * Det vi har lyckat göra nu är att vi kan läsa från firebase, och hämta det relevanta datan och skriva den till application state.
  * Det vi dock måste ha i åtanke är dock att vi tar med image_id, men vi hämtar inte själva bilden, det kanske vi borde göra också nu?
  * Eller ska vi göra det i presenter? Det kanske är bättre om vi gör det nu faktiskt så att alltid går snabbare när vi är i applikationen.
  * Det enda vi behöver göra nu är att vi måste se till att vi, baserat på image_id, kan fetcha själva URL:en, och låta det vara det som läggs in i application state?
  * Vi har en utility funktion som hämtar image url. Vi kan testa att använda den i vår async await funktion och se ifall det går att lägga in URL:en i objektet.
  * The above is done. Vi lägger nu istället in image URL som value i objektet. Då kan presentern arbeta direkt med den URL:en och rendera bilden.
  */
    async function persistenceToModelForMyCollection(collections, dispatchHook) {
    console.log("These are collections", collections);
    const artWorkPromises = await generateObjectsForCollections(collections);
    console.log("These are the art workS", artWorkPromises);
    /**
     * Perhaps we don't really want to return the artWorks, but instead we would like to persist this data in the store?
     * In that case, how should we do so?
     * Well we can say for sure that we need to persist it to the store, so we need to dispatch the collectionsArray action
     * with the artWorks array.
     * Let's try it out.
     */
    dispatchHook(setCollectionsArray(artWorkPromises)); //Det funkar!
    return artWorkPromises;
}


 function persistenceToModelForMyJournals(journalEntries, dispatchHook){
    
    dispatchHook(setEntries(journalEntries.entries));
    //dispatches here, set action in journal slice
    console.log("These are the journal entries in persistenceToModelForMyJournals", journalEntries);

 }



 function persistenceToModel(firebaseData, dispatchHook) { // we get the snapshot and call the relevant
    persistenceToModelForMyJournals(firebaseData.myJournals, dispatchHook)
    persistenceToModelForMyCollection(firebaseData.collections, dispatchHook).then((result) =>  result);
    /**
     * Would call upon different functions with persistenceToModelforMyCollection(firebaseData.myCollection)
     *                                          persistenceToModelforMyJournal(firebaseData.myJournal)
     
     * In these functoins, when we are getting the data from the persistence and we want to save it to the store,
    
     * we need to make sure that we are also doing some API calls and THEN storing the result of that API call to the store.
     * For example, we would not persist the whole image, instead we would persist the URL to that image,
     * and then we would store the resul of those API calls to the correct portion of the store.
     * 
     * Example persisted data (by slice)
     * firebaseData.collectoins : [{id: 1, title: "Japanese Art", artworks: [123, 51,2521]}, {id: 2, title: "Collection 2", artWorks: [1242,634,2123]}     ]
     * firebaseData.journal: [entries: [{title "#1", mood: Happy, date: Sat 11 April 2024 , actualText: Yo, entryID: 1} ....], latestID:int, selectedEntryID: int]
     * 
     * Getting this data would then lead us to performing some logic to get the API data from the collection id for example
     * Meaning we would prepare all of the data (with the API calls) and then create extended objects with derived data and set them to the store.
    */
   
    // TODO return a promise        
        /**
         * This could for example be replaced with a getArtWorksImage, or we could for example
         * store the artwork_id and simply do a call on the whole ID and store whatever we need from the API call.
         * Remember we should avoid derivable data, meaning things that can be taken from the API instead.
         * In this case, the artist name etc are all derivable from the artwork_id.
         * Essentially for each artwork in the artWorks array for each collection in the collectionsArray we would persist
         * the id of that artwork, and then just filter out all of the data we want for our collection.
        */

            // check boundary conditions
            //checks first if data is null or undefined, then checks data.property, if one of them is falsy, sets default value 
        
            /*state.dishes = data?.dishIdArray || []; //also checks case 2
            state.setCurrentDishId(data?.chosenDishId || null);
            state.setNumberOfGuests(data?.guestsNr || 2);
                   
            return getMenuDetails(data?.dishIdArray || []).then(
                function setDishesInModelACB (dishes) {
                state.dishes = dishes
            })*/
}


function saveToFirebase(state) {
if(state.ready){ // check if the state is ready, however this will be checked when 
   set(myRef, modelToPersistence(state));
}
} 

//note that we might need a reducer for the state.ready, meaning that we dispatch an action that sets the store to ready.
//We might not need the state ready, we're not sure yet on how this works.
    
 function readFromFirebase(state, dispatchHook) { 
    console.log("We are inside read from firebase", state);
    state.ready = false;

    return get(myBigRef).then(
    
    function getSnapValACB(snapshot) { // persisted data we get back from the database
        console.log("This is the snapshot", snapshot)
        console.log("This is the snapshot value", snapshot.val())
        //return persistenceToModel(snapshot.val(), state);
        return persistenceToModel(snapshot.val(), dispatchHook);
    }

   ).then(

    function setReadyACB() {
        console.log("model.ready is TRUE now");
        //model.ready = true;
    }
    
   );     
} 

/* two params of connectToFireBase: current snapshot of db(state), dispatch function from ReactRoot.jsx(dispatchHook) . 
    The dispatchHook is required for readFromFirebase, which is inturn required for dispatching actions 
    in persistenceToModelForMyCollection and persistenceToModelForMyJournal 

*/

 function connectToFirebase(state , dispatchHook) { 
    console.log("inuti connecct", state.ready);
    
    readFromFirebase(state, dispatchHook).then(() => {
        //watchFunction(isChangedACB, sideEffectACB);
        //useEffect(whatHappensAfterChangeACB, [state.numberOfGuests, state.currentDishId, [...state.dishes]])
    });

    function isChangedACB(){  
        console.log("Before change:", model.numberOfGuests, model.currentDishId, model.dishes);
        //console.log("After change:", isChangedACB());
    
        return [model.numberOfGuests, model.currentDishId, [...model.dishes]];
    }
     
    
     function whatHappensAfterChangeACB() {
        // we want to save changes to firebase if we have changes
          
        return saveToFirebase(state);
      
    }
    
    
}


// Remember to uncomment the following line:
export { connectToFirebase, modelToPersistence, persistenceToModel, saveToFirebase, readFromFirebase }

