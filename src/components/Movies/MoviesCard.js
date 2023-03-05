import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useContext, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { BEATFILM_URL } from '../../utils/constants';

export default function MoviesCard({ movie, onLike, onRemove, likedMovies }) {
    const currentUser = useContext(CurrentUserContext);
    const location = useLocation();

    const [isLiked, setIsLiked] = useState(false);

    const imageUrlValue = movie.image.url
    const imageUrl = imageUrlValue ? BEATFILM_URL + imageUrlValue : movie.image;

    function calculateHours(minutes) {
        const HH = Math.floor(minutes / 60);
        const MM = minutes % 60;

        return `${HH !== 0 ? (`${HH}ч`) : ''} ${MM}м`;
    }

    function handleLikeClick() {
        setIsLiked(!isLiked);
        isLiked ? onRemove(movie.id) : onLike(movie);
    }

    function handleRemoveClick() {
        setIsLiked(!isLiked);
        onRemove(movie.movieId);
    }

    function defineLikeStatus(currentMovieId) {

        const likeStatus = likedMovies.includes(currentMovieId);

        return likeStatus;
    }

    useEffect(() => {
        setIsLiked(defineLikeStatus(movie.id))
    }, [likedMovies]);

    return (
        <li className="movies-card">
            <img className="movies-card__image" src={imageUrl} alt={movie.image.name} />
            <div className="movies-card__info">
                <div className="movies-card__name-section">
                    <p className="movies-card__name">{movie.nameRU}</p>
                    {location.pathname === '/saved-movies' ?
                        <button
                            className="movies-card__remove"
                            type="button"
                            aria-label="remove"
                            onClick={handleRemoveClick}
                        />
                        :
                        <button
                            className={isLiked ? 'movies-card__like movies-card__like_active' : 'movies-card__like'}
                            type="button"
                            aria-label="like"
                            onClick={handleLikeClick}
                        />
                    }
                </div>
                <p className="movies-card__duration">{calculateHours(movie.duration)}</p>
            </div>
        </li>
    );
}
