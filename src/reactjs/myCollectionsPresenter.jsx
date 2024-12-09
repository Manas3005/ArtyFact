import { testingAnAPICallForMostSimilar } from "../apiCall";
import { TopbarCollectionsView } from "../views/homePageViews/myCollectionViews/topbarCollectionsView"
import { ListOfCollectionsView } from "../views/homePageViews/myCollectionViews/listOfCollectionsView";
import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux";
import { setCollectionsArray } from "../store/collectionsSlice";

export function MyCollectionsPresenter(props) {
    const dispatch = useDispatch();
    
    const [activeIndex, setActiveIndex] = useState(0);
    const [filteredCollections, setFilteredCollections] = useState(null);
    const [clearButton, setClearButton] = useState(false);

    const collections = [
        {
            title: "Surrealism",
            images: [
                '/image/miyazaki.png',
                '/image/paris.jpg',
                '/image/artdeschomepage.png',
            ],
        },
        {
            title: "Collection 2",
            images: [
                '/image/artdeschomepage.png',
                '/image/paris.jpg',
                '/image/miyazaki.png',
            ]
        },
        {
            title: "Absurdities..",
            images: [
                '/image/CalfsHead.jpg',
                '/image/TheLoire.jpg',
                '/image/TheSeine.png',
            ]
        },
        {
            title: "Collection 4",
            images: [
                '/image/EdouardManet.jpg',
                '/image/EntranceToThePort.jpg',
                '/image/StreetInMoret.jpg',
            ]
        },
        {
            title: "Collection 5",
            images: [
                '/image/CalfsHead.jpg',
                '/image/TheLoire.jpg',
                '/image/TheSeine.png',
            ]
        },
        {
            title: "Collection 6",
            images: [
                '/image/CalfsHead.jpg',
                '/image/TheLoire.jpg',
                '/image/TheSeine.png',
            ]
        },
        {
            title: "Collection 7",
            images: [
                '/image/CalfsHead.jpg',
                '/image/TheLoire.jpg',
                '/image/TheSeine.png',
            ]
        },
        {
            title: "Collection 8",
            images: [
                '/image/CalfsHead.jpg',
                '/image/TheLoire.jpg',
                '/image/TheSeine.png',
            ]
        }
    ]
    
    useEffect(() => {
        console.log("This is the useEffect", collections);
        dispatch(setCollectionsArray(collections));
        console.log("The array in store after dispatch", selectedCollectionsArray);
    }, []);

    const selectedCollectionsArray = useSelector((state) => state.myCollections.collectionsArray);
    console.log("The selected collecitons array", selectedCollectionsArray);



    useEffect(() => {   
        const interval = setInterval(() => {
            setActiveIndex((prevIndex) => (prevIndex + 1) % 2);
        }, 6000); 

        return () => clearInterval(interval); 
    }, [selectedCollectionsArray]);

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

        function 
        handleSearchACB(value) {
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
        function setCollectionACB(evt) {yy
            console.log("This is the event in setCollectionACB", evt);
            dispatch(setCollectionsArray(evt.target.value));
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

    /*const images= [ {
            image: '/image/miyazaki.png',
            title: "Miyazaki In Japan",
        },
        {
            image: '/image/artdeschomepage.png',
            title: 'Unknown',
        },
        {
            image: '/image/luigiloir.png',
            title: 'Boulevard Saint'
        },
        {
            image: '/image/paris.jpg',
            title: 'Paris Street'
        }
    ]*/

        function setClearButtonACB(value) {
            console.log("Just pressed X button");
            setClearButton(value);
        }

    return(
        <div>
            <TopbarCollectionsView
            setSearch={handleSearchACB}
            clearButton={clearButton}
            setClearButton={setClearButtonACB}
            />
            <ListOfCollectionsView 
            activeIndex={activeIndex}
            collections={filteredCollections || collections}
            setCollection={setCollectionACB}
            />

        </div>
            

    )


} 