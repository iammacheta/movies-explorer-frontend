import { Routes, Route } from 'react-router-dom';

import Header from './Header';
import Main from './Main';
import Profile from './Profile';
import NotFoundPage from './NotFoundPage';
import Register from './Register';
import Login from './Login';
import Movies from './Movies';
import Layout from './Layout';

function App() {
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
                        element={<Movies />}
                    />
                    {/* <Route path="/saved-movies" element={<SavedMovies />} /> */}
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
                    element={<Login />}
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
