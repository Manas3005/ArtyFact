import { testingAnAPICallForMostSimilar } from "../apiCall";
import { TopbarCollectionsView } from "../views/homePageViews/myCollectionViews/topbarCollectionsView"
import { ListOfCollectionsView } from "../views/homePageViews/myCollectionViews/listOfCollectionsView";
import { useEffect, useState } from "react"
import { selectCollectionsArray, setCollectionsArray } from "../store/collectionsSlice";
import { useSelector } from "react-redux";

export function MyCollectionsPresenter(props) {
    
    const selectedCollectionsArray = useSelector(selectCollectionsArray);
    console.log("This is the selected collections array", selectedCollectionsArray)

    
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {   
        const interval = setInterval(() => {
            setActiveIndex((prevIndex) => (prevIndex + 1) % 2);
        }, 6000); 

        return () => clearInterval(interval); 
    }, [selectedCollectionsArray]);

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


        /**
         * Det vi kan börja med är att försöka se till så att när vi hämtar vår data, att vi sätter den i application state.
         * Och det ska ske efter vi renderat sidan och dess data.
         * Det vi vill göra här är att vi gör någon logik som kan filtrera ut en viss del av denna data.
         */

        function handleSearchACB() {
           
        }

        function setCollectionACB(evt) {
            dispatch(setCollectionsArray(evt.target.value));
        }

        /**
         * Tänk att vi har fetchat vår data ifrån API:n och vi skickar ned det som prop till view.
         * Och sedan vill view göra en search, det som händer då att den firar ett custom event
         */




    return(
        <div>
            <TopbarCollectionsView ></TopbarCollectionsView> 
            <ListOfCollectionsView 
            activeIndex={activeIndex}
            collections={collections}
            setCollection={setCollectionACB} 
            setSearch={handleSearchACB}
            
            />
        </div>
            

    )


} 