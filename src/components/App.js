import { Routes, Route, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import Header from './Header';
import Main from './Main';
import Profile from './Profile';
import NotFoundPage from './NotFoundPage';
import Register from './Register';
import Login from './Login';
import Movies from './Movies/Movies';
import SavedMovies from './SavedMovies'
import Layout from './Layout';
import InfoTooltip from './InfoTooltip';
import ProtectedRoute from './ProtectedRoute';
import * as auth from '../utils/auth';
import * as mainApi from '../utils/MainApi';
import * as moviesApi from '../utils/MoviesApi';
import * as filters from '../utils/Filters'
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { LoggedInStatus } from '../contexts/LoggedInStatus';

function App() {
    const navigate = useNavigate();
    const [loggedIn, setLoggedIn] = useState(false);
    const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
    const [infoTooltipType, setInfoTooltipType] = useState(false);
    const [infoTooltipText, setInfoTooltipText] = useState('');
    const [currentUser, setCurrentUser] = useState({
        name: '',
        email: '',
        _id: '',
    });
    const [savedMovies, setSavedMovies] = useState([]);
    const [filteredSavedMovies, setFilteredSavedMovies] = useState([]);
    const [shortsIsCheckedSaved, setShortsIsCheckedSaved] = useState(false);
    const [shortMoviesSaved, setShortMoviesSaved] = useState([]);
    const [likedMovies, setLikedMovies] = useState([]);


    //обработчик регистрации пользователя
    function handleRegister(credentials) {
        auth.register(credentials)
            .then(() => {
                handleAuthorize({
                    email: credentials.email,
                    password: credentials.password
                });
            })
            .catch(() => {
                setInfoTooltipType(false);
                setInfoTooltipText(`При регистрации пользователя произошла ошибка.`);
                setIsInfoTooltipOpen(true)
            })
    }

    // Обработчик нажатия кнопки авторизации
    function handleAuthorize(credentials) {
        auth.authorize(credentials)
            .then((res) => {
                if (res.token) {
                    localStorage.setItem('token', res.token);
                    setLoggedIn(true);
                    navigate("/movies");
                }
            })
            .catch((err) => {
                setInfoTooltipType(false);
                setInfoTooltipText(`При авторизации произошла ошибка.`);
                setIsInfoTooltipOpen(true);
            })
    }

    function closeInfoTooltip() {
        setIsInfoTooltipOpen(false);
        if (infoTooltipType) {
            navigate("/signin");
        }
    }

    // Обработчик закрытия всех попапов
    function closeAllPopups() {
        setIsInfoTooltipOpen(false)
    }

    // Обработчик для обновления информации профиля
    function handleUpdateUser(userData) {
        // setIsLoading(true)
        mainApi.updateProfileInfo({ name: userData.name, email: userData.email })
            .then((res) => {
                setCurrentUser(res.data)
            })
            .catch((err) => {
                setInfoTooltipType(false);
                setInfoTooltipText(`При обновлении профиля произошла ошибка.`);
                setIsInfoTooltipOpen(true);
                console.log(err)
            })
            .finally(() => {
                // setIsLoading(false)
            })
    }

    // Обработчик нажатия кнопки выхода из профиля
    function handleLogout() {
        localStorage.removeItem('movies')
        localStorage.removeItem('filteredMovies')
        localStorage.removeItem('searchKey')
        localStorage.removeItem('shortsIsCheckedMovies')
        localStorage.removeItem('shortMovies')
        localStorage.removeItem('token')
        setLoggedIn(false)
    }

    // обработчик закрытия попапов по нажатию Escape
    useEffect(() => {
        function closeByEscape(evt) {
            if (evt.key === 'Escape') {
                closeAllPopups();
            }
        }
        if (isInfoTooltipOpen) { // навешиваем только при открытии
            document.addEventListener('keydown', closeByEscape);
            return () => {
                document.removeEventListener('keydown', closeByEscape);
            }
        }
    }, [isInfoTooltipOpen]);

    function defineLikedMovies() {
        let likedMoviesList = [];

        savedMovies.map((movie) => {
            likedMoviesList.push(movie.movieId);
        })

        return likedMoviesList
    }

    function handleShortsChangeSaved() {
        setShortsIsCheckedSaved(!shortsIsCheckedSaved);
        const shortMoviesSaved = filters.findShorts(filteredSavedMovies)
        setShortMoviesSaved(shortMoviesSaved);
    };

    function handleFindClickSaved(e) {
        e.preventDefault();
        const inputValue = e.target.elements.serchFormInput.value;
        const filteredSavedMovies = filters.filterByKeyWord(inputValue, savedMovies);

        setFilteredSavedMovies(filteredSavedMovies);
        if (shortsIsCheckedSaved) {
            const shortMoviesSaved = filters.findShorts(filteredSavedMovies);
            setShortMoviesSaved(shortMoviesSaved);
        }
    }

    function findCurrentUserMovies(movies, userId) {
        let currentUserMovies = [];

        movies.map((movie) => {
            if (movie.owner._id === userId) {
                currentUserMovies.push(movie)
            }
        })

        return currentUserMovies;
    }

    function handleLike(movie) {
        mainApi.saveMovie(movie)
            .then(() => {
                mainApi.getSavedMovies()
                    .then((res) => {
                        const curentUsersMovies = findCurrentUserMovies(res.data, currentUser._id);
                        setSavedMovies(curentUsersMovies);
                        setFilteredSavedMovies(curentUsersMovies);
                        setLikedMovies(defineLikedMovies());
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            })
            .catch((err) => {
                console.log(err)
            })
    }

    function handleRemove(movieId) {
        mainApi.removeMovieFromSaved(movieId)
            .then(() => {
                mainApi.getSavedMovies()
                    .then((res) => {
                        const curentUsersMovies = findCurrentUserMovies(res.data, currentUser._id);
                        setSavedMovies(curentUsersMovies);
                        setFilteredSavedMovies(curentUsersMovies);
                        setLikedMovies(defineLikedMovies());
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            })
            .catch((err) => {
                console.log(err)
            })
    }

    const [shortsIsCheckedMovies, setShortsIsChecked] = useState(false);
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [shortMovies, setShortMovies] = useState([]);

    function handleShortsChangeMovies() {
        localStorage.setItem('shortsIsCheckedMovies', !shortsIsCheckedMovies);
        setShortsIsChecked(!shortsIsCheckedMovies);
        const shortMovies = filters.findShorts(filteredMovies)
        setShortMovies(shortMovies);
        localStorage.setItem('shortMovies', JSON.stringify(shortMovies));
    };

    function handleFindClickMovies(e) {
        e.preventDefault();
        const inputValue = e.target.elements.serchFormInput.value;
        const moviesArray = JSON.parse(localStorage.getItem('movies'));
        const filteredMovies = filters.filterByKeyWord(inputValue, moviesArray);
        localStorage.setItem('filteredMovies', JSON.stringify(filteredMovies));

        setFilteredMovies(filteredMovies);
        localStorage.setItem('searchKey', inputValue);
        if (shortsIsCheckedMovies) {
            const shortMovies = filters.findShorts(filteredMovies);
            setShortMovies(shortMovies);
            localStorage.setItem('shortMovies', JSON.stringify(shortMovies));
        }
    }

    useEffect(() => {
        const filteredMovies = localStorage.getItem('filteredMovies');
        const shortMovies = localStorage.getItem('shortMovies');
        const shortsIsCheckedMovies = localStorage.getItem('shortsIsCheckedMovies');

        if (filteredMovies) {
            setFilteredMovies(JSON.parse(filteredMovies));
        }

        if (shortMovies) {
            setShortMovies(JSON.parse(shortMovies));
        }

        if (shortsIsCheckedMovies) {
            setShortsIsChecked(JSON.parse(shortsIsCheckedMovies));
        }

    }, []);

    //Автоматичекий лог-ин в новой сессии
    useEffect(() => {
        const token = localStorage.getItem('token')

        if (token) {
            auth.tokenVerification(token)
                .then((res) => {
                    setCurrentUser(res.data);
                    setLoggedIn(true);
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }, [])

    useEffect(() => {
        if (!loggedIn) {
            return
        } else {
            mainApi.getProfileInfo()
                .then((res) => {
                    setCurrentUser(res.data);
                })
                .catch((err) => {
                    console.log(err);
                });

            // запрашиваем фильмы с сервера movies-explorer
            moviesApi.getInitialMovies()
                .then((res) => {
                    localStorage.setItem('movies', JSON.stringify(res));
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }, [loggedIn]);

    useEffect(() => {
        if (!currentUser._id) {
            return
        } else {
            mainApi.getSavedMovies()
                .then((res) => {
                    const curentUsersMovies = findCurrentUserMovies(res.data, currentUser._id);
                    setSavedMovies(curentUsersMovies);
                    setFilteredSavedMovies(curentUsersMovies);
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }, [currentUser._id]);

    useEffect(() => {
        setLikedMovies(defineLikedMovies());
    }, [savedMovies]);

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <LoggedInStatus.Provider value={loggedIn}>
                <div className="App">
                    <Routes>
                        <Route element={<Layout />}>

                            <Route
                                path="/"
                                element={<Main />}
                            />

                            <Route
                                path="/movies"
                                element={
                                    <ProtectedRoute>
                                        <Movies
                                            onLike={handleLike}
                                            onRemove={handleRemove}
                                            onShorts={handleShortsChangeMovies}
                                            shortsIsChecked={shortsIsCheckedMovies}
                                            shortMovies={shortMovies}
                                            filteredMovies={filteredMovies}
                                            onFindClick={handleFindClickMovies}
                                            likedMovies={likedMovies}
                                        />
                                    </ProtectedRoute>
                                }
                            />

                            <Route
                                path="/saved-movies"
                                element={
                                    <ProtectedRoute>
                                        <SavedMovies
                                            onLike={handleLike}
                                            onRemove={handleRemove}
                                            onShorts={handleShortsChangeSaved}
                                            shortsIsChecked={shortsIsCheckedSaved}
                                            shortMovies={shortMoviesSaved}
                                            filteredSavedMovies={filteredSavedMovies}
                                            onFindClick={handleFindClickSaved}
                                            likedMovies={[]}
                                        />
                                    </ProtectedRoute>
                                }
                            />

                        </Route>

                        <Route
                            path="/profile"
                            element={
                                <ProtectedRoute>
                                    <>
                                        <Header />
                                        <Profile onSubmit={handleUpdateUser} onClickLogout={handleLogout} />
                                    </>
                                </ProtectedRoute>
                            }
                        />

                        <Route
                            path="/signin"
                            element={<Login onSubmit={handleAuthorize} />}
                        />

                        <Route
                            path="/signup"
                            element={<Register onSubmit={handleRegister} />}
                        />

                        <Route
                            path="*"
                            element={<NotFoundPage />}
                        />

                    </Routes>
                    <InfoTooltip
                        isOpen={isInfoTooltipOpen}
                        onClose={closeInfoTooltip}
                        infoTooltipType={infoTooltipType}
                        infoTooltipText={infoTooltipText} />
                </div>
            </LoggedInStatus.Provider>
        </CurrentUserContext.Provider>
    );
}

export default App;
