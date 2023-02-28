import FilterCheckbox from './FilterCheckbox';

export default function SearchForm({ onShorts, shortsIsChecked }) {
    function handleFind(e) {
        e.preventDefault();
    }

    return (
        <div className="search-form">
            <form
                className="search-form__container"
                onSubmit={handleFind}
            >
                <input
                    className="search-form__input"
                    type="text"
                    placeholder="Фильм"
                    required
                    minLength="2"
                    maxLength="30"

                />
                <button className="search-form__button" type="submit">Найти</button>
            </form>
            <FilterCheckbox onShorts={onShorts} shortsIsChecked={shortsIsChecked} />
        </div>
    );
}
