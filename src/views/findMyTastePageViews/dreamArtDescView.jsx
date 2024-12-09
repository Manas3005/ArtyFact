import "/src/css/findMyTasteStyle.css"
export function DreamArtDescView (props){
    return (
    <div>

        <textarea className = "dreamDescInputBox" placeholder="Describe your dream art piece's colors, genres, artists, feel, art types, any objects you want to see...">
        </textarea> {/* Using textArea instead of input because input is designed for single line text but user is typing a long description so this is more ideal to allow for overflow, scrolling etc. */}
        
        <button className = "seeDescResultsButton">See Results!</button>

    </div>
    )
}