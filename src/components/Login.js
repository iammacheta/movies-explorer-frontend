import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.svg';

export default function Login({ onSubmit, isLoading }) {
    const [userLoginData, setUserLoginData] = useState({
        email: '',
        password: '',
    });
    const [errors, setErrors] = useState({});
    const [isValid, setIsValid] = useState(false);

    function handleChange(e) {
        const target = e.target;
        const { name, value } = target;
        setUserLoginData({
            ...userLoginData,
            [name]: value,
        });
        setErrors({ ...errors, [name]: target.validationMessage });
        setIsValid(target.closest("form").checkValidity());
    }

    function handleLogin(e) {
        e.preventDefault();
        onSubmit(userLoginData);
    }

    return (
        <main>
            <form className="form" onSubmit={handleLogin}>
                <div className="form__info">
                    <Link className='form__link-logo' to="/"><img className="form__logo" src={logo} alt="логотип" /></Link>
                    <p className="form__title">Рады видеть!</p>
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
                            value={userLoginData.email}
                        />
                    </label>
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
                            value={userLoginData.password}
                        />
                    </label>
                </div>
                <div className="form__buttons-section">
                    <button
                        className={isValid ? 'profile__submit-button' : 'profile__submit-button profile__submit-button_disabled'}
                        type="submit"
                        disabled={isLoading ? 'disabled' : ''}
                    >Войти</button>
                    <p className="form__question">
                        Ещё не зарегистрированы?
                        <Link to="/signup" className="form__link">Регистрация</Link>
                    </p>
                </div>
            </form>
        </main>
    );
}
