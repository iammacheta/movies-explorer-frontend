import { useState, useEffect, React } from 'react';
import { useLocation } from 'react-router-dom';

import MoviesCard from './MoviesCard';

export default function MoviesCardList({ onLike, movies, onRemove, likedMovies }) {

    const location = useLocation();

    function defineNumberOfBasicItems() {
        const width = window.innerWidth;
        if (width < 768) {
            return 5;
        }
        if (width < 1280) {
            return 8;
        }
        return 12;
    }

    function defineNumberOfMoreItems() {
        const width = window.innerWidth;

        if (width < 1280) {
            return 2;
        }
        return 3;
    }


    const [numberOfMoreItems, setNumberOfMoreItems] = useState(defineNumberOfMoreItems());
    const [numberOfitemsShown, setNumberOfItemsToShown] = useState(defineNumberOfBasicItems());

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
    });

    function renderEmptySearch() {
        return (
            <p className='movies-card-list__empty'>Ничего не найдено</p>
        )
    }

    function renderContent() {
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
                                        key={movie.id ? movie.id : movie.movieId}
                                        onLike={onLike}
                                        onRemove={onRemove}
                                        likedMovies={likedMovies}
                                    />
                                ),
                            )
                    }
                </ul>
                {numberOfitemsShown < movies.length &&
                    <button className="movies-card-list__button-more" type="button" onClick={showMore}>Еще</button>
                }
            </>
        )
    }

    function renderMovies() {
        if (location.pathname === '/saved-movies') {
            return renderContent();
        } else {
            return (localStorage.getItem('filteredMovies')) ?
                (movies.length === 0 ? renderEmptySearch() : renderContent())
                :
                <></>
        }
    }

    return renderMovies()

}
