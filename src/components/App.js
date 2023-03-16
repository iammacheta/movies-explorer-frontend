import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
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
import Preloader from './Preloader';

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

    const [shortsIsCheckedMovies, setShortsIsCheckedMovies] = useState(false);
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [shortMovies, setShortMovies] = useState([]);

    const [isLoading, setIsLoading] = useState(false);

    //обработчик регистрации пользователя
    function handleRegister(credentials) {
        setIsLoading(true);
        auth.register(credentials)
            .then(() => {
                handleAuthorize({
                    email: credentials.email,
                    password: credentials.password
                });
            })
            .catch(() => {
                showErrorPopup(`При регистрации пользователя произошла ошибка.`);
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    // Обработчик нажатия кнопки авторизации
    function handleAuthorize(credentials) {
        setIsLoading(true);
        auth.authorize(credentials)
            .then((res) => {
                if (res.token) {
                    localStorage.setItem('token', res.token);
                    setLoggedIn(true);
                    navigate("/movies");
                }
            })
            .catch((err) => {
                showErrorPopup(`При авторизации произошла ошибка.`);
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    function closeInfoTooltip() {
        setIsInfoTooltipOpen(false);
    }

    // Обработчик закрытия всех попапов
    function closeAllPopups() {
        setIsInfoTooltipOpen(false)
        setInfoTooltipText('');
        setInfoTooltipType(false);
    }

    // Обработчик для обновления информации профиля
    function handleUpdateUser(userData) {
        setIsLoading(true)
        mainApi.updateProfileInfo({ name: userData.name, email: userData.email })
            .then((res) => {
                setCurrentUser(res.data)
                setIsLoading(false)
                setInfoTooltipType(true);
                setInfoTooltipText(`Данные профиля обновлены.`);
                setIsInfoTooltipOpen(true);

            })
            .catch((err) => {
                showErrorPopup(`При обновлении профиля произошла ошибка.`);
                console.log(err)
            })
            .finally(() => {
                setIsLoading(false)
            })
    }

    // Обработчик нажатия кнопки выхода из профиля
    function handleLogout() {
        localStorage.removeItem('movies');
        localStorage.removeItem('filteredMovies');
        localStorage.removeItem('searchKey');
        localStorage.removeItem('shortsIsCheckedMovies');
        localStorage.removeItem('shortMovies');
        localStorage.removeItem('token');
        setLoggedIn(false);
        setCurrentUser({
            name: '',
            email: '',
            _id: '',
        });
        setSavedMovies([]);
        setFilteredSavedMovies([]);
        setShortsIsCheckedSaved(false);
        setShortMoviesSaved([]);
        setShortsIsCheckedMovies(false);
        setFilteredMovies([]);
        setShortMovies([]);
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

    function findCurrentUserMovies(movies, currentUserId) {
        let currentUserMovies = [];

        movies.forEach((movie) => {
            if (movie.owner._id === currentUserId) {
                currentUserMovies.push(movie);
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
                    })
                    .catch((err) => {
                        console.log(err);
                        showErrorPopup();
                    })
            })
            .catch((err) => {
                console.log(err);
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
                    })
                    .catch((err) => {
                        console.log(err);
                        showErrorPopup();
                    })
            })
            .catch((err) => {
                console.log(err);
            })
    }

    function handleShortsChangeMovies() {
        localStorage.setItem('shortsIsCheckedMovies', !shortsIsCheckedMovies);
        setShortsIsCheckedMovies(!shortsIsCheckedMovies);
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

    function handleLikedMovies(currentMovieId) {

        let isLiked = false;
        savedMovies.forEach((movie) => {
            if (movie.movieId === currentMovieId) {
                isLiked = true;
            }
        })

        return isLiked;
    }

    function showErrorPopup(errorMessage = `Произошла ошибка.
    Попробуйте еще раз.`) {
        setInfoTooltipType(false);
        setInfoTooltipText(errorMessage);
        setIsInfoTooltipOpen(true);
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
                    console.log(err);
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

            moviesApi.getInitialMovies()
                .then((res) => {
                    localStorage.setItem('movies', JSON.stringify(res));
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }, [loggedIn]);

    useEffect(() => {
        if (!loggedIn) {
            return
        } else {
            mainApi.getSavedMovies()
                .then((res) => {
            
                    const curentUsersMovies = findCurrentUserMovies(res.data, currentUser._id);
                    setSavedMovies(curentUsersMovies);
                    setFilteredSavedMovies(curentUsersMovies);

                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }, [loggedIn, currentUser]);

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
            setShortsIsCheckedMovies(JSON.parse(shortsIsCheckedMovies));
        }

    }, []);

    return (
        <CurrentUserContext.Provider value={currentUser}>
            <LoggedInStatus.Provider value={loggedIn}>
                <div className="App">
                    {isLoading && <Preloader />}
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
                                            likedMovies={handleLikedMovies}
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
                            element={loggedIn ? <Navigate to="/" replace /> : <Login onSubmit={handleAuthorize} isLoading={isLoading} />}
                        />

                        <Route
                            path="/signup"
                            element={loggedIn ? <Navigate to="/" replace /> : <Register onSubmit={handleRegister} isLoading={isLoading} />}
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
