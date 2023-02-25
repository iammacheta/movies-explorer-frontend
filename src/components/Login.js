import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../images/logo.svg';

const error = !true;

export default function Login({ onSubmit }) {
    const navigate = useNavigate();
    const [userLoginData, setUserLoginData] = useState({
        userEmail: '',
        password: '',
    });

    function handleChange(e) {
        const { name, value } = e.target;
        setUserLoginData({
            ...userLoginData,
            [name]: value,
        });
    }

    function handleLogin(e) {
        e.preventDefault();
        onSubmit();
        navigate('/movies');
    }

    return (
        <main>
            <form className="form">
                <div className="form__info">
                    <Link className='form__link-logo' to="/"><img className="form__logo" src={logo} alt="логотип" /></Link>
                    <p className="form__title">Рады видеть!</p>
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
                            value={userLoginData.userEmail}
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
                    {error && <span className="form__error">При авторизации произошла ошибка. Токен не передан или передан не в том формате.</span>}
                </div>
                <div className="form__buttons-section">
                    <button className={error ? 'profile__submit-button profile__submit-button_disabled' : 'profile__submit-button'} type="submit" onClick={handleLogin}>Войти</button>
                    <p className="form__question">
                        Ещё не зарегистрированы?
                        <Link to="/signup" className="form__link">Регистрация</Link>
                    </p>
                </div>
            </form>
        </main>
    );
}
