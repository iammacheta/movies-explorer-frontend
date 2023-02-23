import { useState } from 'react';

import moviesArray from '../../utils/moviesArray.json';
import MoviesCard from './MoviesCard';

export default function MoviesCardList({ onLike }) {
    const [movies] = useState(moviesArray);
    const [numberOfitemsShown, setNumberOfItemsToShown] = useState(12);

    const showMore = () => {
        if (numberOfitemsShown + 12 <= movies.length) {
            setNumberOfItemsToShown(numberOfitemsShown + 12);
        } else {
            setNumberOfItemsToShown(movies.length);
        }
    };

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
