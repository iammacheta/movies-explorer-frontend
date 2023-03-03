import { useEffect, useState } from 'react';
import SearchForm from '../SearchForm';
import MoviesCardList from './MoviesCardList';
import { findShorts } from '../../utils/Filters';

export default function Movies({ onLike, movies }) {
    const [shortsIsChecked, setShortsIsChecked] = useState(false);
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [shortMovies, setShortMovies] = useState([]);
    const [searchKey, setSearchKey] = useState('');


    function handleShortsChange() {
        localStorage.setItem('shortsIsChecked', !shortsIsChecked);
        setShortsIsChecked(!shortsIsChecked);
        const shortMovies = findShorts(filteredMovies)
        setShortMovies(shortMovies);
        localStorage.setItem('shortMovies', JSON.stringify(shortMovies));
    };

    function handleInputChange(e) {
        const value = e.target.value;
        setSearchKey(value);
    }

    function handleFindClick(filteredMovies) {
        setFilteredMovies(filteredMovies);
    }

    useEffect(() => {
        const filteredMovies = localStorage.getItem('filteredMovies');
        const shortMovies = localStorage.getItem('shortMovies');
        const shortsIsChecked = localStorage.getItem('shortsIsChecked');
        const searchKey = localStorage.getItem('searchKey');

        if (filteredMovies) {
            setFilteredMovies(JSON.parse(filteredMovies));
        }

        if (shortMovies) {
            setShortMovies(JSON.parse(shortMovies));
        }

        if (shortsIsChecked) {
            setShortsIsChecked(JSON.parse(shortsIsChecked));
        }

        if (searchKey) {
            setSearchKey(searchKey);
        }

    }, []);

    return (
        <main className="movies">
            <SearchForm onShorts={handleShortsChange} shortsIsChecked={shortsIsChecked} searchKey={searchKey} onInputChange={handleInputChange} onFindClick={handleFindClick} />
            <MoviesCardList onLike={onLike} movies={shortsIsChecked ? shortMovies : filteredMovies} />
        </main>
    );
}
