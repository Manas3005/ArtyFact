import { TopbarCollectionView } from "../views/collectionViews/topbarCollectionView";
import { CollectionListview } from "../views/collectionViews/collectionListView";
import { useSelector } from "react-redux";
import { useState } from "react";

export function CollectionPresenter() {

    /**
     * Denna presenter använder sig av en array i store som fylls när man trycker på en collection i myCollectionsView (den andra view:n, inte för denna view:n).
     * Detta är dock lite problematiskt eftersom vi bara får åtkomst till värdet en gång, så fort det ändras,
     * men inte igen om vi laddar om sidan igen.
     */
    const [currentCollection, setCurrentCollection] = useState(null);
    const selectedCollection = useSelector((state) => state.myCollections.singleCollectionArray);
    if(selectedCollection !== currentCollection) {
        setCurrentCollection(selectedCollection);
    }
    console.log("The collection has been set to", currentCollection);
    //Vi behöver något sätt att singulera ut vilken collection det är vi är intresserad av.
    //om jag kombinerar collectionPresenter och myCollectionsPresenter till EN ENDA presenter, då kan jag använda component state bättre?
    //Problemet nu är att 
    console.log("This is the selected collection", selectedCollection);

    if(!selectedCollection ||selectedCollection.length === 0) {
        return (
            <div>
                <TopbarCollectionView></TopbarCollectionView>
                <p>No collection found!</p>
            </div>
        )
    }

    return (

        <div>
            <TopbarCollectionView
            collection={currentCollection}
            ></TopbarCollectionView>
            <CollectionListview
            collection={currentCollection}
            ></CollectionListview>
        </div>


    )
}