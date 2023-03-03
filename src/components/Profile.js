import { Link } from 'react-router-dom';
import { useEffect, useState, useContext } from 'react';
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function Profile({ onSubmit, onClickLogout }) {
    const currentUser = useContext(CurrentUserContext)
    const [userData, setUserData] = useState({
        name: '',
        email: '',
    });

    const [editClicked, setEditClicked] = useState(false);
    const [errors, setErrors] = useState({});
    const [isValid, setIsValid] = useState(false);
    const [isNewInfo, setIsNewUnfo] = useState(false);

    function handleChange(e) {
        const target = e.target;
        const { name, value } = target;

        setUserData({
            ...userData, // Важно прокинуть остальные поля, чтобы не перезареть их
            [name]: value,
        });
        setErrors({ ...errors, [name]: target.validationMessage });
        setIsValid(target.closest("form").checkValidity());
    }


    function handleEdit() {
        setEditClicked(!editClicked);
    }

    function handleSubmit(e) {
        e.preventDefault();
        setEditClicked(!editClicked);
        onSubmit(userData);
    }

    useEffect(() => {
        setIsNewUnfo(currentUser.name !== userData.name || currentUser.email !== userData.email);
    }, [userData.name, userData.email, currentUser.name, currentUser.email, editClicked]);

    useEffect(() => {
        setUserData({
            name: currentUser.name,
            email: currentUser.email,
        })
    }, [currentUser.name, currentUser.email]);

    return (
        <main className="profile">
            <form className="profile__form" name="profile" onSubmit={handleSubmit}>
                <div>
                    <h2 className="profile__title">Привет, Виталий!</h2>
                    <label className="profile__form-label" htmlFor="name">
                        Имя
                        <input
                            className="profile__input"
                            type="text"
                            name="name"
                            id="name"
                            value={userData.name}
                            onChange={handleChange}
                            disabled={editClicked ? '' : 'disabled'}
                            required
                            pattern="[а-яА-Яa-zA-Z -]{2,30}"
                        />
                    </label>
                    <span className="profile__error">{errors.name}</span>
                    <label className="profile__form-label" htmlFor="email">
                        E-mail
                        <input
                            className="profile__input"
                            type="email"
                            name="email"
                            id="email"
                            value={userData.email}
                            onChange={handleChange}
                            disabled={editClicked ? '' : 'disabled'}
                            required
                            pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$"
                        />
                    </label>
                    <span className="profile__error">{errors.email}</span>
                </div>
                {editClicked ? (
                    <div className="profile__submit-section">
                        {/* TODO: отправлять новые значения имени/почты в БД */}
                        <button
                            className={(isValid && isNewInfo) ? 'profile__submit-button' : 'profile__submit-button profile__submit-button_disabled'}
                            type="submit"
                            disabled={isValid && isNewInfo ? '' : 'disabled'}
                        >Сохранить
                        </button>
                    </div>
                )
                    : (
                        <ul className="profile__links-section">
                            <li className="profile__links-item">
                                <button type="button" className="profile__editButton" onClick={handleEdit}>Редактировать </button>
                            </li>
                            <li className="profile__links-item">
                                <Link className="profile__link" to="/" onClick={onClickLogout}>Выйти из аккаунта</Link>
                            </li>
                        </ul>
                    )}
            </form>

        </main>
    );
}
