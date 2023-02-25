import FilterCheckbox from './FilterCheckbox';

export default function SearchForm({ onShorts, shortsIsChecked }) {
    return (
        <div className="search-form">
            <form className="search-form__container" action="TODO" method="get">
                <input
                    className="search-form__input"
                    type="text"
                    placeholder="Фильм"
                    required
                    minLength="2"
                    maxLength="30"

                />
                <button className="search-form__button" type="button">Найти</button>
            </form>
            <FilterCheckbox onShorts={onShorts} shortsIsChecked={shortsIsChecked} />
        </div>

    );
}
