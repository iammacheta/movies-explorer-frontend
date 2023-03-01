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
import * as auth from '../utils/auth';
import * as mainApi from '../utils/MainApi';
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
    })
    const [movies, setMovies] = useState([]);

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

    useEffect(() => {
        if (!loggedIn) {
            return
        } else {
            mainApi.getProfileInfo()
                .then((res) => {
                    setCurrentUser({
                        name: res.data.name,
                        email: res.data.email,
                    });
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }, [loggedIn]);

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
                                element={<Movies movies={movies} />}
                            />
                            <Route path="/saved-movies"
                                element={<SavedMovies moviesSaved={[]} />} />
                        </Route>
                        <Route
                            path="/profile"
                            element={(
                                <>
                                    <Header />
                                    <Profile onSubmit={handleUpdateUser} onClickLogout={handleLogout} />
                                </>
                            )}
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
