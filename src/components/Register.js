import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.svg';

export default function Register({ onSubmit }) {
    const [userRegistrationData, setUserRegistrationData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState({});
    const [isValid, setIsValid] = useState(false);

    function handleChange(e) {
        const target = e.target;
        const { name, value } = target;
        setUserRegistrationData({
            ...userRegistrationData,
            [name]: value,
        });
        setErrors({ ...errors, [name]: target.validationMessage });
        setIsValid(target.closest("form").checkValidity());
    }

    function handleRegister(e) {
        e.preventDefault();
        onSubmit(userRegistrationData)
    }

    return (
        <main>
            <form className="form" onSubmit={handleRegister}>
                <div className="form__info">
                    <Link className="form__link-logo" to="/"><img className="form__logo" src={logo} alt="логотип" /></Link>
                    <p className="form__title">Добро пожаловать!</p>
                    <label className="form__input-lable" htmlFor="name">
                        Имя
                        <input
                            className="form__input"
                            type="text"
                            name="name"
                            id="name"
                            placeholder="Имя"
                            required
                            pattern="[а-яА-Яa-zA-Z -]{2,30}"
                            onChange={handleChange}
                            value={userRegistrationData.name}
                        />
                    </label>
                    <span className="form__error">{errors.name}</span>
                    <label className="form__input-lable" htmlFor="email">
                        E-mail
                        <input
                            className="form__input"
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Email"
                            required
                            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                            onChange={handleChange}
                            value={userRegistrationData.email}
                        />
                    </label>
                    <span className="form__error">{errors.email}</span>
                    <label className="form__input-lable" htmlFor="password">
                        Пароль
                        <input
                            className="form__input"
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Пароль"
                            required
                            minLength="2"
                            maxLength="30"
                            onChange={handleChange}
                            value={userRegistrationData.password}
                        />
                    </label>
                    <span className="form__error">{errors.password}</span>
                </div>
                <div className="form__buttons-section">
                    <button className={isValid ? 'profile__submit-button' : 'profile__submit-button profile__submit-button_disabled'} type="submit">Зарегистрироваться</button>
                    <p className="form__question">
                        Уже зарегистрированы?
                        <Link to="/signin" className="form__link">Войти</Link>
                    </p>
                </div>
            </form>
        </main>
    );
}
