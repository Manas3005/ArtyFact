import { testingAnAPICallForMostSimilar } from "../apiCall";
import { TopbarCollectionsView } from "../views/homePageViews/myCollectionViews/topbarCollectionsView"
import { ListOfCollectionsView } from "../views/homePageViews/myCollectionViews/listOfCollectionsView";
import { useEffect, useState } from "react"

export function MyCollectionsPresenter(props) {



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





    return(
        <div>
            <TopbarCollectionsView ></TopbarCollectionsView> 
            <ListOfCollectionsView collections={collections} />
        </div>
            

    )


}