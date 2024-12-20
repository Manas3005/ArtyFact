import { TopbarCollectionView } from "../views/collectionViews/topbarCollectionView";
import { CollectionListview } from "../views/collectionViews/collectionListView";
import { useSelector } from "react-redux";

export function CollectionPresenter() {

    /**
     * Denna presenter använder sig av en array i store som fylls när man trycker på en collection i myCollectionsView (den andra view:n, inte för denna view:n).
     */
    const selectedCollection = useSelector((state) => state.myCollections.singleCollectionArray);
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
            collection={selectedCollection}
            ></TopbarCollectionView>
            <CollectionListview
            collection={selectedCollection}
            ></CollectionListview>
        </div>


    )
}