import sanitizeHtml from 'sanitize-html'; 


export const cleanHtmlContent = (html) => {
    return sanitizeHtml(html, {
        allowedTags: [ ], 
        allowedAttributes: { '*': ['href'] },
    });
};


export function transformJournalTitleCB(entry) {
    return entry.title;
}



