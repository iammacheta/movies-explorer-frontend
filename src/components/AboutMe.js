import studentPhoto from '../images/student-photo.png';

export default function AboutMe() {
    return (
        <section className="about-me">
            <h2 className="about-project__heading">Студент</h2>
            <div className="about-me__info">
                <div className="about-me__description">
                    <div>
                        <p className="about-me__name">Максим</p>
                        <p className="about-me__programm">Веб-разработчик, 30 лет</p>
                        <p className="about-me__details">
                            Я закончил МИЭМ ВШЭ по направлению «Инжиниринг в электронике». Сейчас живу в Сербии. Люблю путешествовать, кататься на снуборде и серфе. Я уже довольно давно в IT, последние 2+ года работаю в Яндексе, но не в роли разработчика. Год назад начал заниматься программированием целенаправленно. Моя цель - перейти на роль разработчика.
                        </p>
                    </div>
                    <a className="about-me__github-link" target="_blank" rel="noreferrer" href="https://github.com/iammacheta">Github</a>
                </div>
                <img className="about-me__photo" src={studentPhoto} alt="фотография студента" />
            </div>
            <p className="about-me__portfolio">Портфолио</p>
            <ul className="about-me__portfolio-links">
                <li className="about-me__link-item">
                    <a className="about-me__link-wrapper" target="_blank" rel="noreferrer" href=" https://github.com/iammacheta/how-to-learn">
                        <p className="about-me__link-title">Статичный сайт</p>
                        <span className="about-me__link-arrow">↗</span>
                    </a>
                </li>
                <li className="about-me__link-item">
                    <a className="about-me__link-wrapper" target="_blank" rel="noreferrer" href="https://iammacheta.github.io/russian-travel/index.html">
                        <p className="about-me__link-title">Адаптивный сайт</p>
                        <span className="about-me__link-arrow">↗</span>
                    </a>
                </li>
                <li className="about-me__link-item">
                    <a className="about-me__link-wrapper" target="_blank" rel="noreferrer" href="http://mesto.front.ichetovkin.nomoredomains.club">
                        <p className="about-me__link-title">Одностраничное приложение</p>
                        <span className="about-me__link-arrow">↗</span>
                    </a>
                </li>
            </ul>
        </section >
    );
}
