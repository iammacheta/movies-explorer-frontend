import { useLocation } from 'react-router-dom';
import { BEATFILM_URL } from '../../utils/constants';

export default function MoviesCard({ movie, onLike, onRemove, likedMovies }) {
    const location = useLocation();
    const imageUrlValue = movie.image.url
    const imageUrl = imageUrlValue ? BEATFILM_URL + imageUrlValue : movie.image;

    function calculateHours(minutes) {
        const HH = Math.floor(minutes / 60);
        const MM = minutes % 60;

        return `${HH !== 0 ? (`${HH}ч`) : ''} ${MM}м`;
    }

    function handleCardClick() {
        window.open(movie.trailerLink);
    }

    function handleRemoveClick(e) {
        onRemove(movie.movieId);
        e.stopPropagation();
    }

    function handleUnlikeClick(e) {
        onRemove(movie.id);
        e.stopPropagation();
    }

    function handleLikeClick(e) {
        onLike(movie);
        e.stopPropagation();
    }

    function defineLikeStatus() {
        const isLiked = likedMovies(movie.id);
        return isLiked;
    }

    return (
        <li className="movies-card" onClick={handleCardClick}>
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
                            className={defineLikeStatus() ? 'movies-card__like movies-card__like_active' : 'movies-card__like'}
                            type="button"
                            aria-label="like"
                            onClick={defineLikeStatus() ? handleUnlikeClick : handleLikeClick }
                        />
                    }
                </div>
                <p className="movies-card__duration">{calculateHours(movie.duration)}</p>
            </div>
        </li>
    );
}
