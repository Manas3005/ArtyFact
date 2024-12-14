import { TopbarCollectionView } from "../views/collectionViews/topbarCollectionView";
import { CollectionListview } from "../views/collectionViews/collectionListView";


export function CollectionPresenter() {


    return (

        <div>
            <TopbarCollectionView>
            </TopbarCollectionView>
            <CollectionListview></CollectionListview>
        </div>


    )
}