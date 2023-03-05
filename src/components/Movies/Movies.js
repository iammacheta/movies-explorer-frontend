import { useState, useEffect } from 'react';
import SearchForm from '../SearchForm';
import MoviesCardList from './MoviesCardList';

export default function Movies({ onLike, onRemove, onShorts, shortsIsChecked, shortMovies, filteredMovies, onFindClick, likedMovies }) {

    const [searchKey, setSearchKey] = useState('');

    function handleInputChange(e) {
        const value = e.target.value;
        setSearchKey(value);
    }

    useEffect(() => {
        const searchKey = localStorage.getItem('searchKey');

        if (searchKey) {
            setSearchKey(searchKey);
        }

    }, []);

    return (
        <main className="movies">
            <SearchForm onShorts={onShorts} shortsIsChecked={shortsIsChecked} searchKey={searchKey} onInputChange={handleInputChange} onFindClick={onFindClick} />
            <MoviesCardList onLike={onLike} onRemove={onRemove} movies={shortsIsChecked ? shortMovies : filteredMovies} likedMovies={likedMovies} />
        </main>
    );
}
