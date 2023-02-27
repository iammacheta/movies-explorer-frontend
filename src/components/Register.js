import { useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.svg';

const error = true;

export default function Register() {
    const [userRegistrationData, setUserRegistrationData] = useState({
        userName: '',
        userEmail: '',
        password: '',
    });

    function handleChange(e) {
        const { name, value } = e.target;
        setUserRegistrationData({
            ...userRegistrationData,
            [name]: value,
        });
    }

    function handleRegister(e) {
        e.preventDefault();
        // onSubmit(credentials);
    }

    return (
        <main>
            <form className="form">
                <div className="form__info">
                    <Link className="form__link-logo" to="/"><img className="form__logo" src={logo} alt="логотип" /></Link>
                    <p className="form__title">Добро пожаловать!</p>
                    <label className="form__input-lable" htmlFor="userName">
                        Имя
                        <input
                            className="form__input"
                            type="text"
                            name="userName"
                            id="userName"
                            placeholder="Имя"
                            required
                            minLength="2"
                            maxLength="30"
                            onChange={handleChange}
                            value={userRegistrationData.name}

                        />
                    </label>
                    <label className="form__input-lable" htmlFor="userEmail">
                        E-mail
                        <input
                            className="form__input"
                            type="email"
                            name="userEmail"
                            id="userEmail"
                            placeholder="Email"
                            required
                            minLength="2"
                            maxLength="30"
                            onChange={handleChange}
                            value={userRegistrationData.userEmail}

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
                            value={userRegistrationData.password}
                        />
                    </label>
                    {error && <span className="form__error">Что-то пошло не так...</span>}
                </div>
                <div className="form__buttons-section">
                    <button className={error ? 'profile__submit-button profile__submit-button_disabled' : 'profile__submit-button'} type="submit" onClick={handleRegister}>Зарегистрироваться</button>
                    <p className="form__question">
                        Уже зарегистрированы?
                        <Link to="/signin" className="form__link">Войти</Link>
                    </p>
                </div>
            </form>
        </main>
    );
}
