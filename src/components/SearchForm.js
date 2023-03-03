import FilterCheckbox from './FilterCheckbox';
import { filterByKeyWord } from '../utils/Filters';

export default function SearchForm({ onShorts, shortsIsChecked, onFindClick, searchKey, onInputChange }) {

    function handleFind(e) {
        e.preventDefault();
        const inputValue = e.target.elements.serchFormInput.value;
        const moviesArray = JSON.parse(localStorage.getItem('movies'));
        const filteredMovies = filterByKeyWord(inputValue, moviesArray);
        localStorage.setItem('filteredMovies', JSON.stringify(filteredMovies));
        onFindClick(filteredMovies);
        localStorage.setItem('searchKey', inputValue);
    }

    return (
        <div className="search-form">
            <form
                className="search-form__container"
                name='searchForm'
                onSubmit={handleFind}
            >
                <input
                    className="search-form__input"
                    type="text"
                    name='serchFormInput'
                    placeholder="Фильм"
                    required
                    value={searchKey}
                    onChange={onInputChange}
                />
                <button className="search-form__button" type="submit">Найти</button>
            </form>
            <FilterCheckbox onShorts={onShorts} shortsIsChecked={shortsIsChecked} />
        </div>
    );
}
