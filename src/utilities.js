import { intercept } from 'mobx';
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

export function extractDateInterval(input) {
    console.log("This is input", input);
    if(input) {
    const regex = /\d+/g;
    const matches = input.match(regex);
    return matches && matches.length >= 2 ? `${matches[0]}-${matches[1]}` : "";
    }
    else {
        return "";
    }
}
const input = "Charles Georges Dufresne\nFrench, 1876-1938";
const dateInterval = extractDateInterval(input);
console.log(dateInterval);

//can be used for rendering icons (icon paths the go in src fields), texts
export function conditionalRenderHelperCB (entry, arg1, arg2) { 
    if (entry === null){ 
        return arg1
    } else {
        return arg2
    }
}

