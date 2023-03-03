function filterByKeyWord(keyWord, moviesArray) {

    let filteredResult = [];

    const keyWordLow = keyWord.toLowerCase();

    moviesArray.map((movieElement) => {
        const ruNameLow = movieElement.nameRU ? movieElement.nameRU.toLowerCase() : movieElement.nameRU;
        const enNameLow = movieElement.nameEN ? movieElement.nameEN.toLowerCase() : movieElement.nameEN;
        if (ruNameLow.includes(keyWordLow)
            ||
            enNameLow.includes(keyWordLow)) {
            filteredResult.push(movieElement)
        }
    })

    return filteredResult;
}

function findShorts(movies) {
    let shortMovies = [];

    movies.map((movieElement) => {
        if (movieElement.duration <= 40) {
            shortMovies.push(movieElement);

        }
    })

    return shortMovies;
}

export { filterByKeyWord, findShorts };