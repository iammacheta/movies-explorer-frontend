import { useState } from 'react';
import BASE_URL from '../../utils/constants';

export default function MoviesCard({ movie }) {
    const imageUrl = BASE_URL + movie.image.url;

    const [isLiked, setIsLiked] = useState(false);

    function calculateHours(minutes) {
        const HH = Math.floor(minutes / 60);
        const MM = minutes % 60;

        return `${HH !== 0 ? (`${HH}ч`) : ''} ${MM}м`;
    }

    function handleLikeClick() {
        setIsLiked(!isLiked);
    }

    return (
        <li className="movies-card">
            <img className="movies-card__image" src={imageUrl} alt={movie.image.name} />
            <div className="movies-card__info">
                <div className="movies-card__name-section">
                    <p className="movies-card__name">{movie.nameRU}</p>
                    <button
                        className={isLiked ? 'movies-card__like movies-card__like_active' : 'movies-card__like'}
                        type="button"
                        aria-label="like"
                        onClick={handleLikeClick}
                    />
                </div>
                <p className="movies-card__duration">{calculateHours(movie.duration)}</p>
            </div>
        </li>
    );
}
