import { TopbarCollectionView } from "../views/collectionViews/topbarCollectionView";
import { CollectionListview } from "../views/collectionViews/collectionListView";
import { useSelector } from "react-redux";

export function CollectionPresenter() {

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