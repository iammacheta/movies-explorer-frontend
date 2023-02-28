import { useCallback, useState } from 'react';
import SearchForm from './SearchForm';
import MoviesCardList from './Movies/MoviesCardList';

export default function Movies({ onLike, moviesArray }) {
    const [shortsIsChecked, setShortsIsChecked] = useState(false);

    const handleShortsChange = useCallback(() => {
        setShortsIsChecked(!shortsIsChecked);
    }, [shortsIsChecked]);

    return (
        <main className="movies">
            <SearchForm onShorts={handleShortsChange} shortsIsChecked={shortsIsChecked} />
            <MoviesCardList onLike={onLike} moviesArray={moviesArray} />
        </main>
    );
}
