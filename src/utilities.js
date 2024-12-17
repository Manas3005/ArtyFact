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

//can be used for rendering icons (icon paths the go in src fields), texts
export function conditionalRenderHelperCB (entry, arg1, arg2) { 
    if (entry === null){ 
        return arg1
    } else {
        return arg2
    }
}

