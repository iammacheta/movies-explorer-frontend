import { useState } from 'react';
import SearchForm from './SearchForm';
import MoviesCardList from './Movies/MoviesCardList';

export default function SavedMovies(

    {
        onLike,
        onRemove,
        onShorts,
        shortsIsChecked,
        shortMovies,
        filteredSavedMovies,
        onFindClick,
        likedMovies
    }) {

    const [searchKeySaved, setSearchKeySaved] = useState('');

    function handleInputChange(e) {
        const value = e.target.value;
        setSearchKeySaved(value);
    }

    return (
        <main className="movies">
            <SearchForm onShorts={onShorts} shortsIsCheckedSaved={shortsIsChecked} searchKeySaved={searchKeySaved} onInputChange={handleInputChange} onFindClick={onFindClick} />
            <MoviesCardList onLike={onLike} onRemove={onRemove} movies={shortsIsChecked ? shortMovies : filteredSavedMovies} likedMovies={likedMovies} />
        </main>
    );
}