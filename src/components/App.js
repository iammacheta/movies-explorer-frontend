import { Routes, Route } from 'react-router-dom';
import { useState } from 'react';

import Header from './Header';
import Main from './Main';
import Profile from './Profile';
import NotFoundPage from './NotFoundPage';
import Register from './Register';
import Login from './Login';
import Movies from './Movies/Movies';
import SavedMovies from './SavedMovies'
import Layout from './Layout';

import moviesArray from './../utils/moviesArray.json'
import savedMoviesArray from './../utils/savedMoviesArray.json'



function App() {
    const [loggedIn, setLoggedIn] = useState(false);

    const handleAuthorize = () => {
        setLoggedIn(!loggedIn);
    };

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
                    element={<Register />}
                />
                <Route
                    path="*"
                    element={<NotFoundPage />}
                />
            </Routes>
        </div>
    );
}

export default App;
