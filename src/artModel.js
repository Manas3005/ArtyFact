const model = {
    
    searchParams: {},

    artWorks: [],

    setArtWorks(artWork) {
        console.log("We are in setArtWorks");
        this.artWorks = [...this.artWorks, artWork];
    }
}

export {model}