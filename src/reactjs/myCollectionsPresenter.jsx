import { testingAnAPICallForMostSimilar } from "../apiCall";
import { TopbarCollectionsView } from "../views/homePageViews/myCollectionViews/topbarCollectionsView"
import { ListOfCollectionsView } from "../views/homePageViews/myCollectionViews/listOfCollectionsView";
import { useEffect, useState } from "react"

export function MyCollectionsPresenter(props) {



    //useEffect((testingAnAPICallForMostSimilar), []);

    const images= [ {
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
    ]
    console.log("The imagess!!!!", images);




    return(
        <div>
            <TopbarCollectionsView ></TopbarCollectionsView> 
            <ListOfCollectionsView images={images}> </ListOfCollectionsView>
        </div>
            

    )


}