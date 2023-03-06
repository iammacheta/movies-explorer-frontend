import FilterCheckbox from './FilterCheckbox';
import { useEffect, useState } from 'react';

export default function SearchForm({ onShorts, shortsIsChecked, onFindClick, searchKey, onInputChange }) {

    const [serchFormInput, setSerchFormInput] = useState(null);
    const [emailError, setEmailError] = useState(null);

    function handleSubmit(e) {
        if (!serchFormInput.validity.valid) {
            showError();
            e.preventDefault();
            return
        }

        onFindClick(e);
    }

    function showError() {
        if (serchFormInput.validity.valueMissing) {
            emailError.textContent = "Нужно ввести ключевое слово";
        } else {
            emailError.textContent = "Произошла ошибка. Попробуйте еще раз";
        }
        emailError.className = "searchForm__error searchForm__error_active";
    }

    useEffect(() => {
        const serchFormInput = document.querySelector(".search-form__input");
        const emailError = document.querySelector(".searchForm__error");

        emailError.textContent = '';
        setSerchFormInput(serchFormInput);
        setEmailError(emailError);
        emailError.className = "searchForm__error";
    });

    return (
        <div className="search-form">
            <form
                className="search-form__container"
                name='searchForm'
                onSubmit={handleSubmit}
                noValidate
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
            <span className="searchForm__error"></span>
            <FilterCheckbox onShorts={onShorts} shortsIsChecked={shortsIsChecked} />
        </div>
    );
}
