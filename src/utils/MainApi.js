import { BASE_URL } from '../utils/constants';


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

function getResponseData(res) {
    if (res.ok) {
        return res.json()
    }
    return Promise.reject(`Ошибка: ${res.status}`)
}


export { getProfileInfo, updateProfileInfo };