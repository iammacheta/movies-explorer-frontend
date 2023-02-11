export default function Techs() {
  return (
    <section className="techs">
      <div className="techs__container-main">
        <h2 className="about-project__heading">Технологии</h2>
        <div className="techs__container-content">
          <div className="techs__description">
            <p className="techs__title">7 технологий</p>
            <p className="techs__details">На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.</p>
          </div>
          <ul className="techs__all-names">
            <li className="techs__name">HTML</li>
            <li className="techs__name">CSS</li>
            <li className="techs__name">JS</li>
            <li className="techs__name">React</li>
            <li className="techs__name">Git</li>
            <li className="techs__name">Express.js</li>
            <li className="techs__name">mongoDB</li>
          </ul>
        </div>
      </div>

    </section>
  );
}
