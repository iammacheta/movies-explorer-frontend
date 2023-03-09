import { BASE_URL, BEATFILM_URL } from '../utils/constants';


function getProfileInfo() {
    return fetch(`${BASE_URL}/users/me`, {
        baseUrl: BASE_URL,
        headers: {
            authorization: 'Bearer ' + localStorage.getItem('token'),
            'Content-Type': 'application/json'
        }
    })
        .then((res) => {
            return getResponseData(res);
        })
}

function updateProfileInfo({ name, email }) {
    return fetch(`${BASE_URL}/users/me`, {
        method: 'PATCH',
        baseUrl: BASE_URL,
        headers: {
            authorization: 'Bearer ' + localStorage.getItem('token'),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name,
            email: email
        })
    })
        .then((res) => {
            return getResponseData(res);
        })
}

function getSavedMovies() {
    return fetch(`${BASE_URL}/movies`, {
        baseUrl: BASE_URL,
        headers: {
            authorization: 'Bearer ' + localStorage.getItem('token'),
            'Content-Type': 'application/json'
        }
    })
        .then((res) => {
            return getResponseData(res);
        })
}

function saveMovie(movie) {
    return fetch(`${BASE_URL}/movies`, {
        method: 'POST',
        baseUrl: BASE_URL,
        headers: {
            authorization: 'Bearer ' + localStorage.getItem('token'),
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            country: movie.country,
            director: movie.director,
            duration: movie.duration,
            year: movie.year,
            description: movie.description,
            image: `${BEATFILM_URL}${movie.image.url}`,
            trailerLink: movie.trailerLink,
            thumbnail: `${BEATFILM_URL}${movie.image.formats.thumbnail.url}`,
            movieId: movie.id, //  id фильма, который содержится в ответе сервиса MoviesExplorer.
            nameRU: movie.nameRU,
            nameEN: movie.nameEN,
        })
    })
        .then((res) => {
            return getResponseData(res);
        })
}

function removeMovieFromSaved(movieId) {
    return fetch(`${BASE_URL}/movies/${movieId}`, {
        method: 'DELETE',
        baseUrl: BASE_URL,
        headers: {
            authorization: 'Bearer ' + localStorage.getItem('token'),
            'Content-Type': 'application/json'
        }
    })
        .then((res) => {
            return getResponseData(res);
        })
}

function getResponseData(res) {
    if (res.ok) {
        return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`)
}


export { getProfileInfo, updateProfileInfo, getSavedMovies, saveMovie, removeMovieFromSaved };