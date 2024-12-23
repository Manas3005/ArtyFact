import { useSelector } from "react-redux";
import "/src/css/collectionStyle.css"
import { FaTrash } from "react-icons/fa";



export function CollectionListview(props) {
    
    console.log("This is the props in collection page", props);

    if(!props.collection || props.collection.length === 0) {
        return (
            <div>
                <p>No collection found!</p>
            </div>
        )
    }

    //Det jag får in är en collection från presenter då antar jag.
    /**
     * Det vi vill göra är att, baserat på vilken collection vi trycker på i myCollections, 
     * så ska den skickas till collection.
     * Det vi kan göra är att, vi har en application state som håller reda på vilken collection vi har tryckt på i myCollections.
     * Det vi gör då är att när vi renderar denna app, så kan vi läsa från application state vilken collection det var som fylldes
     * i den delen av application state.
     * Alltså det som kommer hända är att varje tryckning i myCollections (på en collection) kommer fylla en array i application state
     * som är det senaste collection man tryckt på.
     * I presenter för vår collectionViews så använder vi en selector för att läsa det senaste värdet från denna array och skickar
     * den ned som prop till view.
     * Detta bör funka.
     */

    /**
     * Vi har ett problem. Just nu har varje collection item.
     * Vi vill array-rendera title, year, artistName.
     * 
     * @returns Vi ska rendera varje del av en collection
     * 
     * collection: {
     *      title: "Collection 1"
     *      artWorks: [
     *              {
     *                 title: "Sunday",
     *                 image: ".....adoijqoie"
     *                 year: "1953",
     *                 artistName: "Vincent Van Gogh"  
     *              },
     *              
     *              ]
     * 
     * }
     * 
     */
    
    function handleDeleteArtworkACB(artWork_id, collection_id) {
        // This function will be called when the trashcan button is clicked
        console.log("Delete artwork with ID:", artWork_id);
        // Add the logic to delete the artwork, likely dispatching an action or calling a prop function
        props.onDeleteArtWork(artWork_id, collection_id); // Assuming a prop function is passed to handle deletion
    }




    function renderImagesACB() {
        return props.collection.artWorks.map((artWork) => (
            <div className="theCollectionSingleFrame" key={artWork.artWork_id}>
                                {props.isEditing && (
                    <button className="deleteButton" onClick={() => handleDeleteArtworkACB(artWork.artWork_id, props.collection.collection_id)}><FaTrash/></button>
                )}
                <img className="theCollection-image" src={artWork.image_URL} alt={artWork.artWorkTitle}></img>
                <div className="theCollection-title">{artWork.artWorkTitle}</div>
                <div className="theCollection-year">{artWork.year}</div>
                <div className="artistName">{artWork.artistName}</div>

            </div>
        ));
    }
    



    return(

        <div>
            <div className="theCollectionFull">
               {renderImagesACB()}
            </div>
        </div>


       /* <div>
            <div className="theCollectionFull">
                <div className="theCollectionSingleFrame">
                    <img className="theCollection-image" src="image/impressionism/SundayImpressionism.jpg"></img>
                    <div className="theCollection-title">Sunday</div>
                    <div className="theCollection-year">1947</div>
                    <div className="artistName">Vincent Van Gogh (1853-1890)</div>
                </div>
                <div className="theCollectionSingleFrame">
                    <div className="theCollection-image"></div>
                    <div className="theCollection-title"></div>
                    <div className="theCollection-year"></div>
                </div>
                <div className="theCollectionSingleFrame">
                    <div className="theCollection-image"></div>
                    <div className="theCollection-title"></div>
                    <div className="theCollection-year"></div>
                </div>

            </div>

        </div>*/

    )


} 