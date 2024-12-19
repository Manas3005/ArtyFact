import { firebaseConfig } from "/src/firebaseConfig.js";
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get, set } from "firebase/database";
import { setEntries } from "./store/journalsSlice";
import { setSearchQuery, setCollectionsArray } from "./store/collectionsSlice";
import { listenerMiddleware } from "./middleware.js";
import { getAuth } from "firebase/auth"


import "./apiCall";
import "./utilities"
import { useSelector } from "react-redux";


import { getArtWorkByID, URLParamsForImage } from "./apiCall";
import { extractDateInterval } from "./utilities";

/**
 * We will have one "modelToPersistence" for each slice, since each slice has different data/objects to store in firebase,
 * it makes sense to keep these functions separately for modularity purposes.
 * 
 * On authentication/login, the index will call upon the connectToFirebase function and pass the store as an argument.
 * In that case, we need to read the data from the firebase.
 */


const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export const auth = getAuth(app); //auth object linking UI with firebase

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
    numberOfGuests: 5,
    currentDishId: 13,
    dishes: [{ id: 13, title: "dummy1" },
    { id: 42, title: "dummy2" }]
})

/**
 * Necessary for reading from firebase and being able to derive data.
 */
set(myCollectionsRef, {
    collectionsArray: [
        {
            collectionTitle: "Japanese Art",
            artWorks: [34, 12981, 129884]
        },
        {
            collectionTitle: "Impressionism.. oh",
            artWorks: [3123, 129885, 129887]
        },
    ]
})

set(myJournalsRef, {
    entries: [
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

//I will now define a test object that we set in the db.
const testCollectionsArray =
{
    collections: [

        {
            collectionTitle: "Japanese Art",
            artWorks: [
                {
                    artWorkTitle: "Joseph Sold by his Brothers",
                    artWork_id: 34,
                    artistDate: "1530-1560",
                    artistName: "Master of the Die",
                    image_URL: "https://www.artic.edu/iiif/2/2238572f-ad2a-110e-0eda-78dc50b8e13d/full/843,/0/default.jpg",
                },
                {
                    artWorkTitle: "Covered Box",
                    artWork_id: 12981,
                    artistDate: "1321-5122",    //should be ""
                    artistName: "Anna Thomas", //should be null
                    image_URL: "https://www.artic.edu/iiif/2/d802ad5d-9cc9-688b-930c-e9082db1665c/full/843,/0/default.jpg",

                },
                {
                    artWorkTitle: "Starry Night and the Astronauts",
                    artWork_id: 129884,
                    artistDate: "1891-1978",
                    artistName: "Alma Thomas",
                    image_URL: "https://www.artic.edu/iiif/2/e966799b-97ee-1cc6-bd2f-a94b4b8bb8f9/full/843,/0/default.jpg",
                }
            ]
        },
        {
            collectionTitle: "Impressionism.. oh",
            artWorks: [
                {
                    artWorkTitle: "The Bath",
                    artWork_id: 3123,
                    artistDate: "1876-1938",
                    artistName: "Charles Georges Dufresne",
                    image_URL: "https://www.artic.edu/iiif/2/7c7ba2a6-b604-e49c-4517-f156c6fb53e6/full/843,/0/default.jpg",
                },
                {
                    artWorkTitle: "Ragini Vibhas, Page from a Jaipur Ragamala Set",
                    artWork_id: 129885,
                    artistDate: "1921-1973",    //should be ""
                    artistName: "Anna", //should be null
                    image_URL: "https://www.artic.edu/iiif/2/bbe7f9d1-eea1-85b5-d71a-20433a9b55da/full/843,/0/default.jpg",

                },
                {
                    artWorkTitle: "Ragini Bangali, Page from a Jaipur Ragamala Set",
                    artWork_id: 129887,
                    artistDate: "1223-4311", //should be ""
                    artistName: "James", //should be null
                    image_URL: "https://www.artic.edu/iiif/2/3f70f565-39e6-7e32-4ae2-75e1e34c9846/full/843,/0/default.jpg",
                }
            ]
        },
    ]
};

function readyACB(snap) {
    return snap.val();
}

function modelToPersistenceForMyCollections() {
    //const selectedCollections = useSelector(state => state.myCollections.collectionsArray);
    //console.log("THIS IS SELECTER", selectedCollections);
    //set(myCollectionsRef, selectedCollectionsArray1);
}

function modelToPersistenceForMyJournals() {
    //const selectedJournalEntries = useSelector(state => state.journalsSlice.entries);
    //set(myJournalsRef, selectedJournalEntries);
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


function persistenceToModelForMyJournals(journalEntries, dispatchHook) {

    dispatchHook(setEntries(journalEntries.entries));
    //dispatches here, set action in journal slice
    console.log("These are the journal entries in persistenceToModelForMyJournals", journalEntries);
}



async function persistenceToModel(firebaseData, dispatchHook) { // we get the snapshot and call the relevant
    persistenceToModelForMyJournals(firebaseData.myJournals, dispatchHook)
    const result = await persistenceToModelForMyCollection(firebaseData.collections, dispatchHook);
    return result;
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


function saveToFirebase(customRef, payload) {
    //if(state.ready){ // check if the state is ready, however this will be checked when 
    //set(myBigRef, modelToPersistence(state));
    //console.log("we are about to set some tests: here is the current state", state.getState());
    /**
     * There is still the issue of getting the data to actually set to the firebase.
     */
    //set(myCollectionsRef, state.getState().myCollections);
    /**
     * As of now we are getting the payload manually, but what we would like to do is to get the data and then do some logic to parse it
     * And then persist only what we actually want to persist in firebase.'
     * So we realize that we need to know exactly which part of the persistence we actually need to persist.
     * This can be done via switch cases in the listener.
     */
    console.log("We are in saveToFibrease. Here is the new change:", payload);
    console.log("This is the ref", customRef);
    set(customRef, payload);  //instead of this
    //set(customRef, modelToPersistence(payload)) //We do this
    //}
}

//note that we might need a reducer for the state.ready, meaning that we dispatch an action that sets the store to ready.
//We might not need the state ready, we're not sure yet on how this works.

async function readFromFirebase(state, dispatchHook) {
    console.log("We are inside read from firebase", state);
    state.ready = false;

    const snapshot = await get(myBigRef);
    console.log("This is the snapshot", snapshot);
    console.log("This is the snapshot value", snapshot.val());
    return await persistenceToModel(snapshot.val(), dispatchHook);
    console.log("model.ready is TRUE now");
}

/* two params of connectToFireBase: current snapshot of db(state), dispatch function from ReactRoot.jsx(dispatchHook) . 
    The dispatchHook is required for readFromFirebase, which is inturn required for dispatching actions 
    in persistenceToModelForMyCollection and persistenceToModelForMyJournal 

*/

function connectToFirebase(state, dispatchHook) {
    console.log("inuti connecct", state.ready);

    readFromFirebase(state, dispatchHook).then(() => {
        //watchFunction(isChangedACB, sideEffectACB);
        //useEffect(whatHappensAfterChangeACB, [state.numberOfGuests, state.currentDishId, [...state.dishes]])
        console.log("We are her1e", state.getState());
        console.log("the ttttt", setCollectionsArray.type);

        listenerMiddleware.startListening({ //credit: Cristian Bogdan Stackblitz
            type: setCollectionsArray.type,
            effect(action, store) {
                console.log("There has been a change in the store:", action.payload);
                console.log("The change was: ", action.payload, "we now need to persist this change in db");
                console.log("This is the new state", store.getState());
                switch (action.type) {
                    case setCollectionsArray.type:
                        console.log("The action type was for the collectionsArray");
                        saveToFirebase(myCollectionsRef, action.payload);
                        break;
                    case setSearchQuery.type:
                        console.log("The action type was for the search query");
                        saveToFirebase(myBigRef, action.payload);
                        break;
                }
                //return saveToFirebase(/* Här kan vi även ge vilken path (alltså någon av myBigRef, alltså mycollectionsRef) den ska vara baserat på vilken case det är**/action.payload);

            }
        })
        /**
         * If we want to scale this and listen to other data in the store, we simply add another kind of "setCollectionsArray.type" in an array of type
         * Similarly, if we want to perform some actions based on what actually took place then we can use switch cases to match the action type.
         */
        dispatchHook(setCollectionsArray(testCollectionsArray));
    });
}


// Remember to uncomment the following line:
export { connectToFirebase, modelToPersistence, persistenceToModel, saveToFirebase, readFromFirebase }

