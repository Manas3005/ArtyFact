import { TopbarMyCollectionsView } from "../views/myCollectionViews/topbarMyCollectionsView"
import { ListOfCollectionsView } from "/src/views/myCollectionViews/listOfCollectionsView";
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux";
import { setCollectionsArray, setCollection } from "../store/collectionsSlice";
import { increaseLatestEntryID } from "../store/journalsSlice";
import { v4 as uuidv4 } from 'uuid';


export function MyCollectionsPresenter(props) {
    const dispatch = useDispatch();
    
    const [activeIndex, setActiveIndex] = useState(0);
    const [filteredCollections, setFilteredCollections] = useState(null);
    const [clearButton, setClearButton] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const collections = [
        {
            title: "Japanese Art",
            images: [
                'https://i.imgur.com/4MWnofa.jpeg',
                'https://i.imgur.com/pzHx8kg.jpeg',
                'https://i.imgur.com/6APpUgV.jpeg',
            ],
        },
        {
            title: "Impressionism... oh",
            images: [
                'https://i.imgur.com/nsBGeNZ.jpeg',
                'https://i.imgur.com/qrycgCT.jpeg',
                'https://i.imgur.com/HsSDEwa.jpeg',
            ]
        },
        {
            title: "Gustave Caillebotte..",
            images: [
                'https://i.imgur.com/3ShRSaq.jpeg',
                'https://i.imgur.com/YLqzq73.jpeg',
                'https://i.imgur.com/TsygFcL.jpeg',
            ]
        },
        {
            title: "are you coming home soon dear?",
            images: [
                'https://i.imgur.com/dAy5xeF.jpeg',
                'https://i.imgur.com/U9sQ5eE.jpeg',
                'https://i.imgur.com/T58LnpG.jpeg',
            ]
        },
        {
            title: "Collection 5",
            images: [
                'https://i.imgur.com/AyszSmi.jpeg',
                'https://i.imgur.com/JpfMWE3.jpeg',
                'https://i.imgur.com/6xIuGyG.jpeg',
            ]
        },
        {
            title: "Collection 6",
            images: [
                'https://i.imgur.com/WdLAx8y.jpeg',
                'https://i.imgur.com/sURNEFc.jpeg',
                'https://i.imgur.com/HsSDEwa.jpeg',
            ]
        },
        {
            title: "Collection 7",
            images: [
                'https://i.imgur.com/IMoyBfZ.jpeg',
                'https://i.imgur.com/NWXkwWK.jpeg',
                'https://i.imgur.com/CNFcZQu.jpeg',
            ]
        },
        {
            title: "what are these streets?",
            images: [
                'https://i.imgur.com/lqYOlkP.jpeg',
                'https://i.imgur.com/5PAjcHE.jpeg',
                'https://i.imgur.com/pJOfSc3.jpeg',
            ]
        }
    ]
    
    const collectionsForTest = [
        {
            title: "Japanese Art",
            artWorks: [
                {
                    title: "Lilly flowers",
                    year: "1341-2341",
                    artistName: "Vincent Van Gogh",
                    image: 'https://i.imgur.com/4MWnofa.jpeg',
                },
                {
                    title: "Saturday",
                    year: "1341",
                    artistName: "Vincent",
                    image: 'https://i.imgur.com/pzHx8kg.jpeg',
                },
                {
                    title: "Monday",
                    year: "1321",
                    artistName: "Heyy",
                    image: 'https://i.imgur.com/6APpUgV.jpeg',
                },
            ],
        },
        {
            title: "Impressionism... oh",
            artWorks: [
                {
                    title: "Artwork 1",
                    year: "Unknown",
                    artistName: "Unknown",
                    image: 'https://i.imgur.com/nsBGeNZ.jpeg',
                },
                {
                    title: "Artwork 2",
                    year: "Unknown",
                    artistName: "Unknown",
                    image: 'https://i.imgur.com/qrycgCT.jpeg',
                },
                {
                    title: "Artwork 3",
                    year: "Unknown",
                    artistName: "Unknown",
                    image: 'https://i.imgur.com/HsSDEwa.jpeg',
                },
            ],
        },
        {
            title: "Gustave Caillebotte..",
            artWorks: [
                {
                    title: "Artwork 1",
                    year: "Unknown",
                    artistName: "Unknown",
                    image: 'https://i.imgur.com/3ShRSaq.jpeg',
                },
                {
                    title: "Artwork 2",
                    year: "Unknown",
                    artistName: "Unknown",
                    image: 'https://i.imgur.com/YLqzq73.jpeg',
                },
                {
                    title: "Artwork 3",
                    year: "Unknown",
                    artistName: "Unknown",
                    image: 'https://i.imgur.com/TsygFcL.jpeg',
                },
            ],
        },
        {
            title: "are you coming home soon dear?",
            artWorks: [
                {
                    title: "Artwork 1",
                    year: "Unknown",
                    artistName: "Unknown",
                    image: 'https://i.imgur.com/dAy5xeF.jpeg',
                },
                {
                    title: "Artwork 2",
                    year: "Unknown",
                    artistName: "Unknown",
                    image: 'https://i.imgur.com/U9sQ5eE.jpeg',
                },
                {
                    title: "Artwork 3",
                    year: "Unknown",
                    artistName: "Unknown",
                    image: 'https://i.imgur.com/T58LnpG.jpeg',
                },
            ],
        },
        {
            title: "Collection 5",
            artWorks: [
                {
                    title: "Artwork 1",
                    year: "Unknown",
                    artistName: "Unknown",
                    image: 'https://i.imgur.com/AyszSmi.jpeg',
                },
                {
                    title: "Artwork 2",
                    year: "Unknown",
                    artistName: "Unknown",
                    image: 'https://i.imgur.com/JpfMWE3.jpeg',
                },
                {
                    title: "Artwork 3",
                    year: "Unknown",
                    artistName: "Unknown",
                    image: 'https://i.imgur.com/6xIuGyG.jpeg',
                },
            ],
        },
        {
            title: "Collection 6",
            artWorks: [
                {
                    title: "Artwork 1",
                    year: "Unknown",
                    artistName: "Unknown",
                    image: 'https://i.imgur.com/WdLAx8y.jpeg',
                },
                {
                    title: "Artwork 2",
                    year: "Unknown",
                    artistName: "Unknown",
                    image: 'https://i.imgur.com/sURNEFc.jpeg',
                },
                {
                    title: "Artwork 3",
                    year: "Unknown",
                    artistName: "Unknown",
                    image: 'https://i.imgur.com/HsSDEwa.jpeg',
                },
            ],
        },
        {
            title: "Collection 7",
            artWorks: [
                {
                    title: "Artwork 1",
                    year: "Unknown",
                    artistName: "Unknown",
                    image: 'https://i.imgur.com/IMoyBfZ.jpeg',
                },
                {
                    title: "Artwork 2",
                    year: "Unknown",
                    artistName: "Unknown",
                    image: 'https://i.imgur.com/NWXkwWK.jpeg',
                },
                {
                    title: "Artwork 3",
                    year: "Unknown",
                    artistName: "Unknown",
                    image: 'https://i.imgur.com/CNFcZQu.jpeg',
                },
            ],
        },
        {
            title: "what are these streets?",
            artWorks: [
                {
                    title: "Artwork 1",
                    year: "Unknown",
                    artistName: "Unknown",
                    image: 'https://i.imgur.com/lqYOlkP.jpeg',
                },
                {
                    title: "Artwork 2",
                    year: "Unknown",
                    artistName: "Unknown",
                    image: 'https://i.imgur.com/5PAjcHE.jpeg',
                },
                {
                    title: "Artwork 3",
                    year: "Unknown",
                    artistName: "Unknown",
                    image: 'https://i.imgur.com/pJOfSc3.jpeg',
                },
            ],
        },
    ];


    /**
     * Denna ska tas bort senare. Vi kommer fetcha denna data från firebase när en user loggar in.
     * 
     * 
     * Denna useEffect är endast för att se att vår collections array fylls i store korrekt, men det den egentligen gör nu
     * är att den sätter hela arrayen direkt in i store.
     * Det vi vill göra senare är att låta reducern setCollectionsArray spreada gamla datan och fylla med senaste artwork.
     * Den ska inte alltså vara en "setCollectionsArray" utan mer lik en "addArtworkToCollection"
     */
    /*useEffect(() => {
        console.log("This is the useEffect", collections);
        dispatch(setCollectionsArray(collections));
        console.log("The array in store after dispatch", selectedCollectionsArray);
    }, []);*/

    const selectedCollectionsArray = useSelector((state) => state.myCollections.collectionsArray);
    console.log("The selected collecitons array (read in myCollectionsPresenter)", selectedCollectionsArray);



    useEffect(() => {   
        const interval = setInterval(() => {
            setActiveIndex((prevIndex) => (prevIndex + 1) % 3);
        }, 6000); 

        return () => clearInterval(interval); 
    }, []);

    /**
     * Det vi har gjort hitills:
     * 1) Vi har gjort sådana att man kan söka och att det kommer till search bar, 
     * men vi har inte gjort någon logik för att filtrera ut något.
     * 
     * 2) Vi har gjort sådana att man kan fylla in datan in i application state.
     * Men är det allt?
     * 
     * Det jag behöver göra nu är att implementera filtereringsfunktionen.
     */


    

        /**
         * Det vi kan börja med är att försöka se till så att när vi hämtar vår data, att vi sätter den i application state.
         * Och det ska ske efter vi renderat sidan och dess data.
         * Det vi vill göra här är att vi gör någon logik som kan filtrera ut en viss del av denna data.
         * Vi kan tänka oss att vi sparar endast en viss data i collections array.
         * Syftet med collections array är att den ska innehålla alla artworks osv
         * 
         * Jag kanske inte behöver att använda setSearchQuery i application state, utan eftersom jag redan har array:en från application
         * state kan jag applicera min logik som filtrerar ut den.
         * 
         * Vi kan testa att populera collectionsArray först när vi renderar hemsidan.
         * 
         * Idé: Lägg till en kryssknapp som clearar searchbar helt och hållet.
         * Denna knapp ska endast visas när vi har text i searchbar, och ska försvinna annars.
         * Så det är en conditional rendering på X-knappen.
         */

        function handleSearchACB(value) {
            //Här inne skall vi ha logik som filtrerar
            //Men det är viktigt att vi har senaste datan från application state, och jag tror vi har det.
            console.log("This", selectedCollectionsArray)
            console.log("This is the value", value);
            if(!value.trim()) {
                setClearButton(false);
                setFilteredCollections(null);
            }else {
                const soughtCollection = filterCollections(value);
                setFilteredCollections(soughtCollection);
                setClearButton(true);
            }
        }

        /**
         * I denna funktion vill vi filtrera collections baserat på ifall de matchar namnet på collection.
         * Vad behöver vi då?
         * Vi kan tänka oss vilja ha collectionsArray först, men det får vi med vår selector.
         * Sedan vill vi gå igenom array:en och filtrera de som inte stämmer överens med namnet
         * Men hur ska vi göra med rendering då?
         * Ska vi ha conditional rendering, där vi skickar samma prop, men med oika värden baserat på vilket stadie vi är i?
         */
        function filterCollections(searchText) {
            console.log("Filtering collections:", searchText);
            return selectedCollectionsArray.filter((collection) =>
                collection.title.toLowerCase().includes(searchText.toLowerCase())
            );
        }
        
        /**
         * Denna funktion ska anropas när vi fått in vår data och renderar sidan, då vill vi spara collection in i .
         * 
         * Men borde inte detta vara mer kopplat till firebase än något som har med input från view att göra?
         * 
         * @param {*} evt 
         */
        function setCollectionsListACB(evt) {
            console.log("This is the event in setCollectionsListACB", evt);
            dispatch(setCollectionsArray(evt.target.value));
        }

        /**
         * Denna funktion är till för att vi ska veta vilken collection det är som collection-sidan ska rendera.
         * Vi fyller 
         * @param {*} evt 
         */
        function setCollectionArrayACB(collection) {
            console.log("this is the collection given to the setter", collection);
            console.log("We will now try to see if we still have access to the collections", selectedCollectionsArray);
            /**
             * Vi ser här att vi gör en dispatch till store, där vi sätter den collection vi vill visa i vår nya sida,
             * men vi vet att det inte går så bra när vi refreshar sidan.
             * Finns det något annat alternativ för att ge 
             * 
             */
            dispatch(setCollection(collection));
        }

        /**
         * Tänk att vi har fetchat vår data ifrån API:n och vi skickar ned det som prop till view.
         * Och sedan vill view göra en search, det som händer då att den firar ett custom event
         */
        



    /**
     * Vi vill fetcha från firebase någon gång i framtiden när vi kommer dit.
     * 
     * Just nu, det vi vill göra är att vi vill fetcha alla collections för en användare och visa de på sidan.
     * Det vi gör då är att vi populerar collectionsArray för den användaren i application state m.h.a en reducer.
     * Därefter vill vi kunna filtrera ut dessa collections baserat på en searchQuery (som vi ockås populerar i application state).
     * För att hämta det senaste datat från application state använder vi en useSelector.
     * Så der vi behöver göra är att vår search input ska i view trigga en custom event firing till Presenter
     * som baserat på vad som finns i searchQuery gör en filtrering av collectionsArray
     * 
     * 
     * Tänk på en background image.
     * 
     * Jag ska implementera 
     */


    //useEffect((testingAnAPICallForMostSimilar), []);

        function setClearButtonACB(value) {
            console.log("Just pressed X button");
            setClearButton(value);
        }

        function handleCreateCollectionACB() {
            console.log("About to create the collection");
            console.log("The title is:", title, " and the description is: ", description);
            console.log("about to convert to int");
            const uuid = uuidv4();
            const strippedUUID = uuid.replace(/-/g, ''); 
            if(!selectedCollectionsArray){
                const obj = {
                    collection_title: title,
                    collection_description: description,
                    collection_id: strippedUUID,
                    artWorks: [],
                };
                dispatch(setCollectionsArray(obj));
            }
            else{
            const obj = [...selectedCollectionsArray,
                {
                    collection_title: title,
                    collection_description: description,
                    collection_id: strippedUUID,
                    artWorks: [],
                }
            ]
            dispatch(setCollectionsArray(obj));
        }
            console.log("the NEW OBJ", obj);
            dispatch(setCollectionsArray(obj));
        }



    return(
        <div>
            <TopbarMyCollectionsView
            setSearch={handleSearchACB}
            clearButton={clearButton}
            setClearButton={setClearButtonACB}
            setTitle={setTitle}
            title={title}
            setDescription={setDescription}
            description={description}
            onCreateCollection={handleCreateCollectionACB}
            />
            <ListOfCollectionsView 
            activeIndex={activeIndex}
            collections={filteredCollections || selectedCollectionsArray}
            setCollections={setCollectionsListACB}
            setCollection={setCollectionArrayACB}
            />

        </div>
            

    )


} 