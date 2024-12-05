import sanitizeHtml from 'sanitize-html'; 


export const cleanHtmlContent = (html) => {
    return sanitizeHtml(html, {
        allowedTags: [ ], 
        allowedAttributes: { '*': ['href'] },
    });
};

export function iterateThroughData(array) {
    console.log("This is the array", array);
    console.log("This is it", array.data.filter(artwork => artwork.title && artwork.title !== "Untitled"));
    const filteredData = array.data.filter(artwork => artwork.description && artwork.title && artwork.title !== "Untitled" && artwork.image_id !== null && artwork.image_id);
    setArtData(filteredData);
}