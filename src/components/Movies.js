import { useCallback, useState } from 'react';
import SearchForm from './SearchForm';

export default function Movies() {
    const [shortsIsChecked, setShortsIsChecked] = useState(false);

    const handleShortsChange = useCallback(() => {
        setShortsIsChecked(!shortsIsChecked);
    }, [shortsIsChecked]);

    return (
        <section className="movies">
            <SearchForm onShorts={handleShortsChange} shortsIsChecked={shortsIsChecked} />
        </section>
    );
}
