import { useCallback, useState } from 'react';
import SearchForm from '../SearchForm';
import MoviesCardList from './MoviesCardList';

export default function Movies({ onLike }) {
    const [shortsIsChecked, setShortsIsChecked] = useState(false);

    const handleShortsChange = useCallback(() => {
        setShortsIsChecked(!shortsIsChecked);
    }, [shortsIsChecked]);

    return (
        <section className="movies">
            <SearchForm onShorts={handleShortsChange} shortsIsChecked={shortsIsChecked} />
            <MoviesCardList onLike={onLike} />
        </section>
    );
}
