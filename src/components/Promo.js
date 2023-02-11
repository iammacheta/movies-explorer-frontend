import serpant from '../images/serpant.svg';

export default function Promo() {
  return (
    <section className="promo">
      <h1 className="promo__heading">Учебный проект студента факультета Веб-разработки.</h1>
      <img className="promo__serpant" src={serpant} alt="лента" />
    </section>
  );
}
