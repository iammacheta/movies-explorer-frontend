export default function FilterCheckbox({ onShorts, shortsIsCheckedMovies }) {
    return (
        <div className="filter-checkbox">
            <input className="filter-checkbox__input" type="checkbox" id="checkbox" checked={shortsIsCheckedMovies} onChange={onShorts} />
            <label htmlFor="checkbox" className="filter-checkbox__label">Короткометражки</label>
        </div>
    );
}
