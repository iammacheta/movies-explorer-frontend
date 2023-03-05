import FilterCheckbox from './FilterCheckbox';

export default function SearchForm({ onShorts, shortsIsChecked, onFindClick, searchKey, onInputChange }) {

    return (
        <div className="search-form">
            <form
                className="search-form__container"
                name='searchForm'
                onSubmit={onFindClick}
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
