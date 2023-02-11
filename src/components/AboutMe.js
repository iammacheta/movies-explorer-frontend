import studentPhoto from '../images/student-photo.jpg'

export default function AboutMe() {
    return (
        <section className="about-me">
            <h2 className="about-project__heading">Студент</h2>
            <div className="about-me__info">
                <div className="about-me__description">
                    <div>
                        <p className="about-me__name">Максим</p>
                        <p className='about-me__programm'>Фронтенд-разработчик, 30 лет</p>
                        <p className='about-me__details'>Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена
                            и дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ Контур».
                            После того, как прошёл курс по веб&#8209;разработке, начал заниматься фриланс&#8209;заказами и ушёл с постоянной работы.
                        </p>
                    </div>
                    <a className='about-me__github-link' href="https://github.com/iammacheta">Github</a>
                </div>
                <img className="about-me__photo" src={studentPhoto} alt="фотография студента" />
            </div>
            <p className='about-me__portfolio'>Портфолио</p>
            <ul className='about-me__portfolio-links'>
                <li className='about-me__link-item'>
                    <a className='about-me__link-wrapper' href='https://github.com/iammacheta/how-to-learn'>
                        <p className='about-me__link-title'>Статичный сайт</p>
                        <span className='about-me__link-arrow'>↗</span>
                    </a>
                </li>
                <li className='about-me__link-item'>
                    <a className='about-me__link-wrapper' href='https://github.com/iammacheta/how-to-learn'>
                        <p className='about-me__link-title'>Адаптивный сайт</p>
                        <span className='about-me__link-arrow'>↗</span>
                    </a>
                </li>
                <li className='about-me__link-item'>
                    <a className='about-me__link-wrapper about-me__link-wrapper_noborder' href='https://github.com/iammacheta/how-to-learn'>
                        <p className='about-me__link-title'>Одностраничное приложение</p>
                        <span className='about-me__link-arrow'>↗</span>
                    </a>
                </li>
            </ul>
        </section>
    )
}