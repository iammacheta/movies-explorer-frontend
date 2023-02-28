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

import moviesArray from './../utils/moviesArray.json'
import savedMoviesArray from './../utils/savedMoviesArray.json'



function App() {
    const navigate = useNavigate();

    const [loggedIn, setLoggedIn] = useState(false);
    const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
    const [infoTooltipType, setInfoTooltipType] = useState(false);
    const [infoTooltipText, setInfoTooltipText] = useState('');

    
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
        if (infoTooltipType) { // проверяем, получилось ли зарегистироваться/авторизоваться
            navigate("/signin");
        }
    }

    // Обработчик закрытия всех попапов
    function closeAllPopups() {
        setIsInfoTooltipOpen(false)
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
    }, [isInfoTooltipOpen])

    return (
        <div className="App">
            <Routes>
                <Route element={<Layout />}>
                    <Route
                        path="/"
                        element={<Main />}
                    />
                    <Route
                        path="/movies"
                        element={<Movies moviesArray={moviesArray} />}
                    />
                    <Route path="/saved-movies"
                        element={<SavedMovies moviesArray={savedMoviesArray} />} />
                </Route>
                <Route
                    path="/profile"
                    element={(
                        <>
                            <Header />
                            <Profile />
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
    );
}

export default App;
