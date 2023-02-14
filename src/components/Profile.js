import { Link } from 'react-router-dom';
import { useState } from 'react';

const error = false;

export default function Profile() {
    const [userData, setUserData] = useState({
        // TODO: брать начальные заначения из БД
        userName: 'Виталий',
        userEmail: 'pochta@yandex.ru',
    });

    const [editClicked, setEditClicked] = useState(false);

    function handleChange(e) {
        const { name, value } = e.target;
        setUserData({
            ...userData, // Важно прокинуть остальные поля, чтобы не перезареть их
            [name]: value,
        });
    }

    function handleEdit() {
        setEditClicked(!editClicked);
    }

    function handleSubmit() {
        setEditClicked(!editClicked);
        // Отправлять обновленные данные в БД и из ответа обновлять стейт с локальными данными.
    }

    return (
        <section className="profile">
            <form className="profile__form" name="profile">
                <h2 className="profile__title">Привет, Виталий!</h2>
                <label className="profile__form-label" htmlFor="userName">
                    Имя
                    <input
                        className="profile__input"
                        type="text"
                        name="userName"
                        id="userName"
                        value={userData.userName}
                        onChange={handleChange}
                        disabled={editClicked ? '' : 'disabled'}
                    />
                </label>
                <label className="profile__form-label" htmlFor="userEmail">
                    E-mail
                    <input
                        className="profile__input"
                        type="email"
                        name="userEmail"
                        id="userEmail"
                        value={userData.userEmail}
                        onChange={handleChange}
                        disabled={editClicked ? '' : 'disabled'}
                    />
                </label>
            </form>
            {editClicked ? (
                <div className="profile__submit-section">
                    {error && <span className="profile__error">При обновлении профиля произошла ошибка.</span>}
                    {/* TODO: отправлять новые значения имени/почты в БД */}
                    <button className={error ? 'profile__submit-button profile__submit-button_disabled' : 'profile__submit-button'} type="submit" onClick={handleSubmit}>Сохранить</button>
                </div>
            )
                : (
                    <ul className="profile__links-section">
                        <li className="profile__links-item">
                            <button type="button" className="profile__editButton" onClick={handleEdit}>Редактировать </button>
                        </li>
                        <li className="profile__links-item">
                            <Link className="profile__link" to="TODO">Выйти из аккаунта</Link>
                        </li>
                    </ul>
                )}
        </section>
    );
}
