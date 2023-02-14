import { useNavigate } from 'react-router-dom';

export default function NotFoundPage() {
    const navigate = useNavigate();

    function handleClick() {
        navigate(-1);
    }

    return (
        <div className="not-found">
            <div className="not-found__info">
                <p className="not-found__code">404</p>
                <p className="not-found__message">Страница не найдена</p>
            </div>
            <button className="not-found__back-button" type="button" onClick={handleClick}>Назад</button>
        </div>
    );
}
