import { BEATFILM_URL } from "./constants";

function getInitialMovies() {
    return fetch(`${BEATFILM_URL}/beatfilm-movies`)
        .then((res) => {
            return getResponseData(res)
        })
}

function getResponseData(response) {
    if (response.ok) {

        return response.json()
    }

    return Promise.reject(`Ошибка: ${response.status}`)
}

export { getInitialMovies };