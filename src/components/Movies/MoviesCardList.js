import { useState, useEffect, React } from 'react';

import moviesArray from '../../utils/moviesArray.json';
import MoviesCard from './MoviesCard';

export default function MoviesCardList({ onLike }) {
    function defineNumberOfMoreItems() {
        const width = window.innerWidth;
        if (width < 768) {
            return 5;
        }
        if (width < 1280) {
            return 8;
        }
        return 12;
    }

    const [numberOfMoreItems, setNumberOfMoreItems] = useState(defineNumberOfMoreItems());
    const [movies] = useState(moviesArray);
    const [numberOfitemsShown, setNumberOfItemsToShown] = useState(defineNumberOfMoreItems());

    const showMore = () => {
        if (numberOfitemsShown + numberOfMoreItems <= movies.length) {
            setNumberOfItemsToShown(numberOfitemsShown + numberOfMoreItems);
        } else {
            setNumberOfItemsToShown(movies.length);
        }
    };

    const updateMoreItems = () => {
        setNumberOfMoreItems(defineNumberOfMoreItems());
    };

    useEffect(() => {
        window.addEventListener('resize', updateMoreItems);
        return () => window.removeEventListener('resize', updateMoreItems);
    }, []);

    return (
        <>
            <ul className="movies-card-list">
                {
                    movies
                        .slice(0, numberOfitemsShown)
                        .map(
                            (movie) => (
                                <MoviesCard
                                    movie={movie}
                                    key={movie.id}
                                    onLike={onLike}
                                />
                            ),
                        )
                }
            </ul>
            <button className="movies-card-list__button-more" type="button" onClick={showMore}>Еще</button>
        </>
    );
}
