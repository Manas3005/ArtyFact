import "/src/style.css"

export function DreamArtDescView (props){
    return (
    <div>
        <textarea className = "dreamDescInputBox" placeholder="Describe your dream art piece's colors, genres, artists, feel, any objects you want to see...">
        </textarea> {/* Using textArea instead of input because input is designed for single line text but user is typing a long description so this is more ideal */}
        <button className = "seeDescResultsButton">See Results!</button>
    </div>
    )
}