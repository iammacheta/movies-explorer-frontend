export default function AboutProject() {
    return (
        <section className="about-project">
            <h2 className="about-project__heading">О проекте</h2>
            <div className="about-project__info">
                <p className="about-project__parts">Дипломный проект включал 5 этапов</p>
                <p className="about-project__detailed-info">Составление плана, работу над бэкендом, вёрстку, добавление функциональности и финальные доработки.</p>
                <p className="about-project__parts">На выполнение диплома ушло 5 недель</p>
                <p className="about-project__detailed-info">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы успешно защититься.</p>
            </div>
            <div className="about-project__infografics">
                <p className="about-project__plot">1 неделя</p>
                <p className="about-project__plot">4 недели</p>
                <p className="about-project__caption">Back-end</p>
                <p className="about-project__caption">Front-end</p>
            </div>
        </section>
    );
}
