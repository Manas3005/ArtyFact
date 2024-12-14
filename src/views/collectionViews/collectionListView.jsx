import "/src/css/collectionStyle.css"


export function CollectionListview(props) {


    return(

        <div>
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

        </div>

    )


} 