import { firebaseConfig } from "/src/firebaseConfig.js";
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get, set } from "firebase/database";
import { setEntries,addEntry,removeEntry,editEntry,increaseLatestEntryID, setLatestEntryID } from "./store/journalsSlice";
import { setSearchQuery, setCollectionsArray, setCollection, editCollectionDescription, editCollectionTitle } from "./store/collectionsSlice";
import { setNewSearchParam, setCurrentArt } from "./store/searchResultSlice.js";
import { listenerMiddleware } from "./middleware.js";
import { getAuth, onAuthStateChanged} from "firebase/auth"
import { setUID, setProfilePicURL, setDisplayName } from "./store/userSlice.js";


import "./apiCall";
import "./utilities"
import { store } from "./index.jsx";


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

// Initialise firebase app, database, ref

const myCollectionsRef = ref(db, PATH + "/collections");
const myJournalsRef = ref(db, PATH + "/myJournals");
const singleCollectionRef = ref(db, PATH + "/singleCollection");
const searchParamRef = ref(db, PATH + "/searchParams");
const currentArtDetailsRef = ref(db, PATH + "/currentArtDetails");


/**
 * Necessary for reading from firebase and being able to derive data.
 */
/*set(myCollectionsRef, {
    collectionsArray: [
        {
            collectionId: 1,
            collectionTitle: "Japanese Art",
            collectionDescription: "art that accompanied Yukio Mishima's travesty..",
            artWorkIDs: [34, 12981, 129884]
        },
        {
            collectionId: 2,
            collectionTitle: "Impressionism.. oh",
            collectionDescription: "Long before death there was there was the Nile, and out of the Nile death sprung out.. blossomed and ready to kill... songs had not yet been invented, nor was love anywhere to be found.. only sickness.. Mefistofeles was simply not ready to accept Nazim Hikmet at this point in time, nor was Prague yet to be on a world map. The world was simply not ready..asdklj asd lkasjdkla  sdlkajskdj askldjalksd.. jaoksdjaisd osad... sdjaoidoiwoiausdoiu oiasjdkl kslkqw jelqwe... asdsadiooiqweu  yhej va dgl ryd le..laksdlsa dwq we asdlasd",
            artWorkIDs: [3123, 129885, 129887]
        },
        {
            collectionId: 3,
            collectionTitle: "On the outskirts of death",
            collectionDescription: "a collection of my father's art.",
            artWorkIDs: [129, 140, 145, 146, 153]
        }
    ]
})*/

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
//Det är samma version som det som läses från artWorkPromises, men denna är utan nulls osv.
const testCollectionsArray =

    [
        {
            collection_title: "Japanese Art",
            collection_description: "art that accompanied Yukio Mishima's travesty..",
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
            collection_title: "Impressionism.. oh",
            collection_description: "Long before death there was there was the Nile, and out of the Nile death sprung out.. blossomed and ready to kill... songs had not yet been invented, nor was love anywhere to be found.. only sickness.. Mefistofeles was simply not ready to accept Nazim Hikmet at this point in time, nor was Prague yet to be on a world map. The world was simply not ready..asdklj asd lkasjdkla  sdlkajskdj askldjalksd.. jaoksdjaisd osad... sdjaoidoiwoiausdoiu oiasjdkl kslkqw jelqwe... asdsadiooiqweu  yhej va dgl ryd le..laksdlsa dwq we asdlasd",
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


function modelToPersistenceForMyCollections(customRef,payload) {
    //const selectedCollections = useSelector(state => state.myCollections.collectionsArray);
    //console.log("THIS IS SELECTER", selectedCollections);
    //set(myCollectionsRef, selectedCollectionsArray1);
    console.log("This is the payload, or change that we need to persist in the db (inside modelToPersistenceForMyCollections)", payload);
    const newArray = payload.map(collection => ({
        collectionTitle: collection.collection_title,
        collectionId: collection.collection_id,
        collectionDescription: collection.collection_description || "",
        artWorkIDs: [...collection.artWorks].map(artWork => artWork.artWork_id),
    }));
    console.log("newArray:", newArray);
    set(customRef, { collectionsArray: newArray });
}

//Denna är endast till för reloading, eftersom denna fylls ju när vi trycker på den i hemsidan.
//Vi sparar den för att kunna hämta om den när vi laddar om sidan.
//Nu behöver vi implementera en persistenceToModel för denna.
function modelToPersistenceForSingleCollection(customRef,payload) {
    console.log("This is the payload, or change that we need to persist in the db (inside modelToPersistenceForSingleCollection)", payload);
    const newObject = {
        collectionTitle: payload.collection_title,
        collectionDescription: payload.collection_description || "",
        collectionId: payload.collection_id,
        artWorkIDs: payload.artWorks.map(artWork => artWork.artWork_id)
        };
    console.log("newObject:", newObject);
    set(customRef, { collectionArray: newObject });
}

function modelToPersistenceForSearchParams(customRef,payload) {
    console.log("this is the payload in MTP", payload);
    set(customRef, payload);
}

function modelToPersistenceForCurrentArtDetails(customRef,payload) {
    console.log("this is the payload in MTP for current art details", payload);
    set(customRef, payload);
}


function modelToPersistenceForMyJournals(customRef,payload) {
    set(customRef, payload);
}

/**
 * We need logic that iterates through the store's objects and gets the relevant parts that we need to store in the firebase.
 * So for example in the case below, in order to create an array of dishIDs we are mapping through the dishes array and returning only the IDs of each dish.
 * And then we persist only this data.
 * @param } model 
 * @returns 
 */
function modelToPersistence(customRef, payload, type) {
    console.log("inside model to persistence");
    console.log("This is the payload", payload, " and this is the type", type);
    console.log("This is the type:", type, " and this is the other type:", setCollectionsArray.type)

    if(type === setCollectionsArray.type) {
        console.log("vi är inuti if-check");
        console.log("This is the type", type);
        console.log("And this is the collectionsArray type", setCollectionsArray.type);
        //Vi är redo att persist
        modelToPersistenceForMyCollections(customRef,payload);
    }
    if(type === setCollection.type) {
        console.log("inside the type:", setCollection.type, " in the modelToPersistence if-check");
        modelToPersistenceForSingleCollection(customRef,payload);
    }
    if(type === editCollectionDescription.type) {
        console.log("inside the type:", editCollectionDescription.type, " in the modelToPersistence if-check");
        modelToPersistenceForSingleCollection(customRef,payload);
    }
    if(type === editCollectionTitle.type) {
        console.log("inside the type:", editCollectionTitle.type, " in the modelToPersistence if-check");
        modelToPersistenceForSingleCollection(customRef,payload);
    }
    if(type === setNewSearchParam.type) {
        console.log("inside the type:", setNewSearchParam.type, " in the modelToPersistence if-check");
        modelToPersistenceForSearchParams(customRef,payload);
    }
    if(type === setCurrentArt.type) {
        console.log("inside the type:", setCurrentArt.type, " in the modelToPersistence if-check");
        modelToPersistenceForCurrentArtDetails(customRef,payload);
    }
    if((type === addEntry.type) || (type === editEntry.type) || (type === removeEntry.type) || (type === increaseLatestEntryID.type)) {
        
        modelToPersistenceForMyJournals(customRef,payload)
    }
    
}

async function generateObjectsForCollections(collections) {
    const populatedCollections = await Promise.all(
        collections.collectionsArray.map(async (collection) => {
            console.log("This is a single collection123", collection);
            const resolvedArtWorks = await Promise.all(
                collection.artWorkIDs.map(async (id) => {
                    try {
                        const result = await getArtWorkByID(id);
                        console.log("this is result", result);
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
                collection_id: collection.collectionId,
                collection_title: collection.collectionTitle,
                collection_description: collection.collectionDescription,
                artWorks: resolvedArtWorks.filter((artwork) => artwork !== null),
            };
        })
    );
    return populatedCollections;
}

async function generateObjectForSingleCollection(collection) {
            console.log("This is a single collection in generateObjectForSingleCollection:", collection);
            const resolvedArtWorks = await Promise.all(
                collection.collectionArray.artWorkIDs.map(async (id) => {
                    try {
                        const result = await getArtWorkByID(id);
                        console.log("this is result", result);
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
                        return [];
                    }
                })
            );

            return {
                collection_id: collection.collectionArray.collectionId,
                collection_title: collection.collectionArray.collectionTitle,
                collection_description: collection.collectionArray.collectionDescription,
                artWorks: resolvedArtWorks.filter((artwork) => artwork !== null),
            };

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
    console.log("These are collections (from firebase) with the IDs we are going to search upon now", collections);
    const artWorkPromises = await generateObjectsForCollections(collections);
    console.log("These are the art works from the API call based on the artWorkIDs from firebase", artWorkPromises);
    /**
     * Perhaps we don't really want to return the artWorks, but instead we would like to persist this data in the store?
     * In that case, how should we do so?
     * Well we can say for sure that we need to persist it to the store, so we need to dispatch the collectionsArray action
     * with the artWorks array.
     * Let's try it out.
     */
    console.log("Now i am about to dispatch the artWorkPromises to the store", artWorkPromises);
    dispatchHook(setCollectionsArray(artWorkPromises)); //Det funkar!
    return artWorkPromises;
}

async function persistenceToModelForSingleCollection(collection, dispatchHook) {
    console.log("This is a single collection (from firebase) with the IDs we are going to search upon now", collection);
    if (!collection || !collection.collectionArray.artWorkIDs || collection.collectionArray.artWorkIDs.length === 0) {
        return {
        };
    }
    else {
        console.log("we are in else");
        const artWorkPromises = await generateObjectForSingleCollection(collection);
        console.log("Just got back the data: ", artWorkPromises);
        console.log("Now i am about to dispatch the single collection to the store", artWorkPromises);
        dispatchHook(setCollection(artWorkPromises));
        return artWorkPromises;
    }



    

}


function persistenceToModelForMyJournals(journalEntries, dispatchHook) {
    console.log("These are the journal entries in persistenceToModelForMyJournals", journalEntries);
    dispatchHook(setLatestEntryID(journalEntries.latestEntryID))
    dispatchHook(setEntries(journalEntries.entries));
}

function persistenceToModelForSearchParams(searchParams, dispatchHook){
    console.log("These are the search params when reading from firebase", searchParams);
    dispatchHook(setNewSearchParam(searchParams));
}

function persistenceToModelForCurrentArtDetails(currentArtDetails, dispatchHook) {
    console.log("These are the current art details when reading from firebase", currentArtDetails);
    dispatchHook(setCurrentArt(currentArtDetails));
}



async function persistenceToModel(firebaseData, dispatchHook) { // we get the snapshot and call the relevant
    console.log("This is firebaseData:", firebaseData);
    persistenceToModelForMyJournals(firebaseData.myJournals, dispatchHook);
    persistenceToModelForSearchParams(firebaseData.search.params, dispatchHook);
    persistenceToModelForCurrentArtDetails(firebaseData.search.currentArt, dispatchHook);
    const [result, result2] = await Promise.all([
        persistenceToModelForMyCollection(firebaseData.collections, dispatchHook),
        persistenceToModelForSingleCollection(firebaseData.collections.singleCollection, dispatchHook)
    ]);
    //Insert a new persistenceToModelForSingleCollection(firebaseData.singleCollection, dispatchHook);
    return { result, result2 };     /**
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


function saveToFirebase(customRef, payload, type) {
    console.log("Vad har vi här", type);
    console.log("We are in saveToFibrease. Here is the new change:", payload);
    console.log("This is the ref", customRef);
    
    modelToPersistence(customRef, payload, type)
}

//note that we might need a reducer for the state.ready, meaning that we dispatch an action that sets the store to ready.
//We might not need the state ready, we're not sure yet on how this works.

async function readFromFirebase(dispatchHook) {

            const state = store.getState();
            const userUID = state.user.uid;

            console.log("State is:", state)

            const userRef = ref(db, `${PATH}/${userUID}`)
            
            get(userRef).then((snapshot) => 
                {   console.log("this snapshot val before passing to PTM:", snapshot.val())
                    persistenceToModel(snapshot.val(), dispatchHook)});            
}

/* two params of connectToFireBase: current snapshot of db(state), dispatch function from ReactRoot.jsx(dispatchHook) . 
    The dispatchHook is required for readFromFirebase, which is inturn required for dispatching actions 
    in persistenceToModelForMyCollection and persistenceToModelForMyJournal 

*/





function connectToFirebase(dispatchHook) {

    function loginOrOutACB(user){
    
        dispatchHook(setUID(user.uid))
        dispatchHook(setProfilePicURL(user.photoURL))
        dispatchHook(setDisplayName(user.displayName))
        const userIDString = "user "+(user?" ID "+user.uid:user);
        console.log(userIDString)
        
      }
        
        console.log(auth)
        const authPromise = new Promise((resolve) => { 
            onAuthStateChanged(auth, (user) => {
                loginOrOutACB(user);
                resolve(); // Resolve the promise after loginOrOutACB has been executed fully
            });
        });

        //ensure that the all the code in the loginOrOutACB has finished executing before readFromFirebase is executed
        authPromise.then( 
            () => readFromFirebase(dispatchHook).then(
                () => {
        
        console.log("We are her1e", store.getState());

        const userPath = `${PATH}/${store.getState().user.uid}`  
        
        //adding listeners for specific changes in state of the store, 
        //not using store.subcribe() as it would trigger on each change in the store's state

        
        listenerMiddleware.startListening({
            type: setCollectionsArray.type,
            effect(action, store) {
              console.log("Action triggered: setCollectionsArray", action.payload);
              console.log("This is the new state", store.getState());
              const userCollectionsRef = ref(db, `${userPath}/collections`)
              saveToFirebase(userCollectionsRef, action.payload, action.type);
            },
          });
          
          listenerMiddleware.startListening({
            type: setSearchQuery.type,
            effect(action, store) {
              console.log("Action triggered: setSearchQuery", action.payload)
              console.log("This is the new state", store.getState());
              const userSearchQueryRef = ref(db, `${userPath}/search/query`)
              saveToFirebase(userSearchQueryRef, action.payload, action.type);
            },
          });
          
          listenerMiddleware.startListening({
            type: setCollection.type,
            effect(action, store) {
              console.log("Action triggered!: setCollection", action.payload);
              console.log("Action data: ", action.payload);
              console.log("This is the new state", store.getState());
              const userSingleCollectionsRef = ref(db, `${userPath}/collections/singleCollection`)
              saveToFirebase(userSingleCollectionsRef, action.payload, action.type);
            },
          });

          listenerMiddleware.startListening({
            type: editCollectionDescription.type,
            effect(action, store) {
              console.log("Action triggered!!!: editCollectionDescription", action.payload);
              console.log("Action data: ", action.payload);
              console.log("This is the new state", store.getState());
              const userSingleCollectionsRef = ref(db, `${userPath}/collections/singleCollection`)
              saveToFirebase(userSingleCollectionsRef, action.payload, action.type);

              const updatedCollectionsArray = store.getState().myCollections.collectionsArray;
              console.log("we are inside editCollectionDescription listener and we have read the collectionsARRAY", updatedCollectionsArray);

              //dispatchHook(setCollectionsArray(updatedCollectionsArray));
            },
          });
          listenerMiddleware.startListening({
            type: editCollectionTitle.type,
            effect(action, store) {
              console.log("Action triggered!!!!: editCollectionTitle", action.payload);
              console.log("Action data: ", action.payload);
              console.log("This is the new state", store.getState());
              const userSingleCollectionsRef = ref(db, `${userPath}/collections/singleCollection`)
              saveToFirebase(userSingleCollectionsRef, action.payload, action.type);

              const updatedCollectionsArray = store.getState().myCollections.collectionsArray;
              console.log("we are inside editCollectionDescription listener and we have read the collectionsARRAY", updatedCollectionsArray);

              //dispatchHook(setCollectionsArray(updatedCollectionsArray));
            },
          });

          listenerMiddleware.startListening({
            type: setNewSearchParam.type,
            effect(action, store) {
              console.log("action for set new search param triggered!: setNewSearchParam", action.payload);
              console.log("Action data: ", action.payload);
              console.log("This is the new state", store.getState());
              const userSearchParamRef = ref(db, `${userPath}/search/param`)
              saveToFirebase(userSearchParamRef, action.payload, action.type);

              const updatedCollectionsArray = store.getState().myCollections.collectionsArray;
              console.log("we are inside editCollectionDescription listener and we have read the collectionsARRAY", updatedCollectionsArray);

              //dispatchHook(setCollectionsArray(updatedCollectionsArray));
            },
          });

          listenerMiddleware.startListening({
            type: setCurrentArt.type,
            effect(action, store) {
              console.log("action for set current art triggered!: setCurrentArt", action.payload);
              console.log("Action data: ", action.payload);
              console.log("This is the new state", store.getState());
              const userSearchCurrentArtRef = ref(db, `${userPath}/search/currentArt`)
             saveToFirebase(userSearchCurrentArtRef, action.payload, action.type);

              const updatedCollectionsArray = store.getState().myCollections.collectionsArray;
              console.log("we are inside editCollectionDescription listener and we have read the collectionsARRAY", updatedCollectionsArray);

              //dispatchHook(setCollectionsArray(updatedCollectionsArray));
            },
          });
 
        listenerMiddleware.startListening({ //credit: Cristian Bogdan Stackblitz
            type: addEntry.type,
            effect(action) {
               
                    const userJournalsRef = ref(db, `${userPath}/myJournals/entries`)
                    saveToFirebase(userJournalsRef, store.getState().myJournals.entries,action.type);
                            
            }
        });

        listenerMiddleware.startListening({ //credit: Cristian Bogdan Stackblitz
            type: removeEntry.type,
            effect(action) {
               
                    const userJournalsRef = ref(db, `${userPath}/myJournals/entries`)
                    saveToFirebase(userJournalsRef, store.getState().myJournals.entries,action.type);
                            
            }
        });

        listenerMiddleware.startListening({ //credit: Cristian Bogdan Stackblitz
            type: editEntry.type,
            effect(action) {
               
                    const userJournalsRef = ref(db, `${userPath}/myJournals/entries`)
                    saveToFirebase(userJournalsRef, store.getState().myJournals.entries,action.type);
                            
            }
        })

        listenerMiddleware.startListening({ //credit: Cristian Bogdan Stackblitz
            type: increaseLatestEntryID.type,
            effect(action) {
               
                    const userJournalsLatestIDRef = ref(db, `${userPath}/myJournals/latestEntryID`)
                    saveToFirebase(userJournalsLatestIDRef, store.getState().myJournals.latestEntryID,action.type);
                            
            }
        })

        /**
         * If we want to scale this and listen to other data in the store, we simply add another kind of "setCollectionsArray.type" in an array of type
         * Similarly, if we want to perform some actions based on what actually took place then we can use switch cases to match the action type.
         */

        //A tester to trigger the listener to react and save to firebase. 
        //console.log("About to dispatch static array to store to trigger listener: This is the array im dispatching", testCollectionsArray);
        //dispatchHook(setCollectionsArray(testCollectionsArray));
    }));
}


// Remember to uncomment the following line:
export { connectToFirebase, modelToPersistence, persistenceToModel, saveToFirebase, readFromFirebase }

