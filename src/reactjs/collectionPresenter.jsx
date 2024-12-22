import { TopbarCollectionView } from "../views/collectionViews/topbarCollectionView";
import { CollectionListview } from "../views/collectionViews/collectionListView";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { editCollectionDescription, setCollectionsArray, editCollectionTitle } from "../store/collectionsSlice";
import { updateCollectionsArrayField, updateSingleCollectionField, updateCollectionFields } from "../utilities";

export function CollectionPresenter() {
    console.log("----------ENTERING COLLECTION PRESENTER------------");
    //Vi övervakar endast singleCollectionsArray, men det är inte den som ändras i detta fall, utan det är den stora collectionSarray
    //När vi ändrar i decsription osv.
    const selectedCollection = useSelector((state) => state.myCollections.singleCollectionArray);
    const allCollections = useSelector((state) => state.myCollections.collectionsArray);

    console.log("selected Collection", selectedCollection);

    const dispatch = useDispatch();

    const [isEditing, setIsEditing] = useState(false);
    const [editedTitle, setEditedTitle] = useState(selectedCollection.collection_title);
    const [editedDescription, setEditedDescription] = useState(selectedCollection.collection_description);

    function toggleEditingACB() {
        console.log("About to toggle edit button");
        setIsEditing((prev) => !prev);
    }
    
    function handleEditDescriptionACB(description, id) {
        console.log("This is the new collection description:", description, " and this is the id: ", id);
        setEditedDescription(description);
    }

    
    function handleEditTitleACB(title, id) {
        console.log("This is the new collection title:", title, " and this is the id: ", id);
        setEditedTitle(title)
    }
    
    

    function handleSaveChangesACB() {
        console.log("Saving changes..");

        const updatedCollection = updateCollectionFields(selectedCollection, editedTitle, editedDescription);

        const updatedCollectionsArray = allCollections.map(collection =>
            collection.collection_id === selectedCollection.collection_id ? updatedCollection : collection);

        dispatch(editCollectionTitle(updatedCollection));
        dispatch(editCollectionDescription(updatedCollection));
        dispatch(setCollectionsArray(updatedCollectionsArray));

        setIsEditing(false);
    }

    function handleDeleteArtWorkACB() {
        //Some logic to filter the collections array
        //Then we dispatch the new array (that are all of the collections without the one we want to delete);
    }


    /**
     * Denna presenter använder sig av en array i store som fylls när man trycker på en collection i myCollectionsView (den andra view:n, inte för denna view:n).
     * Detta är dock lite problematiskt eftersom vi bara får åtkomst till värdet en gång, så fort det ändras,
     * men inte igen om vi laddar om sidan igen.
     */

    //Vi behöver något sätt att singulera ut vilken collection det är vi är intresserad av.
    //om jag kombinerar collectionPresenter och myCollectionsPresenter till EN ENDA presenter, då kan jag använda component state bättre?
    //Problemet nu är att 
    console.log("This is the selected collection in collectionPresenter", selectedCollection);

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
            onToggleEdit={toggleEditingACB}
            isEditing={isEditing}
            onEditDescription={handleEditDescriptionACB}
            onEditTitle={handleEditTitleACB}
            onSaveChanges={handleSaveChangesACB}
            ></TopbarCollectionView>
            <CollectionListview
            collection={selectedCollection}
            ></CollectionListview>
        </div>
    )
}

